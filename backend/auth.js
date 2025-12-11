const jwt = require('jsonwebtoken');

// VULNERABILITY: Hardcoded JWT Secret
const JWT_SECRET = "my_super_secret_jwt_key_2024";

exports.signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
};