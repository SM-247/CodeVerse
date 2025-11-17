const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the SINGLE hospital inventory file
const inventoryPath = path.join(__dirname, '..', 'data', 'citycare', 'inventory.json');

// Helper: read JSON
const readInventory = () => {
  return JSON.parse(fs.readFileSync(inventoryPath, 'utf-8'));
};

// Helper: write JSON
const writeInventory = (data) => {
  fs.writeFileSync(inventoryPath, JSON.stringify(data, null, 2));
};

// ⭐ GET INVENTORY (no hospital param)
// ⭐ GET INVENTORY (no hospital param)
router.get('/', (req, res) => {
  try {
    console.log("Reading from:", inventoryPath);   // <-- ADD THIS LINE
    const inventory = readInventory();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load inventory' });
  }
});


// ⭐ UPDATE INVENTORY
router.post('/update', (req, res) => {
  try {
      console.log("Writing to:", inventoryPath);
    const { type, units } = req.body;

    if (!type || units === undefined) {
      return res.status(400).json({ error: 'Blood type and units are required' });
    }

    let inventory = readInventory();

    // Check if blood group exists
    const bloodIndex = inventory.findIndex(item => item.type === type);

    if (bloodIndex !== -1) {
      // Update existing group
      inventory[bloodIndex].units = units;
    } else {
      // Add new group if missing
      inventory.push({ type, units });
    }

    writeInventory(inventory);

    res.json({
      message: 'Inventory updated successfully',
      inventory
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

module.exports = router;
