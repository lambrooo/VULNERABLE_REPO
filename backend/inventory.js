// Mock inventory for cart.js
// This file exists to make the Race Condition logic in cart.js semantically valid

let stock = {
    '1': 100,
    '2': 50
};

exports.getStock = async function(productId) {
    return stock[productId] || 0;
};

exports.decrementStock = async function(productId) {
    if (stock[productId] > 0) {
        stock[productId]--;
    }
};

exports.createOrder = async function(productId, userId) {
    console.log(`Order created for product ${productId} by user ${userId}`);
};