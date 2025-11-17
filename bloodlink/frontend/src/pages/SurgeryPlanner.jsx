import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalSwitcher from '../components/HospitalSwitcher';
import SurgeryCard from '../components/SurgeryCard';

export default function SurgeryPlanner() {
  const [hospital, setHospital] = useState('citycare');
  const [surgeries, setSurgeries] = useState([]);
  const [formData, setFormData] = useState({
    procedure: '',
    units: '',
    bloodGroup: 'O+',
    date: '',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchSurgeries();
  }, [hospital]);

  const fetchSurgeries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/${hospital}/surgeries`);
      setSurgeries(response.data.surgeries || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching surgeries:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/${hospital}/surgeries/add`, formData);
      setFormData({
        procedure: '',
        units: '',
        bloodGroup: 'O+',
        date: '',
        priority: 'medium',
      });
      fetchSurgeries();
    } catch (error) {
      console.error('Error adding surgery:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Surgery Planner</h1>
            <HospitalSwitcher hospital={hospital} setHospital={setHospital} />
          </div>
        </div>

        <div className="p-8">
          {/* Add Surgery Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Surgery</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="procedure"
                  placeholder="Procedure Name"
                  value={formData.procedure}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="units"
                  placeholder="Units Required"
                  value={formData.units}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Schedule Surgery
              </button>
            </form>
          </div>

          {/* Surgeries List */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Surgeries</h2>
            <div className="space-y-3">
              {surgeries.length > 0 ? (
                surgeries.map(surgery => (
                  <SurgeryCard key={surgery.id} surgery={surgery} />
                ))
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-600">
                  No surgeries scheduled
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
