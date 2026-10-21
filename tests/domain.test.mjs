import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { reviewInvoice, advanceJob, elapsedMinutes, createTimer } from '../public/domain.mjs';

test('demo contains a consistent invoice, a mismatch and missing evidence', async () => {
  const demo = JSON.parse(await readFile(new URL('../data/demo.json', import.meta.url)));
  assert.equal(demo.synthetic, true);
  assert.deepEqual(demo.invoices.map(x => reviewInvoice(x).status), ['consistent', 'review', 'review']);
});
test('malformed, negative, overflowing or unverified input never passes', () => {
  const good = { net: 100, tax: 19, gross: 119, evidence: true };
  for (const value of [null, {}, { ...good, net: -1 }, { ...good, tax: 1.5 },
    { ...good, gross: '119' }, { ...good, evidence: 'true' },
    { ...good, net: Number.MAX_SAFE_INTEGER, tax: 1, gross: Number.MAX_SAFE_INTEGER }]) {
    assert.equal(reviewInvoice(value).status, 'review');
  }
});
test('job lifecycle and invalid statuses', () => {
  assert.equal(advanceJob('planned'), 'active'); assert.equal(advanceJob('active'), 'done');
  assert.equal(advanceJob('done'), 'planned');
  for (const status of ['__proto__', 'unknown', null]) assert.throws(() => advanceJob(status));
});
test('timer accumulates partial minutes over pauses, excludes stopped time and resets', () => {
  let now = 0; const timer = createTimer(() => now);
  assert.throws(() => timer.stop()); timer.start(); assert.throws(() => timer.start());
  now = 40000; assert.equal(timer.stop(), 0); now = 500000; assert.equal(timer.minutes(), 0);
  timer.start(); now += 30000; assert.equal(timer.stop(), 1);
  timer.reset(); assert.equal(timer.minutes(), 0); assert.throws(() => timer.stop());
});
test('time intervals reject reverse or invalid values', () => {
  assert.equal(elapsedMinutes(1000, 121000), 2);
  assert.throws(() => elapsedMinutes(20, 10)); assert.throws(() => elapsedMinutes(NaN, 20));
});
