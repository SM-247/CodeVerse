const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const inventoryRoutes = require('./routes/inventory');
const surgeriesRoutes = require('./routes/surgeries');
const requestsRoutes = require('./routes/requests');
const hospitalsRoutes = require('./routes/hospitals');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', inventoryRoutes);
app.use('/api', surgeriesRoutes);
app.use('/api', requestsRoutes);
app.use('/api', hospitalsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`BloodLink Backend running on http://localhost:${PORT}`);
});
