import React from 'react';

export default function Sidebar({ activeTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventory', icon: '🩸' },
    { id: 'surgeries', label: 'Surgeries', icon: '🏥' },
    { id: 'requests', label: 'Requests', icon: '📤' },
    { id: 'agent', label: 'AI Agent', icon: '🧠' },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-red-600">🩸 BloodLink</h1>
        <p className="text-xs text-gray-600 mt-1">Hospital Blood Coordination</p>
      </div>

      <nav className="space-y-2">
        {tabs.map(tab => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={`block px-4 py-3 rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="ml-3">
            <div className="text-sm font-bold text-gray-900">Admin</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
