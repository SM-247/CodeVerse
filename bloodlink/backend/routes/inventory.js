const express = require('express');
const router = express.Router();
const BloodLinkAgent = require('../agent');

// GET inventory for a hospital
router.get('/:hospital/inventory', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const inventory = agent.getCurrentInventory();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST update inventory
router.post('/:hospital/inventory/update', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const { bloodGroup, units } = req.body;
    const updated = agent.updateInventory(bloodGroup, units);
    res.json({
      message: 'Inventory updated',
      inventory: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
