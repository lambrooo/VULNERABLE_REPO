const { getStock, decrementStock, createOrder } = require('./inventory');

// VULNERABILITY: Race Condition (TOCTOU)
exports.checkout = async function(productId, userId) {
    const stock = await getStock(productId);
    
    // BAD: Stock could change between check and decrement
    if (stock > 0) {
        await decrementStock(productId); 
        await createOrder(productId, userId);
        return true;
    }
    return false;
};