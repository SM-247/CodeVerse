import React from 'react';

export default function RequestCard({ request, type }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const hospital = type === 'incoming' ? request.from : request.to;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-bold text-gray-900 capitalize">{hospital}</div>
          <div className="text-sm text-gray-600 mt-1">
            Blood: {request.bloodGroup} | Units: {request.units}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Created: {formatDate(request.dateCreated)}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            request.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {request.status === 'pending' ? '⏳ Pending' : '✓ Accepted'}
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
