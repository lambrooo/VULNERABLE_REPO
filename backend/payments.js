// VULNERABILITY: Hardcoded API Key

// BAD: Live Stripe secret key committed to code
const stripe = require('stripe')('sk_live_xxxxxxxxxxxxxxxxxxxx');

exports.processPayment = async (amount, source) => {
    return await stripe.charges.create({
        amount,
        currency: 'usd',
        source,
    });
};