import React, { useState } from 'react';
import { X, Save, AlertCircle, Terminal, Layers, ShieldCheck } from 'lucide-react';

const IncidentCreationModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    errorCode: 'E001',
    severity: 'Medium',
    category: 'Data Issue',
    assignedTo: 'L1 Support'
  });

  const errorCodes = [
    { code: 'E001', label: 'Missing employee data' },
    { code: 'E002', label: 'Validation failure' },
    { code: 'E003', label: 'Tax calculation error' },
    { code: 'E004', label: 'Configuration mismatch' }
  ];
  const roles = ['L1 Support', 'L2 Support', 'Admin'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    let autoCategory = 'Data Issue';
    if (formData.errorCode === 'E003') autoCategory = 'Compliance';
    if (formData.errorCode === 'E004') autoCategory = 'Configuration';

    onSubmit({ ...formData, category: autoCategory, origin: 'Manual Entry' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative glass w-full max-w-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden animate-slide-up bg-slate-900/40">
        <div className="flex items-center justify-between p-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
              <Terminal className="text-indigo-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Initialize Incident Report</h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Secure Protocol Active</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[75vh] overflow-y-auto">
          <div className="space-y-8">
            <section>
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
                 <ShieldCheck size={12} className="text-indigo-500" /> Identifier & Context
              </label>
              <div className="space-y-6">
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 placeholder:text-slate-700 transition-all text-lg group-hover:border-white/10"
                    placeholder="e.g. Tax calculation failure"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none group-focus-within:opacity-100 transition-opacity">
                    <Layers size={20} className="text-indigo-400" />
                  </div>
                </div>

                <textarea 
                  required
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 h-32 transition-all placeholder:text-slate-700 resize-none"
                  placeholder="Comprehensive failure details and observed behavior..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">System Error Signature</label>
                <select 
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-slate-300 font-bold outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer hover:bg-slate-950/80 transition-all appearance-none"
                  value={formData.errorCode}
                  onChange={(e) => setFormData({...formData, errorCode: e.target.value})}
                >
                  {errorCodes.map(ec => (
                    <option key={ec.code} value={ec.code} className="bg-slate-900">{ec.code} — {ec.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Impact Velocity</label>
                <select 
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-slate-300 font-bold outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer hover:bg-slate-950/80 transition-all appearance-none"
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                >
                  {severities.map(s => (
                    <option key={s} value={s} className="bg-slate-900">{s} Priority</option>
                  ))}
                </select>
              </div>
            </section>

            <section className="pt-8">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Operational Ownership</label>
              <select 
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-slate-300 font-bold outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer hover:bg-slate-950/80 transition-all appearance-none"
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              >
                {roles.map(r => (
                  <option key={r} value={r} className="bg-slate-900">{r}</option>
                ))}
              </select>
            </section>
          </div>

          <div className="flex items-center gap-6 pt-10 border-t border-white/5">
            <button 
              type="submit" 
              className="btn-primary flex-1 justify-center py-5 text-lg"
            >
              <Save size={20} className="mr-2" /> Log Incident Record
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="px-8 py-5 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-950 rounded-2xl transition-all font-bold text-sm tracking-wide border border-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentCreationModal;
