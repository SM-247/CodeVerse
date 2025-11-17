import React from 'react';
import StatusBadge from './StatusBadge';

export default function SurgeryCard({ surgery }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-bold text-gray-900">{surgery.procedure}</div>
          <div className="text-sm text-gray-600 mt-1">
            Blood: {surgery.bloodGroup} | Units: {surgery.units}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Scheduled: {formatDate(surgery.date)}
          </div>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={surgery.priority} />
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            surgery.isReady
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {surgery.isReady ? '✓ Ready' : '✗ Not Ready'}
          </div>
        </div>
      </div>
    </div>
  );
}
