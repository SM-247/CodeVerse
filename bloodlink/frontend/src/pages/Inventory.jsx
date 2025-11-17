import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryCard from '../components/InventoryCard';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [newUnits, setNewUnits] = useState('');

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/inventory`);
      setInventory(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setLoading(false);
    }
  };

  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const getUnitsForType = (type) => {
    const entry = inventory.find((item) => item.type === type);
    return entry ? entry.units : 0;
  };

  // When clicking UPDATE on card
  const handleUpdateClick = (type, units) => {
    setSelectedType(type);
    setNewUnits(units);
    setShowModal(true);
  };

  // Save update → POST to backend
  const handleSaveUpdate = async () => {
    try {
      await axios.post(`${API_BASE}/inventory/update`, {
        type: selectedType,
        units: Number(newUnits),
      });

      setShowModal(false);
      fetchInventory(); // refresh UI
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Blood Inventory</h1>
      </div>

      {/* Inventory Grid */}
      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BLOOD_GROUPS.map((bg) => (
            <InventoryCard
              key={bg}
              bloodType={bg}
              units={getUnitsForType(bg)}
              onUpdateClick={handleUpdateClick}   // <-- REQUIRED
            />
          ))}
        </div>
      </div>

      {/* UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Update {selectedType}</h2>

            <input
              type="number"
              value={newUnits}
              onChange={(e) => setNewUnits(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}




