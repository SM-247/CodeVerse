import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalSwitcher from '../components/HospitalSwitcher';
import StatusBadge from '../components/StatusBadge';
import InventoryCard from '../components/InventoryCard';

export default function Dashboard() {
  const [hospital, setHospital] = useState('citycare');
  const [inventory, setInventory] = useState({});
  const [surgeries, setSurgeries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchDashboardData();
  }, [hospital]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [inv, surg, rec, incoming] = await Promise.all([
        axios.get(`${API_BASE}/${hospital}/inventory`),
        axios.get(`${API_BASE}/${hospital}/surgeries`),
        axios.get(`${API_BASE}/${hospital}/agent/recommendations`),
        axios.get(`${API_BASE}/${hospital}/requests/incoming`),
      ]);

      setInventory(inv.data);
      setSurgeries(surg.data.surgeries || []);
      setRecommendations(rec.data);
      setIncomingRequests(incoming.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getTotalUnits = () => {
    return Object.values(inventory).reduce((a, b) => a + b, 0);
  };

  const getCriticalCount = () => {
    return recommendations.filter(rec => rec.urgency === 'critical').length;
  };

  const getBloodGroups = () => {
    return ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Blood Bank Dashboard</h1>
            <HospitalSwitcher hospital={hospital} setHospital={setHospital} />
          </div>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-gray-600 text-sm font-medium mb-2">Total Units</div>
              <div className="text-4xl font-bold text-gray-900">{getTotalUnits()}</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-gray-600 text-sm font-medium mb-2">Pending Requests</div>
              <div className="text-4xl font-bold text-blue-600">{incomingRequests.length}</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-gray-600 text-sm font-medium mb-2">Critical Stock</div>
              <div className="text-4xl font-bold text-red-600">{getCriticalCount()}</div>
            </div>
          </div>

          {/* Blood Inventory Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Blood Inventory</h2>
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

          {/* Agent Alerts */}
          {recommendations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Agent Alerts</h2>
              <div className="space-y-3">
                {recommendations.slice(0, 3).map((rec, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-gray-900">Blood Type {rec.bloodGroup}</div>
                        <div className="text-sm text-gray-600">Shortage: {rec.shortage} units needed</div>
                      </div>
                      <StatusBadge status={rec.urgency} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
