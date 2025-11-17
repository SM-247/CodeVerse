import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalSwitcher from '../components/HospitalSwitcher';
import InventoryCard from '../components/InventoryCard';

export default function Inventory() {
  const [hospital, setHospital] = useState('citycare');
  const [inventory, setInventory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchInventory();
  }, [hospital]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/${hospital}/inventory`);
      setInventory(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setLoading(false);
    }
  };

  const getBloodGroups = () => {
    return ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].filter(
      bg => !searchTerm || bg.includes(searchTerm.toUpperCase())
    );
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Blood Inventory</h1>
            <HospitalSwitcher hospital={hospital} setHospital={setHospital} />
          </div>
          <input
            type="text"
            placeholder="Search blood type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getBloodGroups().map(bg => (
              <InventoryCard
                key={bg}
                bloodType={bg}
                units={inventory[bg] || 0}
              />
            ))}
          </div>
        </div>
    </div>
  );
}
