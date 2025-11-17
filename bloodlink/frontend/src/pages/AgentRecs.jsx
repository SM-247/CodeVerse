import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalSwitcher from '../components/HospitalSwitcher';
import StatusBadge from '../components/StatusBadge';

export default function AgentRecs() {
  const [hospital, setHospital] = useState('citycare');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchRecommendations();
  }, [hospital]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/${hospital}/agent/recommendations`);
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">AI Agent Recommendations</h1>
            <HospitalSwitcher hospital={hospital} setHospital={setHospital} />
          </div>
        </div>

        <div className="p-8">
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Blood Type: {rec.bloodGroup}</h3>
                      <p className="text-sm text-gray-600 mt-1">Predicted shortage analysis</p>
                    </div>
                    <StatusBadge status={rec.urgency} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-gray-600 text-sm font-medium">Total Required</div>
                      <div className="text-2xl font-bold text-gray-900">{rec.totalRequired}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-gray-600 text-sm font-medium">Available</div>
                      <div className="text-2xl font-bold text-gray-900">{rec.available}</div>
                    </div>
                    <div className="bg-red-50 rounded p-3">
                      <div className="text-gray-600 text-sm font-medium">Shortage</div>
                      <div className="text-2xl font-bold text-red-600">{rec.shortage}</div>
                    </div>
                  </div>

                  {rec.recommendedHospitals.length > 0 ? (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Recommended Hospitals</h4>
                      <div className="space-y-2">
                        {rec.recommendedHospitals.map((hosp, i) => (
                          <div key={i} className="flex justify-between items-center bg-blue-50 p-3 rounded">
                            <span className="font-medium text-gray-900 capitalize">{hosp.hospital}</span>
                            <span className="text-sm text-gray-600">{hosp.available} units available</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-yellow-800 text-sm font-medium">⚠️ No eligible hospitals available</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-600">
              All blood types are in optimal condition
            </div>
          )}
        </div>
    </div>
  );
}
