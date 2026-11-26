// ─────────────────────────────────────────────────────────────────────────────
// Special pickup dates (holidays, vacations).
//
// The normal rule needs no entry here: sourdough bakes every Thursday (pickup at
// Canopy or Ocho Trece), and the order cutoff is the Tuesday before at 8:00 PM
// (Tampa time).
//
// Add one entry per exception. Dates are "YYYY-MM-DD". Times are Tampa time,
// written "YYYY-MM-DD 8:00 PM" (or 24-hour, "YYYY-MM-DD 20:00").
// "message" is optional: a short English note shown to customers.
//
//   Closed Thursday: no pickup that day; orders go to the next open Thursday.
//     { type: "closed", date: "YYYY-MM-DD", message: "..." }
//
//   Moved pickup day: that Thursday's pickup happens on another day,
//   with its own order cutoff.
//     { type: "moved", from: "YYYY-MM-DD", to: "YYYY-MM-DD", cutoff: "YYYY-MM-DD 8:00 PM", message: "..." }
//
//   Pause: no orders from "start" to "end" (both days included). Products stay
//   visible, but "place order" is disabled. Thursdays inside the pause are skipped.
//     { type: "pause", start: "YYYY-MM-DD", end: "YYYY-MM-DD", message: "..." }
// ─────────────────────────────────────────────────────────────────────────────

export const pickupExceptions = [
    // Example 1 — no pickup on Christmas Eve (a Thursday in 2026):
    // {
    //     type: "closed",
    //     date: "2026-12-24",
    //     message: "No pickup on Christmas Eve. Your order will be ready the following Thursday.",
    // },

    // Example 2 — Thanksgiving week: pickup moves from Thursday to Wednesday,
    // so orders close a day earlier (Monday at 8:00 PM):
    // {
    //     type: "moved",
    //     from: "2027-11-25",
    //     to: "2027-11-24",
    //     cutoff: "2027-11-22 8:00 PM",
    //     message: "Thanksgiving week: pickup is on Wednesday. Order by Monday at 8:00 PM.",
    // },
];
