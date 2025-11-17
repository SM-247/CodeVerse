import React from 'react';

export default function StatusBadge({ status }) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'optimal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLabel = (status) => {
    switch (status) {
      case 'critical':
        return '🚨 Critical';
      case 'high':
        return '⚠️ High';
      case 'medium':
        return '📊 Medium';
      case 'low':
        return '✓ Low';
      case 'optimal':
        return '✓ Optimal';
      default:
        return status;
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(status)}`}>
      {getLabel(status)}
    </span>
  );
}
