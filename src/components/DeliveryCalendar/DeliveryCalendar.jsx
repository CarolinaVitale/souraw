import React, { useEffect, useMemo, useState } from "react";
import "./DeliveryCalendar.css";
import dollCalendar from "../../assets/calendar-girl.png";

const DELIVERY_DOW = new Set([2, 4, 6]); // Tue(2), Thu(4), Sat(6)
const CUTOFF_HOUR = 20; // 8:00 PM

function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
}

function sameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function isPastDay(day, now) {
    const endOfThatDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
    return endOfThatDay < now;
}

function formatDateLong(d) {
    return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

function formatCutoff(d) {
    const datePart = d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    const timePart = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return `${datePart} at ${timePart}`;
}

function getCutoffForDelivery(deliveryDate) {
    // Tue -> Sun 8pm; Thu -> Tue 8pm; Sat -> Thu 8pm
    // => delivery - 2 días a las 8pm
    const cutoff = addDays(deliveryDate, -2);
    cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
    return cutoff;
}

function getNextDeliveryFrom(date) {
    const d = startOfDay(date);
    for (let i = 0; i < 21; i++) {
        const candidate = addDays(d, i);
        if (DELIVERY_DOW.has(candidate.getDay())) return candidate;
    }
    return null;
}

export default function DeliveryCalendar({ onSelectDelivery }) {
    const now = useMemo(() => new Date(), []);

    const initialSelected = useMemo(() => getNextDeliveryFrom(now), [now]);
    const [selected, setSelected] = useState(initialSelected);

    const base = useMemo(() => initialSelected ?? new Date(), [initialSelected]);

    const monthStart = useMemo(() => startOfMonth(base), [base]);
    const monthEnd = useMemo(() => endOfMonth(base), [base]);

    const gridStart = useMemo(() => {
        const d = new Date(monthStart);
        d.setDate(d.getDate() - d.getDay());
        return d;
    }, [monthStart]);

    const gridEnd = useMemo(() => {
        const d = new Date(monthEnd);
        d.setDate(d.getDate() + (6 - d.getDay()));
        return d;
    }, [monthEnd]);

    const days = useMemo(() => {
        const arr = [];
        let d = new Date(gridStart);
        while (d <= gridEnd) {
            arr.push(new Date(d));
            d = addDays(d, 1);
        }
        return arr;
    }, [gridStart, gridEnd]);

    const monthLabel = useMemo(() => {
        return base.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    }, [base]);

    const selectedCutoff = useMemo(() => {
        if (!selected) return null;
        return getCutoffForDelivery(selected);
    }, [selected]);

    const cutoffPassed = useMemo(() => {
        if (!selectedCutoff) return false;
        return now > selectedCutoff;
    }, [now, selectedCutoff]);

    const nextDelivery = useMemo(() => {
        if (!selected || !cutoffPassed) return null;
        return getNextDeliveryFrom(addDays(selected, 1));
    }, [selected, cutoffPassed]);

    const nextCutoff = useMemo(() => {
        if (!nextDelivery) return null;
        return getCutoffForDelivery(nextDelivery);
    }, [nextDelivery]);

    useEffect(() => {
        if (selected) onSelectDelivery?.(selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (day) => {
        setSelected(day);
        onSelectDelivery?.(day);
    };

    return (
        <div className="deliveryCalWrap">
            <div className="deliveryCalArt" aria-hidden="true">
                <img
                    src={dollCalendar}
                    alt=""
                    className={`deliveryCalDoll ${selected ? "is-popped" : ""}`}
                />
            </div>

            <div className="deliveryCal">
                <div className="deliveryCal-head">
                    <p className="deliveryCal-kicker">Pick a delivery day</p>
                    <h3 className="deliveryCal-title">{monthLabel}</h3>
                    <p className="deliveryCal-sub">
                        Delivery days are <strong>Tuesday</strong>, <strong>Thursday</strong>, and{" "}
                        <strong>Saturday</strong>.
                    </p>
                </div>

                <div className="deliveryCal-grid">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                        <div key={d} className="deliveryCal-dow">
                            {d}
                        </div>
                    ))}

                    {days.map((day) => {
                        const inMonth = day.getMonth() === base.getMonth();
                        const isDelivery = DELIVERY_DOW.has(day.getDay());
                        const past = isPastDay(day, now);

                        const disabled = !isDelivery || past || !inMonth;
                        const isSelected = selected && sameDay(day, selected);

                        return (
                            <button
                                key={day.toISOString()}
                                type="button"
                                className={[
                                    "deliveryCal-day",
                                    inMonth ? "" : "is-out",
                                    isDelivery ? "is-delivery" : "",
                                    past ? "is-past" : "",
                                    isSelected ? "is-selected" : "",
                                ].join(" ")}
                                onClick={() => !disabled && handleSelect(day)}
                                disabled={disabled}
                                aria-label={formatDateLong(day)}
                                title={isDelivery && inMonth && !past ? "Delivery available" : ""}
                            >
                                {day.getDate()}
                            </button>
                        );
                    })}
                </div>

                <div className="deliveryCal-result">
                    {!selected && (
                        <p className="deliveryCal-hint">Tap a highlighted day to see when to order.</p>
                    )}

                    {selected && !cutoffPassed && selectedCutoff && (
                        <div className="deliveryCal-card">
                            <p className="deliveryCal-line">
                                Delivery: <strong>{formatDateLong(selected)}</strong>
                            </p>
                            <p className="deliveryCal-line">
                                Order by: <strong>{formatCutoff(selectedCutoff)}</strong>
                            </p>
                            <p className="deliveryCal-mini">
                                (Cutoff is always <strong>8:00 PM</strong>.)
                            </p>
                        </div>
                    )}

                    {selected && cutoffPassed && nextDelivery && nextCutoff && (
                        <div className="deliveryCal-card is-warning">
                            <p className="deliveryCal-line">That cutoff already passed.</p>
                            <p className="deliveryCal-line">
                                Next delivery: <strong>{formatDateLong(nextDelivery)}</strong>
                            </p>
                            <p className="deliveryCal-line">
                                Order by: <strong>{formatCutoff(nextCutoff)}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}