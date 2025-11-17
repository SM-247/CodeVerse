const fs = require('fs');
const path = require('path');

/**
 * BloodLink Agent - Rule-based predictive blood coordination
 */

class BloodLinkAgent {
  constructor(hospitalName) {
    this.hospitalName = hospitalName;
    this.dataPath = path.join(__dirname, 'data');
    this.hospitals = ['citycare', 'metro', 'sunrise'];
  }

  // Load JSON data files
  loadData(hospital, filename) {
    try {
      const filePath = path.join(this.dataPath, hospital, `${filename}.json`);
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading ${filename} for ${hospital}:`, error.message);
      return null;
    }
  }

  // Save JSON data files
  saveData(hospital, filename, data) {
    try {
      const filePath = path.join(this.dataPath, hospital, `${filename}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error saving ${filename} for ${hospital}:`, error.message);
      return false;
    }
  }

  // Get current inventory
  getCurrentInventory() {
    return this.loadData(this.hospitalName, 'inventory') || {};
  }

  // Get upcoming surgeries
  getUpcomingSurgeries() {
    const surgeries = this.loadData(this.hospitalName, 'surgeries') || [];
    const today = new Date();
    return surgeries.filter(surgery => new Date(surgery.date) >= today);
  }

  // Calculate total blood demand for upcoming surgeries
  calculateDemand() {
    const surgeries = this.getUpcomingSurgeries();
    const demand = {};

    surgeries.forEach(surgery => {
      if (!demand[surgery.bloodGroup]) {
        demand[surgery.bloodGroup] = 0;
      }
      demand[surgery.bloodGroup] += surgery.units;
    });

    return demand;
  }

  // Identify blood groups with shortage
  identifyShortages() {
    const inventory = this.getCurrentInventory();
    const demand = this.calculateDemand();
    const shortages = [];

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    bloodGroups.forEach(bg => {
      const available = inventory[bg] || 0;
      const required = demand[bg] || 0;

      if (available < required) {
        shortages.push({
          bloodGroup: bg,
          available,
          required,
          shortage: required - available,
          urgency: required - available > 10 ? 'critical' : required - available > 5 ? 'high' : 'medium',
        });
      }
    });

    return shortages;
  }

  // Find eligible hospitals to request from
  findEligibleHospitals(bloodGroup, unitsNeeded) {
    const eligible = [];

    this.hospitals.forEach(hospital => {
      if (hospital === this.hospitalName) return; // Don't request from self

      const inventory = this.loadData(hospital, 'inventory') || {};
      const availableUnits = inventory[bloodGroup] || 0;

      if (availableUnits >= unitsNeeded * 0.5) {
        // At least 50% of need
        eligible.push({
          hospital,
          available: availableUnits,
          score: availableUnits / unitsNeeded, // Higher is better
        });
      }
    });

    // Sort by score (descending)
    return eligible.sort((a, b) => b.score - a.score);
  }

  // Generate comprehensive recommendations
  generateRecommendations() {
    const shortages = this.identifyShortages();
    const recommendations = [];

    shortages.forEach(shortage => {
      const eligibleHospitals = this.findEligibleHospitals(
        shortage.bloodGroup,
        shortage.shortage
      );

      recommendations.push({
        bloodGroup: shortage.bloodGroup,
        totalRequired: shortage.required,
        available: shortage.available,
        shortage: shortage.shortage,
        urgency: shortage.urgency,
        recommendedHospitals: eligibleHospitals,
        actionRequired: eligibleHospitals.length > 0,
      });
    });

    return recommendations;
  }

  // Get status of surgeries (ready or not)
  getSurgeryReadiness() {
    const surgeries = this.getUpcomingSurgeries();
    const inventory = this.getCurrentInventory();

    return surgeries.map(surgery => {
      const available = inventory[surgery.bloodGroup] || 0;
      const isReady = available >= surgery.units;

      return {
        ...surgery,
        isReady,
        availableUnits: available,
        requiredUnits: surgery.units,
        status: isReady ? 'ready' : 'not-ready',
      };
    });
  }

  // Update inventory
  updateInventory(bloodGroup, units) {
    const inventory = this.getCurrentInventory();
    inventory[bloodGroup] = (inventory[bloodGroup] || 0) + units;
    this.saveData(this.hospitalName, 'inventory', inventory);
    return inventory;
  }

  // Add surgery
  addSurgery(surgery) {
    const surgeries = this.loadData(this.hospitalName, 'surgeries') || [];
    surgeries.push({
      ...surgery,
      id: Date.now(),
      dateCreated: new Date().toISOString(),
    });
    this.saveData(this.hospitalName, 'surgeries', surgeries);
    return surgeries;
  }

  // Send blood request
  sendBloodRequest(targetHospital, bloodGroup, units) {
    const outgoing = this.loadData(this.hospitalName, 'outgoing') || [];
    const request = {
      id: Date.now(),
      from: this.hospitalName,
      to: targetHospital,
      bloodGroup,
      units,
      status: 'pending',
      dateCreated: new Date().toISOString(),
    };
    outgoing.push(request);
    this.saveData(this.hospitalName, 'outgoing', outgoing);

    // Add to target hospital's incoming
    const incoming = this.loadData(targetHospital, 'incoming') || [];
    incoming.push({
      ...request,
      from: this.hospitalName,
      to: targetHospital,
    });
    this.saveData(targetHospital, 'incoming', incoming);

    return request;
  }

  // Get incoming requests
  getIncomingRequests() {
    return this.loadData(this.hospitalName, 'incoming') || [];
  }

  // Get outgoing requests
  getOutgoingRequests() {
    return this.loadData(this.hospitalName, 'outgoing') || [];
  }

  // Update request status
  updateRequestStatus(requestId, status) {
    const outgoing = this.loadData(this.hospitalName, 'outgoing') || [];
    const updated = outgoing.map(req => {
      if (req.id === requestId) {
        req.status = status;
      }
      return req;
    });
    this.saveData(this.hospitalName, 'outgoing', updated);
    return updated;
  }
}

module.exports = BloodLinkAgent;
