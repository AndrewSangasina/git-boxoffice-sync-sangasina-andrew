const tickets = require('./tickets');

let failures = 0;
function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    console.error(`FAIL: ${label} — expected ${expected}, got ${actual}`);
    failures++;
  } else {
    console.log(`PASS: ${label}`);
  }
}

assertEqual(tickets.isValidQuantity(4), true, 'a normal order quantity is valid');
assertEqual(tickets.isValidQuantity(0), false, 'a zero quantity is invalid');
assertEqual(tickets.isValidQuantity(25), false, 'an order over 20 tickets is invalid');

process.exitCode = failures > 0 ? 1 : 0;
