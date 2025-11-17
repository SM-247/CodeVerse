import React, { useState } from 'react';
import './styles/global.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import SurgeryPlanner from './pages/SurgeryPlanner';
import Requests from './pages/Requests';
import AgentRecs from './pages/AgentRecs';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'surgeries':
        return <SurgeryPlanner />;
      case 'requests':
        return <Requests />;
      case 'agent':
        return <AgentRecs />;
      default:
        return <Dashboard />;
    }
  };

  // Listen to hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'dashboard';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial page
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={currentPage} />
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
