import { getPickupLabel, getPickupInfo, checkPickupExceptions } from "./pickupDate";

// Instants are written in UTC; comments give the Tampa (America/New_York) time.
describe("getPickupLabel", () => {
    test("Sunday → Thursday of the same week", () => {
        // Sun Nov 30 2025, 10:00 AM EST
        expect(getPickupLabel(new Date("2025-11-30T15:00:00Z"))).toBe("Thursday, Dec 4 at Canopy");
    });

    test("Tuesday 7:59 PM → Thursday of the same week", () => {
        // Tue Dec 2 2025, 7:59 PM EST
        expect(getPickupLabel(new Date("2025-12-03T00:59:00Z"))).toBe("Thursday, Dec 4 at Canopy");
    });

    test("Tuesday 8:00 PM → Thursday of the next week", () => {
        // Tue Dec 2 2025, 8:00 PM EST (already Wednesday in UTC)
        expect(getPickupLabel(new Date("2025-12-03T01:00:00Z"))).toBe("Thursday, Dec 11 at Canopy");
    });

    test("Wednesday → Thursday of the next week", () => {
        // Wed Dec 3 2025, 9:00 AM EST
        expect(getPickupLabel(new Date("2025-12-03T14:00:00Z"))).toBe("Thursday, Dec 11 at Canopy");
    });

    test("Thursday → Thursday of the next week (no same-day orders)", () => {
        // Thu Dec 4 2025, 9:00 AM EST
        expect(getPickupLabel(new Date("2025-12-04T14:00:00Z"))).toBe("Thursday, Dec 11 at Canopy");
    });

    test("Saturday late night → Thursday of the coming week", () => {
        // Sat Dec 6 2025, 11:30 PM EST (already Sunday in UTC)
        expect(getPickupLabel(new Date("2025-12-07T04:30:00Z"))).toBe("Thursday, Dec 11 at Canopy");
    });

    test("crosses month and year boundaries", () => {
        // Wed Dec 31 2025, 12:00 PM EST
        expect(getPickupLabel(new Date("2025-12-31T17:00:00Z"))).toBe("Thursday, Jan 8 at Canopy");
    });

    test("uses daylight-saving time when it applies", () => {
        // Tue Jul 7 2026, 7:30 PM EDT → same week; 8:30 PM EDT → next week
        expect(getPickupLabel(new Date("2026-07-07T23:30:00Z"))).toBe("Thursday, Jul 9 at Canopy");
        expect(getPickupLabel(new Date("2026-07-08T00:30:00Z"))).toBe("Thursday, Jul 16 at Canopy");
    });
});

describe("pickup exceptions", () => {
    // Reference week: Tue Dec 2 2025 (cutoff) → Thu Dec 4 2025.
    const sunday = new Date("2025-11-30T15:00:00Z"); // Sun Nov 30, 10:00 AM EST

    test("the real pickupSchedule.js has no mistakes", () => {
        expect(checkPickupExceptions().problems).toEqual([]);
    });

    test("closed Thursday → next open Thursday, with its message", () => {
        const list = [{ type: "closed", date: "2025-12-04", message: "Closed for the holiday." }];
        expect(getPickupInfo(sunday, list)).toMatchObject({
            open: true,
            label: "Thursday, Dec 11 at Canopy",
            special: true,
            message: "Closed for the holiday.",
        });
    });

    test("two closed Thursdays in a row are both skipped", () => {
        const list = [
            { type: "closed", date: "2025-12-04", message: "First." },
            { type: "closed", date: "2025-12-11" },
        ];
        expect(getPickupInfo(sunday, list)).toMatchObject({ label: "Thursday, Dec 18 at Canopy", message: "First." });
    });

    test("a closed Thursday that was already out of reach is not special", () => {
        // Wed Dec 3: the Dec 4 cutoff has passed anyway, so Dec 11 is the normal pickup.
        const list = [{ type: "closed", date: "2025-12-04", message: "Closed." }];
        expect(getPickupInfo(new Date("2025-12-03T14:00:00Z"), list)).toMatchObject({
            label: "Thursday, Dec 11 at Canopy",
            special: false,
            message: null,
        });
    });

    test("moved pickup uses its new day and its own cutoff", () => {
        const list = [{
            type: "moved", from: "2025-12-04", to: "2025-12-03", cutoff: "2025-12-01 8:00 PM",
            message: "Pickup moves to Wednesday this week.",
        }];
        // Mon Dec 1, 7:00 PM EST: before the moved cutoff.
        expect(getPickupInfo(new Date("2025-12-02T00:00:00Z"), list)).toMatchObject({
            label: "Wednesday, Dec 3 at Canopy",
            special: true,
            message: "Pickup moves to Wednesday this week.",
        });
        // Mon Dec 1, 9:00 PM EST: after the moved cutoff (though before the usual Tuesday one).
        expect(getPickupInfo(new Date("2025-12-02T02:00:00Z"), list)).toMatchObject({
            label: "Thursday, Dec 11 at Canopy",
            special: false,
        });
    });

    test("24-hour cutoff times work too", () => {
        const list = [{ type: "moved", from: "2025-12-04", to: "2025-12-05", cutoff: "2025-12-03 20:00" }];
        // Wed Dec 3, 9:00 AM EST: past the usual Tuesday cutoff, but before the moved one.
        expect(getPickupLabel(new Date("2025-12-03T14:00:00Z"), list)).toBe("Friday, Dec 5 at Canopy");
    });

    test("during a pause orders are closed, with the message", () => {
        const list = [{ type: "pause", start: "2025-12-20", end: "2026-01-05", message: "Holiday break!" }];
        expect(getPickupInfo(new Date("2025-12-22T15:00:00Z"), list)).toEqual({ open: false, message: "Holiday break!" });
        expect(getPickupLabel(new Date("2025-12-22T15:00:00Z"), list)).toBeNull();
    });

    test("a pause without a message still explains itself", () => {
        const list = [{ type: "pause", start: "2025-12-20", end: "2026-01-05" }];
        expect(getPickupInfo(new Date("2025-12-22T15:00:00Z"), list).message).toBeTruthy();
    });

    test("orders placed just before a pause skip the Thursdays inside it", () => {
        // Fri Dec 19: the next Thursday (Dec 25) is inside the pause, as is Jan 1.
        const list = [{ type: "pause", start: "2025-12-20", end: "2026-01-05", message: "Holiday break!" }];
        expect(getPickupInfo(new Date("2025-12-19T15:00:00Z"), list)).toMatchObject({
            open: true,
            label: "Thursday, Jan 8 at Canopy",
            special: true,
            message: "Holiday break!",
        });
    });

    test("ordering opens again the day after the pause ends", () => {
        const list = [{ type: "pause", start: "2025-12-20", end: "2026-01-05" }];
        // Tue Jan 6 2026, 10:00 AM EST → Thursday Jan 8.
        expect(getPickupLabel(new Date("2026-01-06T15:00:00Z"), list)).toBe("Thursday, Jan 8 at Canopy");
    });

    test("entries with mistakes are reported and ignored", () => {
        const list = [
            { type: "closed", date: "2025-12-05" }, // a Friday
            { type: "moved", from: "2025-12-04", to: "Dec 3", cutoff: "soon" },
            { type: "vacation", start: "2025-12-01" },
        ];
        expect(checkPickupExceptions(list).problems).toHaveLength(3);
        expect(getPickupLabel(sunday, list)).toBe("Thursday, Dec 4 at Canopy");
    });
});
