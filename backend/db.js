const db = require('some-db-client');

// VULNERABILITY: SQL Injection
// Semgrep Rule: javascript.express.security.injection.sql-injection
exports.getUser = function(userId) {
  // BAD: Direct string concatenation of input
  const query = "SELECT * FROM users WHERE id = " + userId; 
  return db.query(query);
};

exports.searchProducts = function(searchTerm) {
    // BAD: Template literal with unescaped input
    const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`;
    return db.query(query);
};