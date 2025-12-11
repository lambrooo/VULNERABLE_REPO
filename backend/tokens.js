// VULNERABILITY: Insecure Randomness

exports.generateToken = function() {
    // BAD: Math.random() is not cryptographically secure
    return Math.random().toString(36).substring(2);
};