import React from 'react';

export default function InventoryCard({ bloodType, units, onUpdateClick }) {
  const getStatus = (units) => {
    if (units > 8) return 'optimal';
    if (units > 4) return 'low';
    return 'critical';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-50 border-green-200';
      case 'low':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const status = getStatus(units);

  return (
    <div className={`rounded-lg p-4 shadow-sm border ${getStatusColor(status)}`}>
      <div className="text-center">
        <div className="text-lg font-bold text-gray-900 mb-2">{bloodType}</div>
        <div className="text-2xl font-bold text-gray-900 mb-3">{units}</div>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(status)}`}
        >
          {status === 'optimal' ? 'Optimal' : status === 'low' ? 'Low Stock' : 'Critical'}
        </span>

        {/* UPDATE BUTTON */}
        <button
          onClick={() => onUpdateClick(bloodType, units)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition"
        >
          Update
        </button>
      </div>
    </div>
  );
}

