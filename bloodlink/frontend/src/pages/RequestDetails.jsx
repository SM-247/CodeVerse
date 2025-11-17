import React from 'react';

export default function RequestDetails({ request, type }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Request Details</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-gray-600 text-sm font-medium">Status</div>
          <div className="text-lg font-bold text-gray-900 capitalize">{request.status}</div>
        </div>
        <div>
          <div className="text-gray-600 text-sm font-medium">Blood Type</div>
          <div className="text-lg font-bold text-gray-900">{request.bloodGroup}</div>
        </div>
        <div>
          <div className="text-gray-600 text-sm font-medium">Units</div>
          <div className="text-lg font-bold text-gray-900">{request.units}</div>
        </div>
        <div>
          <div className="text-gray-600 text-sm font-medium">Hospital</div>
          <div className="text-lg font-bold text-gray-900 capitalize">
            {type === 'incoming' ? request.from : request.to}
          </div>
        </div>
      </div>

      <div>
        <div className="text-gray-600 text-sm font-medium mb-2">Delivery Timeline</div>
        <div className="text-gray-900">2-3 business days</div>
      </div>

      {type === 'incoming' && (
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
            Accept
          </button>
          <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition">
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
