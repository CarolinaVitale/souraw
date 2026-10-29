const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { validateOrder, catalog } = require('./bakery');
const customer = { name: 'Test', email: 'test@example.com', phone: '5551234567' };
const item = { id: 'classic-bread', size: '1kg', quantity: 2 };
const order = (items) => ({ customer, items });

test('uses server prices even when browser sends a forged price and total', () => {
  const result = validateOrder({ ...order([{ ...item, priceUSD: 0.01 }]), total: 1 });
  assert.equal(result.total, 1600);
  assert.equal(result.items[0].unitAmount, 800);
});

test('rejects missing, unknown, duplicate, unavailable and invalid quantities', () => {
  for (const items of [[], null, [null], [{ ...item, id: 'pizza-medium' }], [{ ...item, size: 'wrong' }],
    [item, item], ...[0, -1, 1.5, 51, '2'].map((quantity) => [{ ...item, quantity }])]) {
    assert.throws(() => validateOrder(order(items)));
  }
  assert.throws(() => validateOrder({ items: [item], customer: { ...customer, email: 'invalid' } }));
  assert.throws(() => validateOrder({ items: [item], customer: { ...customer, notes: 'a'.repeat(501) } }));
});

test('correctly prices cookie variants', () => {
  assert.equal(validateOrder(order([{ id: 'cookies-sweet', size: 'Box of 24', quantity: 3 }])).total, 10800);
});

test('backend catalog matches the published featured product prices', () => {
  const source = fs.readFileSync(`${__dirname}/../src/data/products.js`, 'utf8');
  const products = vm.runInNewContext(source.replace(/export /g, '') + '\nproducts;', { require: (path) => path });
  for (const product of products.filter((product) => product.featured && product.badge !== 'Coming Soon')) {
    for (const variant of product.prices || [{ label: product.size || '', priceUSD: product.priceUSD }]) {
      const entry = catalog.find(([id, , size]) => id === product.id && size === variant.label);
      assert.ok(entry, `Missing ${product.id}: ${variant.label}`);
      assert.equal(entry[3], Math.round(variant.priceUSD * 100));
    }
  }
});
