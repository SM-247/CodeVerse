const express = require('express');
const router = express.Router();
const BloodLinkAgent = require('../agent');

// GET list of hospitals
router.get('/hospitals', (req, res) => {
  try {
    const hospitals = ['citycare', 'metro', 'sunrise'];
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET agent recommendations for a hospital
router.get('/:hospital/agent/recommendations', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const recommendations = agent.generateRecommendations();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
