// Which order-page products belong to "Cookies & sweets" (made without sourdough).
// Everything else in the cart counts as sourdough.

// Sweets that come from the shared product list (src/data/products.js).
export const FEATURED_SWEET_IDS = ["tiramisu-sweet", "cookies-sweet", "snickerdoodles-sweet"];

// Sweets defined only on the sweets order page (newSweets in src/pages/Prices/Prices.jsx).
export const ORDER_PAGE_SWEET_IDS = [
    "spoonable-cookie",
    "chocolate-obsession",
    "pistachio-tiramisu",
    "four-cookie-bag",
    "single-cookie",
];

const SWEET_IDS = new Set([...FEATURED_SWEET_IDS, ...ORDER_PAGE_SWEET_IDS]);

export const isSweetProduct = (id) => SWEET_IDS.has(id);
