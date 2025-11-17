import React from 'react';

export default function HospitalSwitcher({ hospital, setHospital }) {
  return (
    <select
      value={hospital}
      onChange={(e) => setHospital(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      <option value="citycare">City Care Hospital</option>
      <option value="metro">Metro Medical Center</option>
      <option value="sunrise">Sunrise Health Clinic</option>
    </select>
  );
}
