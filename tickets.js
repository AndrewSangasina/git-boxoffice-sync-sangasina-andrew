function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice) {
  return Math.floor(quantity * basePrice);
}

module.exports = { isValidQuantity, calculateTicketPrice };
