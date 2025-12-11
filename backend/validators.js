// VULNERABILITY: High Cyclomatic Complexity (>10)

function validateOrder(order, user, cart, promo, shipping, payment, address) {
    if (order.items && order.items.length > 0) {
        if (user.isActive) {
            if (user.emailVerified) {
                if (cart.total > 0) {
                    if (promo && promo.isValid) {
                        if (promo.minAmount <= cart.total) {
                            if (promo.type === 'percentage') {
                                // apply percentage
                            } else if (promo.type === 'fixed') {
                                // apply fixed
                            } else if (promo.type === 'freeShipping') {
                                // apply free shipping
                            }
                        }
                    }
                    if (shipping.method === 'express') {
                        if (address.country === 'US') {
                            // US express
                        } else if (address.country === 'EU') {
                            // EU express
                        }
                    }
                    if (payment.method === 'card') {
                        if (payment.cardType === 'visa') {
                            // visa
                        } else if (payment.cardType === 'mastercard') {
                            // mastercard
                        }
                    }
                }
            }
        }
    }
    return true;
}

module.exports = { validateOrder };