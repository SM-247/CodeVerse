const express = require('express');
const router = express.Router();
const BloodLinkAgent = require('../agent');

// GET incoming requests
router.get('/:hospital/requests/incoming', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const incoming = agent.getIncomingRequests();
    res.json(incoming);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET outgoing requests
router.get('/:hospital/requests/outgoing', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const outgoing = agent.getOutgoingRequests();
    res.json(outgoing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST send blood request
router.post('/:hospital/requests/send', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const { targetHospital, bloodGroup, units } = req.body;
    const request = agent.sendBloodRequest(targetHospital, bloodGroup, units);
    res.json({
      message: 'Request sent successfully',
      request,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST update request status
router.post('/:hospital/requests/update-status', (req, res) => {
  try {
    const agent = new BloodLinkAgent(req.params.hospital);
    const { requestId, status } = req.body;
    const updated = agent.updateRequestStatus(requestId, status);
    res.json({
      message: 'Request status updated',
      requests: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
