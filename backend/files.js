const path = require('path');
const fs = require('fs');

// VULNERABILITY: Path Traversal
exports.readFile = function(req, res) {
    // BAD: No validation of '../' in filename parameter
    const filePath = path.join('./uploads', req.params.filename);
    
    try {
        const data = fs.readFileSync(filePath);
        res.send(data);
    } catch (e) {
        res.status(404).send('Not found');
    }
};