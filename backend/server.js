const express = require('express');
const cors = require('cors');
const app = express();

// VULNERABILITY: Open CORS
app.use(cors({ origin: '*' }));

// VULNERABILITY: Missing CSRF Protection (no csurf middleware used)

app.get('/api/data', (req, res) => {
    res.json({ data: 'sensitive info' });
});

app.listen(3000);