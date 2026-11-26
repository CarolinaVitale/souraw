import { getOrderPickup, SWEETS_PICKUP_LINE, MIXED_PICKUP_LINE } from "./orderPickup";
import { FEATURED_SWEET_IDS, ORDER_PAGE_SWEET_IDS } from "../data/orderCategories";
import { products } from "../data/products";

const sunday = new Date("2025-11-30T15:00:00Z"); // Sun Nov 30 2025, 10:00 AM in Tampa
const bread = { id: "classic-bread" };
const cookies = { id: "cookies-sweet" };
const cookieBag = { id: "four-cookie-bag" };

describe("getOrderPickup", () => {
    test("sourdough only → next bake date, pickup confirmed by contact", () => {
        expect(getOrderPickup([bread], sunday, [])).toEqual({
            open: true,
            kind: "sourdough",
            line: "Next bake: Thursday, Dec 4 · We'll contact you to confirm pickup at Canopy or Ocho Trece.",
            message: null,
        });
    });

    test("sourdough after the Tuesday 8 PM cutoff → the following Thursday", () => {
        // Tue Dec 2 2025, 8:00 PM in Tampa
        expect(getOrderPickup([bread], new Date("2025-12-03T01:00:00Z"), []).line)
            .toBe("Next bake: Thursday, Dec 11 · We'll contact you to confirm pickup at Canopy or Ocho Trece.");
    });

    test("sweets only → same day, no date", () => {
        expect(getOrderPickup([cookies, cookieBag], sunday, [])).toEqual({
            open: true,
            kind: "sweets",
            line: "Same day available · We'll contact you to arrange pickup at Canopy or Ocho Trece.",
            message: null,
        });
    });

    test("sourdough and sweets mixed → coordinated by contact, no date", () => {
        expect(getOrderPickup([cookies, bread], sunday, [])).toEqual({
            open: true,
            kind: "mixed",
            line: "We'll contact you to coordinate pickup for your order at Canopy or Ocho Trece.",
            message: null,
        });
    });

    test("special dates change the sourdough bake day and show their note", () => {
        const list = [{ type: "closed", date: "2025-12-04", message: "Closed for the holiday." }];
        expect(getOrderPickup([bread], sunday, list)).toMatchObject({
            line: "Next bake: Thursday, Dec 11 · We'll contact you to confirm pickup at Canopy or Ocho Trece.",
            message: "Closed for the holiday.",
        });
        expect(getOrderPickup([cookies], sunday, list)).toMatchObject({ kind: "sweets", message: null });
        expect(getOrderPickup([bread, cookies], sunday, list)).toMatchObject({ kind: "mixed", message: null });
    });

    test("a moved bake day shows its own weekday", () => {
        const list = [{ type: "moved", from: "2025-12-04", to: "2025-12-03", cutoff: "2025-12-01 8:00 PM" }];
        expect(getOrderPickup([bread], sunday, list).line)
            .toBe("Next bake: Wednesday, Dec 3 · We'll contact you to confirm pickup at Canopy or Ocho Trece.");
    });

    test("a pause closes ordering for every cart", () => {
        const list = [{ type: "pause", start: "2025-11-29", end: "2025-12-05", message: "Holiday break!" }];
        for (const cart of [[bread], [cookies], [bread, cookies]]) {
            expect(getOrderPickup(cart, sunday, list)).toEqual({ open: false, kind: "paused", message: "Holiday break!" });
        }
    });

    test("every line fits the backend limit (100 characters)", () => {
        // Longest possible date: a bake moved to a Wednesday in September.
        const list = [{ type: "moved", from: "2026-10-01", to: "2026-09-30", cutoff: "2026-09-28 8:00 PM" }];
        const longest = getOrderPickup([bread], new Date("2026-09-27T15:00:00Z"), list).line;
        expect(longest).toBe("Next bake: Wednesday, Sep 30 · We'll contact you to confirm pickup at Canopy or Ocho Trece.");
        for (const line of [SWEETS_PICKUP_LINE, MIXED_PICKUP_LINE, longest]) {
            expect(line.length).toBeLessThanOrEqual(100);
        }
    });
});

describe("sweets product list", () => {
    test("featured sweet ids exist in products.js", () => {
        const ids = new Set(products.map((p) => p.id));
        for (const id of FEATURED_SWEET_IDS) expect(ids.has(id)).toBe(true);
    });

    test("no id is listed twice", () => {
        const all = [...FEATURED_SWEET_IDS, ...ORDER_PAGE_SWEET_IDS];
        expect(new Set(all).size).toBe(all.length);
    });
});
