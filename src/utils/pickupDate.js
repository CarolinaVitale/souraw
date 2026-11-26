// Next pickup day at Canopy, using Tampa time (America/New_York).
//
// Normal rule: orders placed before Tuesday 8:00 PM are picked up that Thursday;
// from Tuesday 8:00 PM on, the Thursday of the following week.
// Holidays and vacations are listed in src/config/pickupSchedule.js.

import { pickupExceptions } from "../config/pickupSchedule";

const TAMPA_TIME_ZONE = "America/New_York";
const THURSDAY = 4;
const NORMAL_CUTOFF = { daysBefore: 2, hour: 20, minute: 0 }; // Tuesday 8:00 PM
const WEEKS_TO_SEARCH = 104;
const DAY = 24 * 60 * 60 * 1000;
const DEFAULT_PAUSE_MESSAGE = "Orders are paused for now. See you soon!";

/*
 * Times are compared as Tampa wall-clock values: a Tampa date and time encoded
 * with Date.UTC, so "2026-12-01 8:00 PM" in Tampa becomes Date.UTC(2026, 11, 1, 20, 0).
 * Calendar days are the same value at midnight.
 */

function tampaNow(now) {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-US", {
            timeZone: TAMPA_TIME_ZONE,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hourCycle: "h23",
        })
            .formatToParts(now)
            .map(({ type, value }) => [type, Number(value)])
    );
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
}

const startOfDay = (wall) => Math.floor(wall / DAY) * DAY;
const weekday = (day) => new Date(day).getUTCDay();

// "YYYY-MM-DD" → calendar day, or null if malformed.
function parseDay(text) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(text ?? "").trim());
    if (!match) return null;
    const [year, month, day] = match.slice(1).map(Number);
    const value = Date.UTC(year, month - 1, day);
    return new Date(value).getUTCDate() === day ? value : null;
}

