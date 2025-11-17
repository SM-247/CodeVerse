import React from 'react';

export default function IncomingRequestDetails({ request }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Incoming Request Details</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="text-gray-600 text-sm font-medium">From Hospital</div>
          <div className="text-lg font-bold text-gray-900 capitalize">{request.from}</div>
        </div>
        <div>
          <div className="text-gray-600 text-sm font-medium">Blood Type Required</div>
          <div className="text-lg font-bold text-gray-900">{request.bloodGroup}</div>
        </div>
        <div>
          <div className="text-gray-600 text-sm font-medium">Units Requested</div>
          <div className="text-lg font-bold text-gray-900">{request.units}</div>
        </div>
        <div>
          <div className="text-gray-600 text-sm font-medium">Status</div>
          <div className={`text-lg font-bold capitalize ${
            request.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {request.status}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
          Accept Request
        </button>
        <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition">
          Decline Request
        </button>
      </div>
    </div>
  );
}
