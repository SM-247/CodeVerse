const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import ONLY the routes we actually need
const inventoryRoutes = require('./routes/inventory');
const surgeriesRoutes = require('./routes/surgeries');
const requestsRoutes = require('./routes/requests');
// const agentRoutes = require('./routes/agent'); // we'll create this next

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Base API path
app.use('/api/inventory', inventoryRoutes);
app.use('/api/surgeries', surgeriesRoutes);
app.use('/api/requests', requestsRoutes);
// app.use('/api/agent', agentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running properly' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BloodLink Backend running at http://localhost:${PORT}`);
});
