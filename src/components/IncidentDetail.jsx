import React, { useState } from 'react';
import { ArrowLeft, Clock, User, Tag, AlertTriangle, FileText, Send, CheckCircle, Smartphone, ExternalLink } from 'lucide-react';

const IncidentDetail = ({ incident, onBack, onUpdate }) => {
  const [rca, setRca] = useState(incident.rootCause || '');

  const rootCauseOptions = [
    'Missing employee data',
    'Incorrect tax rule',
    'Configuration mismatch',
    'System failure'
  ];

  const handleResolve = () => {
    onUpdate({ 
      status: 'Resolved', 
      rootCause: rca,
    });
  };

  const handleStatusChange = (status) => {
    onUpdate({ status });
  };

  return (
    <div className="animate-slide-up space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group font-bold text-sm tracking-wide"
      >
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400">
          <ArrowLeft size={16} />
        </div>
        Back to Global Registry
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card shadow-indigo-500/5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 pb-10 border-b border-white/5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="font-mono text-indigo-400 font-black tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 text-xs">
                    {incident.id}
                  </span>
                  <span className={`badge badge-${incident.severity.toLowerCase()} !rounded-lg`}>
                    {incident.severity}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-white/5">
                    <div className={`status-pulse ${
                      incident.status === 'Open' ? 'bg-amber-500' :
                      incident.status === 'In Progress' ? 'bg-indigo-500' :
                      'bg-emerald-500'
                    }`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                      {incident.status}
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl font-black text-white leading-[1.1] tracking-tighter">{incident.title}</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {incident.status === 'Open' && (
                  <button 
                    onClick={() => handleStatusChange('In Progress')}
                    className="btn-primary"
                  >
                    Start Work
                  </button>
                )}
                {incident.status !== 'Resolved' && (
                  <button 
                    onClick={handleResolve}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/20 font-bold"
                    disabled={!rca}
                  >
                    <CheckCircle size={18} /> Mark Resolved
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FileText size={18} />
                  </div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Contextual Intelligence</h3>
                </div>
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 border-l-4 border-l-indigo-500 relative overflow-hidden group">
                   <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                   <p className="text-slate-200 leading-relaxed font-medium text-lg relative z-10">
                    {incident.description}
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricBox 
                  label="System Architecture Mapping" 
                  value={incident.origin}
                  subValue="Node: Automation Workflow 01"
                />
                <MetricBox 
                  label="Error Signature (Registry)" 
                  value={incident.errorCode}
                  subValue={
                    incident.errorCode === 'E001' ? 'Missing employee data' :
                    incident.errorCode === 'E002' ? 'Validation failure' :
                    incident.errorCode === 'E003' ? 'Tax calculation error' :
                    'Configuration mismatch'
                  }
                  highlight
                />
              </div>

              <section className="pt-10 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-2xl font-black text-white tracking-tight">Root Cause Analysis (RCA)</h3>
                   {!rca && <span className="text-rose-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Required for closure</span>}
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rootCauseOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => setRca(option)}
                        className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all text-left ${
                          rca === option 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                            : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/20'
                        }`}
                        disabled={incident.status === 'Resolved'}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="relative group">
                    <textarea 
                      className="w-full bg-slate-900/80 border border-white/5 rounded-2xl p-6 text-slate-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 h-32 transition-all resize-none placeholder:text-slate-700"
                      placeholder="Or provide additional analysis details..."
                      value={rootCauseOptions.includes(rca) ? rca === incident.rootCause ? rca : '' : rca}
                      onChange={(e) => setRca(e.target.value)}
                      disabled={incident.status === 'Resolved'}
                    />
                    <div className="absolute bottom-4 right-4 text-slate-600 pointer-events-none group-focus-within:text-indigo-400/50 transition-colors">
                      <Smartphone size={24} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Metadata Card */}
          <div className="glass-card shadow-indigo-500/5">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">Incident Fingerprint</h3>
            <div className="space-y-8">
              <SidebarItem 
                icon={<User size={18} />} 
                label="Primary Responder"
                value={incident.assignedTo}
                highlight
              />
              <SidebarItem 
                icon={<Tag size={18} />} 
                label="Classification"
                value={incident.category}
              />
              <SidebarItem 
                icon={<Clock size={18} />} 
                label="Initialization Epoch"
                value={new Date(incident.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              />
              <SidebarItem 
                icon={<ExternalLink size={18} />} 
                label="Last Sync Update"
                value={new Date(incident.updatedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              />
            </div>
          </div>

          {/* Audit Log */}
          <div className="glass-card shadow-indigo-500/5 flex-1">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">Immutable Audit Trail</h3>
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              {incident.logs.map((log, idx) => (
                <div key={idx} className="relative pl-10 group/log">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border-2 border-white/5 group-hover/log:border-indigo-500/50 transition-colors rounded-full flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-black text-slate-100 mb-1 group-hover/log:text-indigo-400 transition-colors tracking-wide">{log.action}</p>
                    <div className="flex items-center gap-2 opacity-60">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Responder: {log.user}</p>
                      <span className="text-slate-600">•</span>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tighter">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, subValue, highlight }) => (
  <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 hover:bg-slate-900/60 transition-colors group">
    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 group-hover:text-indigo-400 transition-colors">{label}</h4>
    <div className={`text-xl font-black tracking-tight mb-1 ${highlight ? 'text-indigo-400 font-mono' : 'text-slate-200'}`}>{value}</div>
    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{subValue}</div>
  </div>
);

const SidebarItem = ({ icon, label, value, highlight }) => (
  <div className="flex items-start gap-5 group">
    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-1">{label}</p>
      <p className={`text-sm font-bold tracking-tight ${highlight ? 'text-white' : 'text-slate-300'}`}>{value}</p>
    </div>
  </div>
);

export default IncidentDetail;
