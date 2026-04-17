import React, { useState } from 'react';
import { Search, Filter, SortAsc, MoreVertical, ExternalLink } from 'lucide-react';

const IncidentList = ({ incidents, onSelectIncident }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filtered = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || inc.category === filterCategory;
    const matchesSeverity = filterSeverity === 'All' || inc.severity === filterSeverity;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="animate-slide-up space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Incident Registry</h2>
          <p className="text-slate-400 font-medium">Manage and track support tickets across the <span className="text-indigo-400">ProPayroll AI</span> lifecycle.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search INC-ID or Title..."
              className="pl-12 pr-6 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-80 backdrop-blur-md transition-all placeholder:text-slate-600 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-md">
            <select 
              className="bg-transparent text-sm font-bold text-slate-300 px-4 py-2 outline-none cursor-pointer hover:text-white transition-colors"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Data Issue">Data Issue</option>
              <option value="Configuration">Configuration</option>
              <option value="System">System</option>
              <option value="Compliance">Compliance</option>
            </select>

            <div className="w-[1px] h-6 bg-white/10 my-auto"></div>

            <select 
              className="bg-transparent text-sm font-bold text-slate-300 px-4 py-2 outline-none cursor-pointer hover:text-white transition-colors"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </header>

      <div className="glass-card !p-0 overflow-hidden ring-1 ring-white/5 shadow-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Incident Info</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Classification</th>
                <th className="px-8 py-5">Assigned To</th>
                <th className="px-8 py-5 text-right">Last Sync</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/[0.03]">
              {filtered.map(inc => (
                <tr 
                  key={inc.id} 
                  className="hover:bg-indigo-500/[0.02] transition-colors group cursor-pointer"
                  onClick={() => onSelectIncident(inc.id)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover:border-indigo-500/30 transition-colors">
                        <span className="text-[10px] font-black text-indigo-400 leading-none">{inc.id.split('-')[1]}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-indigo-400 text-xs font-mono tracking-wider mb-0.5">{inc.id}</span>
                        <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate max-w-md">{inc.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`status-pulse ${
                        inc.status === 'Open' ? 'bg-amber-500' :
                        inc.status === 'In Progress' ? 'bg-indigo-500' :
                        'bg-emerald-500'
                      }`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        inc.status === 'Open' ? 'text-amber-400' :
                        inc.status === 'In Progress' ? 'text-indigo-400' :
                        'text-emerald-400'
                      }`}>
                        {inc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <span className={`badge badge-${inc.severity.toLowerCase()}`}>
                        {inc.severity}
                      </span>
                      <span className="text-slate-400 font-bold text-xs">{inc.category}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase">
                        {inc.assignedTo.split(' ')[0][0]}{inc.assignedTo.split(' ')[1][0]}
                      </div>
                      <span className="text-slate-300 font-semibold">{inc.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-slate-500 font-mono text-xs tabular-nums bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                      {new Date(inc.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-600">
                       <Search size={48} className="opacity-20" />
                       <p className="font-bold text-lg">No incidents identified in this segment.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentList;
