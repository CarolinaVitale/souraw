// Pickup line for an order, depending on what is in the cart. Pickup days are
// flexible, so the line never promises a fixed date: SOURAW confirms by contact.
// Every order can be picked up at Canopy or Ocho Trece.
//
// - Only sourdough: the next bake day (Tuesday 8:00 PM cutoff, Tampa time,
//   plus the special dates in src/config/pickupSchedule.js).
// - Only Cookies & sweets: same-day, arranged by SOURAW. No date.
// - Sourdough and sweets mixed: SOURAW coordinates the pickup. No date.
// - A pause in pickupSchedule.js closes ordering for every cart.

import { getPickupInfo } from "./pickupDate";
import { pickupExceptions } from "../config/pickupSchedule";
import { isSweetProduct } from "../data/orderCategories";

export const SWEETS_PICKUP_LINE =
    "Same day available · We'll contact you to arrange pickup at Canopy or Ocho Trece.";
export const MIXED_PICKUP_LINE = "We'll contact you to coordinate pickup for your order at Canopy or Ocho Trece.";
export const sourdoughPickupLine = (dateLabel) =>
    `Next bake: ${dateLabel} · We'll contact you to confirm pickup at Canopy or Ocho Trece.`;

/**
 * Returns:
 *   { open: true, kind: "sourdough" | "sweets" | "mixed", line, message }
 *   { open: false, kind: "paused", message }
 * `line` is shown in the checkout and sent with the order.
 * `message` is an optional holiday notice (sourdough only).
 */
export function getOrderPickup(cartItems = [], now = new Date(), list = pickupExceptions) {
    const schedule = getPickupInfo(now, list);
    if (!schedule.open) return { open: false, kind: "paused", message: schedule.message };

    const hasSweets = cartItems.some((item) => isSweetProduct(item.id));
    const hasSourdough = cartItems.some((item) => !isSweetProduct(item.id));

    if (hasSweets && hasSourdough) {
        return { open: true, kind: "mixed", line: MIXED_PICKUP_LINE, message: null };
    }
    if (hasSweets) {
        return { open: true, kind: "sweets", line: SWEETS_PICKUP_LINE, message: null };
    }
    return {
        open: true,
        kind: "sourdough",
        line: sourdoughPickupLine(schedule.dateLabel),
        message: schedule.special ? schedule.message : null,
    };
}
