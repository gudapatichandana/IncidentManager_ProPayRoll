import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import IncidentList from './components/IncidentList'
import IncidentDetail from './components/IncidentDetail'
import IncidentCreationModal from './components/IncidentCreationModal'
import { Layout, PlusCircle, LayoutDashboard, List, FileDown } from 'lucide-react'

const INITIAL_INCIDENTS = [
  {
    id: 'INC-001',
    title: 'Tax Calculation Variance in New York Region',
    errorCode: 'E003',
    category: 'Compliance',
    severity: 'High',
    status: 'Open',
    assignedTo: 'L2 Support',
    description: 'Automatic tax calculation for NY region showing 0.5% variance compared to manual audit logs.',
    origin: 'ProPayroll AI Workflow',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    rootCause: null,
    logs: [
      { timestamp: new Date(Date.now() - 86400000).toISOString(), action: 'Incident Created', user: 'System' }
    ]
  },
  {
    id: 'INC-002',
    title: 'Missing Employee ID in Batch Processing',
    errorCode: 'E001',
    category: 'Data Issue',
    severity: 'Medium',
    status: 'In Progress',
    assignedTo: 'L1 Support',
    description: 'Bulk upload failed for 45 employees due to missing primary IDs in the payroll source data.',
    origin: 'ProPayroll AI Workflow',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    rootCause: 'Missing employee data',
    logs: [
      { timestamp: new Date(Date.now() - 172800000).toISOString(), action: 'Incident Created', user: 'System' },
      { timestamp: new Date(Date.now() - 43200000).toISOString(), action: 'Status changed to In Progress', user: 'L1 Support' }
    ]
  }
];

function App() {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem('incident_manager_data_v2');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });
  
  const [view, setView] = useState('dashboard'); // dashboard, list, detail
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('incident_manager_data_v2', JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = (newIncident) => {
    const nextId = `INC-${String(incidents.length + 1).padStart(3, '0')}`;
    const incident = {
      ...newIncident,
      id: nextId,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      logs: [{ timestamp: new Date().toISOString(), action: 'Incident Created', user: 'System' }]
    };
    setIncidents([incident, ...incidents]);
    setIsModalOpen(false);
  };

  const simulateFailure = () => {
    const failures = [
      { title: 'Tax calculation mismatch', errorCode: 'E003', severity: 'High', category: 'Compliance', description: 'Real-time tax auditor detected a variance in the payroll calculation flow.' },
      { title: 'Missing employee salary data', errorCode: 'E001', severity: 'Medium', category: 'Data Issue', description: 'Batch process interrupted: Mandatory salary fields are missing for the upcoming cycle.' },
      { title: 'API Sync Failure', errorCode: 'E002', severity: 'High', category: 'System', description: 'Connection lost between ProPayroll AI and the Global Benefits Provider.' },
      { title: 'Configuration mismatch', errorCode: 'E004', severity: 'Medium', category: 'Configuration', description: 'Region-specific tax rules do not align with current compliance version.' }
    ];
    
    const randomFailure = failures[Math.floor(Math.random() * failures.length)];
    addIncident({
      ...randomFailure,
      assignedTo: 'L1 Support',
      origin: 'ProPayroll AI Simulation'
    });
    setView('list');
  };

  const updateIncident = (id, updates) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        const newLog = updates.status && updates.status !== inc.status 
          ? { timestamp: new Date().toISOString(), action: `Status changed to ${updates.status}`, user: updates.user || 'L1 Support' }
          : null;
        
        return {
          ...inc,
          ...updates,
          updatedAt: new Date().toISOString(),
          logs: newLog ? [...inc.logs, newLog] : inc.logs
        };
      }
      return inc;
    }));
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Status', 'Severity', 'Category', 'Assigned To', 'Created At'];
    const rows = incidents.map(inc => [
      inc.id,
      inc.title,
      inc.status,
      inc.severity,
      inc.category,
      inc.assignedTo,
      inc.createdAt
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `incidents_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentIncident = incidents.find(inc => inc.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-8 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
            <Layout className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Incident Manager</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-400/80">ProPayroll AI Support Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-900/40 rounded-2xl border border-white/5">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${view === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> <span className="text-sm font-semibold">Dashboard</span>
          </button>
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${view === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <List size={18} /> <span className="text-sm font-semibold">Incidents</span>
          </button>
          <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/20 font-semibold text-sm"
          >
            <PlusCircle size={18} /> New Ticket
          </button>
          <button onClick={exportToCSV} className="p-3 text-slate-400 hover:text-white transition-colors">
            <FileDown size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-[1600px] mx-auto w-full z-0">
        {view === 'dashboard' && (
          <Dashboard 
            incidents={incidents} 
            onViewList={() => setView('list')} 
            onSelectIncident={(id) => { setSelectedId(id); setView('detail'); }}
            onSimulateFailure={simulateFailure}
          />
        )}
        
        {view === 'list' && (
          <IncidentList 
            incidents={incidents} 
            onSelectIncident={(id) => { setSelectedId(id); setView('detail'); }}
          />
        )}
        
        {view === 'detail' && currentIncident && (
          <IncidentDetail 
            incident={currentIncident} 
            onBack={() => setView('list')}
            onUpdate={(updates) => updateIncident(currentIncident.id, updates)}
          />
        )}
      </main>

      {isModalOpen && (
        <IncidentCreationModal 
          onClose={() => setIsModalOpen(false)}
          onSubmit={addIncident}
        />
      )}

      {/* Footer */}
      <footer className="p-6 text-center text-slate-500 text-sm border-t border-slate-800">
        &copy; 2024 Incident Management & Troubleshooting System | Built for Deloitte Support Ops
      </footer>
    </div>
  )
}

export default App
