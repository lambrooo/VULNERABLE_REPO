// VULNERABILITY: Hardcoded Credentials

const DB_PASSWORD = "admin123"; // BAD
const API_SECRET = "super_secret_key_12345"; // BAD
const DB_URL = "postgresql://admin:password123@db.example.com:5432/prod"; // BAD

module.exports = {
    DB_PASSWORD,
    API_SECRET,
    DB_URL
};