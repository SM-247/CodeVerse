const express = require('express');
const router = express.Router();
const BloodLinkAgent = require('../agent');

// GET surgeries for a hospital
router.get('/:hospital/surgeries', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const surgeries = agent.getUpcomingSurgeries();
    const readiness = agent.getSurgeryReadiness();
    res.json({
      surgeries: readiness,
      count: surgeries.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add surgery
router.post('/:hospital/surgeries/add', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const { procedure, units, bloodGroup, date, priority } = req.body;
    const surgeries = agent.addSurgery({
      procedure,
      units,
      bloodGroup,
      date,
      priority,
    });
    res.json({
      message: 'Surgery added successfully',
      surgeries,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
