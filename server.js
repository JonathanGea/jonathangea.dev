const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// Gunakan kompresi
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Healthcheck untuk Railway
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Semua request lainnya ke Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, 'public')}`);
});