// "YYYY-MM-DD 8:00 PM" or "YYYY-MM-DD 20:00" → wall-clock time, or null if malformed.
function parseTime(text) {
    const match = /^(\d{4}-\d{2}-\d{2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)?$/i.exec(String(text ?? "").trim());
    if (!match) return null;
    const day = parseDay(match[1]);
    let hour = Number(match[2]);
    const minute = Number(match[3]);
    const meridiem = match[4]?.toUpperCase();
    if (meridiem) {
        if (hour < 1 || hour > 12) return null;
        hour = (hour % 12) + (meridiem === "PM" ? 12 : 0);
    }
    if (day === null || hour > 23 || minute > 59) return null;
    return day + (hour * 60 + minute) * 60 * 1000;
}

/** Checks the exception list. Returns { valid, problems } with plain-English problems. */
export function checkPickupExceptions(list = pickupExceptions) {
    const valid = [];
    const problems = [];

    (Array.isArray(list) ? list : []).forEach((entry, index) => {
        const where = `Exception #${index + 1}`;
        const issues = [];
        const message = entry?.message ?? "";
        if (typeof message !== "string") issues.push(`"message" must be text`);

        if (entry?.type === "closed") {
            const date = parseDay(entry.date);
            if (date === null) issues.push(`"date" must look like "2026-12-24"`);
            else if (weekday(date) !== THURSDAY) issues.push(`"date" ${entry.date} is not a Thursday`);
            if (!issues.length) valid.push({ type: "closed", date, message });
        } else if (entry?.type === "moved") {
            const from = parseDay(entry.from);
            const to = parseDay(entry.to);
            const cutoff = parseTime(entry.cutoff);
            if (from === null) issues.push(`"from" must look like "2026-11-26"`);
            else if (weekday(from) !== THURSDAY) issues.push(`"from" ${entry.from} is not a Thursday`);
            if (to === null) issues.push(`"to" must look like "2026-11-25"`);
            if (cutoff === null) issues.push(`"cutoff" must look like "2026-11-23 8:00 PM"`);
            else if (to !== null && cutoff >= to + DAY) issues.push(`"cutoff" must be before the end of the new pickup day`);
            if (!issues.length) valid.push({ type: "moved", from, to, cutoff, message });
        } else if (entry?.type === "pause") {
            const start = parseDay(entry.start);
            const end = parseDay(entry.end);
            if (start === null) issues.push(`"start" must look like "2026-12-20"`);
            if (end === null) issues.push(`"end" must look like "2027-01-05"`);
            if (start !== null && end !== null && end < start) issues.push(`"end" is before "start"`);
            if (!issues.length) valid.push({ type: "pause", start, end, message });
        } else {
            issues.push(`"type" must be "closed", "moved" or "pause"`);
        }

        if (issues.length) problems.push(`${where}: ${issues.join("; ")}.`);
    });

    return { valid, problems };
}

let reportedProblems = false;

/**
 * Works out the next pickup.
 * Open:   { open: true, date, dateLabel, label, special, message }
 *         dateLabel: "Thursday, Dec 4"; label: "Thursday, Dec 4 at Canopy"
 * Paused: { open: false, message }
 * `date` is a UTC-midnight Date (format it with timeZone "UTC").
 */
export function getPickupInfo(now = new Date(), list = pickupExceptions) {
    const { valid, problems } = checkPickupExceptions(list);
    if (problems.length && !reportedProblems && process.env.NODE_ENV !== "test") {
        reportedProblems = true;
        console.error(`pickupSchedule.js: these entries are ignored —\n${problems.join("\n")}`);
    }

    const current = tampaNow(now);
    const today = startOfDay(current);
    const pauses = valid.filter((e) => e.type === "pause");
    const inPause = (day) => pauses.find((p) => day >= p.start && day <= p.end);

    const activePause = inPause(today);
    if (activePause) {
        return { open: false, message: activePause.message || DEFAULT_PAUSE_MESSAGE };
    }

    const closedOn = (day) => valid.find((e) => e.type === "closed" && e.date === day);
    const movedFrom = (day) => valid.find((e) => e.type === "moved" && e.from === day);

    // Start from last week's Thursday (a moved pickup can land later than its Thursday).
    const thisThursday = today + ((THURSDAY - weekday(today) + 7) % 7) * DAY;
    let skippedMessage = null;
    let skipped = false;

    for (let week = -1; week <= WEEKS_TO_SEARCH; week += 1) {
        const thursday = thisThursday + week * 7 * DAY;
        const moved = movedFrom(thursday);
        const slot = moved
            ? { date: moved.to, cutoff: moved.cutoff }
            : {
                date: thursday,
                cutoff: thursday - NORMAL_CUTOFF.daysBefore * DAY + (NORMAL_CUTOFF.hour * 60 + NORMAL_CUTOFF.minute) * 60 * 1000,
            };

        if (current >= slot.cutoff) continue; // too late for this one

        const closed = !moved && closedOn(thursday);
        const paused = inPause(slot.date);
        if (closed || paused) {
            // This would have been the pickup: remember why it was skipped.
            if (!skipped) {
                skipped = true;
                skippedMessage = (closed || paused).message || null;
            }
            continue;
        }

        const date = new Date(slot.date);
        const dateLabel = new Intl.DateTimeFormat("en-US", {
            timeZone: "UTC",
            weekday: "long",
            month: "short",
            day: "numeric",
        }).format(date);

        return {
            open: true,
            date,
            dateLabel,
            label: `${dateLabel} at Canopy`,
            special: Boolean(moved) || skipped,
            message: (moved && moved.message) || skippedMessage || null,
        };
    }

    // Nothing open within two years: treat it like a pause.
    return { open: false, message: DEFAULT_PAUSE_MESSAGE };
}

/** e.g. "Thursday, Dec 4 at Canopy" (null while orders are paused). */
export function getPickupLabel(now = new Date(), list = pickupExceptions) {
    const info = getPickupInfo(now, list);
    return info.open ? info.label : null;
}

/** Returns the pickup day as a UTC-midnight Date (null while orders are paused). */
export function getPickupDate(now = new Date(), list = pickupExceptions) {
    const info = getPickupInfo(now, list);
    return info.open ? info.date : null;
}
