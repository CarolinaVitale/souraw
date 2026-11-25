const catalog = [
  ['classic-bread', 'Classic', '1kg', 800],
  ['whole-wheat-bread', 'Whole Wheat', '1.2kg', 900],
  ['laminated-bread', 'Butter Laminated', '1.2kg', 1000],
  ['5-roots-bread', '5 Roots', '1.1kg', 1600],
  ['focaccia-1kg', 'Focaccia', '1kg', 1400],
  ['cachitos-bread', 'CACHITOS', '8 pcs', 4000],
  ['mini-croissants', 'Butter Rolls', '16 pcs', 1200],
  ['sandwich-loaf', 'Sandwich Loaf', '1kg', 800],
  ['sweet-milk-rolls', 'Sweet Milk Buns', '6 pcs', 1000],
  ['cookies-sweet', 'Chocolate Chip Cookies', 'Box of 12', 2000],
  ['cookies-sweet', 'Chocolate Chip Cookies', 'Box of 24', 3600],
  ['snickerdoodles-sweet', 'Snickerdoodles', 'Box of 15', 1200],
  ['snickerdoodles-sweet', 'Snickerdoodles', 'Box of 30', 2000],
  ['four-cookie-bag', 'Bag of 4 Cookies', '4 cookies · Chocolate chips', 700],
  ['four-cookie-bag', 'Bag of 4 Cookies', '4 cookies · Peanut butter chips', 700],
];

// Never accept names, prices or totals supplied by the browser.
function validateOrder(data) {
  if (!data || !Array.isArray(data.items) || !data.items.length || data.items.length > 30) {
    throw new Error('Choose between 1 and 30 items.');
  }
  const seen = new Set();
  const items = data.items.map((item) => {
    const match = catalog.find(([id, , size]) => id === item?.id && size === item?.size);
    if (!match || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 50) {
      throw new Error('An item is unavailable or its quantity is invalid.');
    }
    const [id, name, size, unitAmount] = match;
    const key = `${id}:${size}`;
    if (seen.has(key)) throw new Error('Duplicate item.');
    seen.add(key);
    return { id, name, size, unitAmount, quantity: item.quantity };
  });
  const customer = {};
  for (const [key, max] of [['name', 100], ['email', 254], ['phone', 40], ['deliveryDate', 100], ['notes', 500]]) {
    const value = data.customer?.[key] ?? '';
    if (typeof value !== 'string' || value.length > max) throw new Error('Invalid customer details.');
    customer[key] = value.trim();
  }
  if (!customer.name || !customer.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    throw new Error('Name, email and phone are required.');
  }
  return { items, customer, total: items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0) };
}
module.exports = { validateOrder, catalog };
