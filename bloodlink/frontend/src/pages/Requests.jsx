import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalSwitcher from '../components/HospitalSwitcher';
import RequestCard from '../components/RequestCard';

export default function Requests() {
  const [hospital, setHospital] = useState('citycare');
  const [activeTab, setActiveTab] = useState('incoming');
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchRequests();
  }, [hospital]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const [incoming, outgoing] = await Promise.all([
        axios.get(`${API_BASE}/${hospital}/requests/incoming`),
        axios.get(`${API_BASE}/${hospital}/requests/outgoing`),
      ]);
      setIncomingRequests(incoming.data);
      setOutgoingRequests(outgoing.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
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
            <h1 className="text-3xl font-bold text-gray-900">Blood Requests</h1>
            <HospitalSwitcher hospital={hospital} setHospital={setHospital} />
          </div>
        </div>

        <div className="p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('incoming')}
              className={`px-4 py-2 font-bold border-b-2 transition ${
                activeTab === 'incoming'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Incoming ({incomingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('outgoing')}
              className={`px-4 py-2 font-bold border-b-2 transition ${
                activeTab === 'outgoing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Outgoing ({outgoingRequests.length})
            </button>
          </div>

          {/* Requests List */}
          <div className="space-y-3">
            {activeTab === 'incoming' ? (
              incomingRequests.length > 0 ? (
                incomingRequests.map(request => (
                  <RequestCard key={request.id} request={request} type="incoming" />
                ))
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-600">
                  No incoming requests
                </div>
              )
            ) : outgoingRequests.length > 0 ? (
              outgoingRequests.map(request => (
                <RequestCard key={request.id} request={request} type="outgoing" />
              ))
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-600">
                No outgoing requests
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
