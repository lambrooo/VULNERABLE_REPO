// Funzione con alta complessità ciclomatica per testing Lizard
// Minimo CCN > 10 richiesto per essere rilevata

export function validateComplexOrder(
    order: any,
    user: any,
    cart: any,
    promo: any,
    shipping: any,
    payment: any,
    address: any,
    inventory: any
): string | null {
    // Cyclomatic Complexity: 30+
    if (!order || !order.items) {
        return "INVALID_ORDER";
    }

    if (order.items.length === 0) {
        return "EMPTY_CART";
    }

    if (!user) {
        return "NO_USER";
    }

    if (!user.isActive) {
        return "USER_INACTIVE";
    }

    if (!user.emailVerified) {
        return "EMAIL_NOT_VERIFIED";
    }

    if (user.accountAge < 30) {
        if (order.total > 1000) {
            return "NEW_ACCOUNT_HIGH_VALUE";
        }
    }

    if (!cart || cart.total <= 0) {
        return "INVALID_CART";
    }

    // Promo code validation
    if (promo) {
        if (!promo.isValid) {
            return "INVALID_PROMO";
        }
        if (promo.minAmount > cart.total) {
            return "PROMO_MIN_NOT_MET";
        }
        if (promo.type === "percentage") {
            if (promo.value > 100) {
                return "INVALID_PROMO_PERCENTAGE";
            }
            if (promo.value > 50 && !user.isPremium) {
                return "PREMIUM_PROMO_ONLY";
            }
        } else if (promo.type === "fixed") {
            if (promo.value > cart.total) {
                return "PROMO_EXCEEDS_TOTAL";
            }
        } else if (promo.type === "freeShipping") {
            if (shipping.method === "express") {
                return "FREE_SHIPPING_NOT_EXPRESS";
            }
        } else if (promo.type === "bundle") {
            if (order.items.length < 3) {
                return "BUNDLE_MIN_ITEMS";
            }
        }
    }

    // Shipping validation
    if (!shipping || !shipping.method) {
        return "NO_SHIPPING";
    }

    if (shipping.method === "express") {
        if (address.country === "US") {
            if (address.state === "AK" || address.state === "HI") {
                return "EXPRESS_NOT_AVAILABLE";
            }
        } else if (address.country === "CA") {
            if (shipping.cost < 25) {
                return "INVALID_EXPRESS_COST";
            }
        } else if (address.country !== "EU") {
            if (!user.isPremium) {
                return "INTERNATIONAL_EXPRESS_PREMIUM";
            }
        }
    } else if (shipping.method === "standard") {
        if (address.country !== "US" && address.country !== "CA") {
            if (order.weight > 10) {
                return "HEAVY_INTERNATIONAL_STANDARD";
            }
        }
    } else if (shipping.method === "overnight") {
        if (new Date().getHours() > 14) {
            return "OVERNIGHT_CUTOFF_PASSED";
        }
    }

    // Payment validation
    if (!payment || !payment.method) {
        return "NO_PAYMENT";
    }

    if (payment.method === "card") {
        if (payment.cardType === "visa") {
            if (!payment.cvv || payment.cvv.length !== 3) {
                return "INVALID_CVV";
            }
        } else if (payment.cardType === "mastercard") {
            if (!payment.verified3ds) {
                return "3DS_REQUIRED";
            }
        } else if (payment.cardType === "amex") {
            if (!payment.cvv || payment.cvv.length !== 4) {
                return "INVALID_AMEX_CVV";
            }
            if (cart.total < 50) {
                return "AMEX_MIN_AMOUNT";
            }
        } else if (payment.cardType === "discover") {
            if (address.country !== "US") {
                return "DISCOVER_US_ONLY";
            }
        }
    } else if (payment.method === "paypal") {
        if (!payment.paypalEmail) {
            return "NO_PAYPAL_EMAIL";
        }
        if (cart.total > 10000) {
            return "PAYPAL_LIMIT_EXCEEDED";
        }
    } else if (payment.method === "crypto") {
        if (payment.cryptoType === "bitcoin") {
            if (cart.total < 100) {
                return "BTC_MIN_AMOUNT";
            }
        } else if (payment.cryptoType === "ethereum") {
            if (!payment.walletVerified) {
                return "ETH_WALLET_NOT_VERIFIED";
            }
        }
    } else if (payment.method === "applePay") {
        if (!user.appleId) {
            return "NO_APPLE_ID";
        }
    } else if (payment.method === "googlePay") {
        if (!user.googleAccount) {
            return "NO_GOOGLE_ACCOUNT";
        }
    }

    // Inventory check
    if (inventory) {
        for (const item of order.items) {
            if (inventory[item.id] < item.quantity) {
                if (item.allowBackorder) {
                    if (user.backorderLimit < item.quantity) {
                        return "BACKORDER_LIMIT_EXCEEDED";
                    }
                } else {
                    return "INSUFFICIENT_STOCK";
                }
            }
        }
    }

    return "VALID";
}

// Another complex function
export function calculateDynamicPricing(
    product: any,
    user: any,
    time: Date,
    demand: number,
    competition: any[]
): number {
    let basePrice = product.basePrice;

    // User tier discounts
    if (user.tier === "gold") {
        basePrice *= 0.9;
    } else if (user.tier === "platinum") {
        basePrice *= 0.85;
    } else if (user.tier === "diamond") {
        basePrice *= 0.8;
    }

    // Time-based pricing
    const hour = time.getHours();
    if (hour >= 0 && hour < 6) {
        basePrice *= 0.95;
    } else if (hour >= 12 && hour < 14) {
        basePrice *= 1.1;
    } else if (hour >= 18 && hour < 21) {
        basePrice *= 1.15;
    }

    // Day of week
    const day = time.getDay();
    if (day === 0 || day === 6) {
        basePrice *= 1.05;
    } else if (day === 1) {
        basePrice *= 0.9;
    }

    // Demand surge
    if (demand > 100) {
        basePrice *= 1.2;
    } else if (demand > 50) {
        basePrice *= 1.1;
    } else if (demand < 10) {
        basePrice *= 0.85;
    }

    // Competition matching
    if (competition && competition.length > 0) {
        const avgCompPrice = competition.reduce((a, b) => a + b.price, 0) / competition.length;
        if (basePrice > avgCompPrice * 1.2) {
            basePrice = avgCompPrice * 1.1;
        } else if (basePrice < avgCompPrice * 0.8) {
            basePrice = avgCompPrice * 0.85;
        }
    }

    return Math.round(basePrice * 100) / 100;
}
