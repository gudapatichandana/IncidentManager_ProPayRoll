import React from 'react';
import { AlertCircle, CheckCircle2, Clock, ShieldAlert, BarChart3, TrendingUp, Zap } from 'lucide-react';

const Dashboard = ({ incidents, onViewList, onSelectIncident, onSimulateFailure }) => {
  const stats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'Open').length,
    resolved: incidents.filter(i => i.status === 'Resolved').length,
    highSeverity: incidents.filter(i => i.severity === 'High' || i.severity === 'Critical').length,
  };

  const recentIncidents = [...incidents]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="animate-slide-up space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Systems Overview</h2>
          <p className="text-slate-400 font-medium text-lg">Real-time health monitoring for <span className="text-indigo-400">ProPayroll AI</span> workflows.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onSimulateFailure}
            className="flex items-center gap-2 px-6 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white rounded-full border border-rose-600/20 transition-all duration-300 font-bold group"
          >
            <Zap size={16} className="group-hover:animate-pulse" />
            Simulate Payroll Failure
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <TrendingUp size={16} className="text-indigo-400" />
            <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Live Monitoring Active</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Incidents" 
          value={stats.total} 
          icon={<BarChart3 size={24} />} 
          color="indigo"
          trend="+2 today"
        />
        <StatCard 
          title="Pending Resolution" 
          value={stats.open} 
          icon={<Clock size={24} />} 
          color="amber"
          trend="Action required"
        />
        <StatCard 
          title="Resolved" 
          value={stats.resolved} 
          icon={<CheckCircle2 size={24} />} 
          color="emerald"
          trend="Last 7 days"
        />
        <StatCard 
          title="Compliance Alerts" 
          value={stats.highSeverity} 
          icon={<ShieldAlert size={24} />} 
          color="rose"
          trend="High priority"
          isAlert={stats.highSeverity > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Incidents List */}
        <div className="lg:col-span-2 glass-card !p-0 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/5">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <AlertCircle size={18} className="text-indigo-400" />
              </div>
              Recent Activity
            </h3>
            <button onClick={onViewList} className="text-indigo-400 hover:text-indigo-300 text-sm font-bold uppercase tracking-wider transition-colors">
              View all Registry
            </button>
          </div>
          
          <div className="divide-y divide-white/5">
            {recentIncidents.map(incident => (
              <div 
                key={incident.id} 
                onClick={() => onSelectIncident(incident.id)}
                className="flex items-center justify-between p-5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-5">
                  <div className={`status-pulse ${
                    incident.severity === 'High' ? 'bg-rose-500' : 
                    incident.severity === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <h4 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{incident.id}: {incident.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">Updated {new Date(incident.updatedAt).toLocaleTimeString()} • {incident.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`badge badge-${incident.severity.toLowerCase()}`}>
                    {incident.severity}
                  </span>
                  <span className="text-xs font-black text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5 font-mono">
                    {incident.errorCode}
                  </span>
                </div>
              </div>
            ))}
            {recentIncidents.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                  <CheckCircle2 size={32} className="text-slate-700" />
                </div>
                <p className="font-medium text-lg text-slate-600">No active incidents found.</p>
              </div>
            )}
          </div>
        </div>

        {/* RCA Categories Chart Placeholder / Info */}
        <div className="glass-card flex flex-col">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <BarChart3 size={18} className="text-emerald-400" />
              </div>
            Error Categories
          </h3>
          <div className="space-y-8 flex-1">
            <CategoryProgress label="Data Issues" percentage={45} color="from-indigo-500 to-indigo-600" />
            <CategoryProgress label="Configuration" percentage={30} color="from-amber-500 to-amber-600" />
            <CategoryProgress label="System Logic" percentage={15} color="from-emerald-500 to-emerald-600" />
            <CategoryProgress label="Compliance" percentage={10} color="from-rose-500 to-rose-600" />
          </div>
          <div className="mt-10 p-5 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-sm text-indigo-200 leading-relaxed font-medium relative z-10">
              <span className="text-indigo-400 font-bold">Support Insight:</span> 70% of current incidents are related to payroll data discrepancies from automated workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, trend, isAlert }) => {
  const colorMap = {
    indigo: 'from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 text-indigo-400 shadow-indigo-500/10',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400 shadow-amber-500/10',
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400 shadow-emerald-500/10',
    rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/20 text-rose-400 shadow-rose-500/10',
  };

  return (
    <div className={`glass-card bg-gradient-to-br ${colorMap[color]} ${isAlert ? 'ring-2 ring-rose-500 animate-pulse-slow' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 bg-slate-900/80 rounded-2xl border border-white/10 ${colorMap[color].split(' ')[2]}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full bg-slate-950/50 border border-white/5 ${isAlert ? 'text-rose-400' : 'text-slate-400'}`}>
          {trend}
        </span>
      </div>
      <div className="text-5xl font-black text-white mb-2 tracking-tighter">{value}</div>
      <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">{title}</div>
    </div>
  );
};

const CategoryProgress = ({ label, percentage, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <span className="text-slate-200 font-bold text-sm">{label}</span>
      <span className="text-slate-500 text-xs font-black">{percentage}%</span>
    </div>
    <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
      <div 
        className={`h-full bg-gradient-to-r ${color} rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)]`} 
        style={{ width: `${percentage}%` }} 
      />
    </div>
  </div>
);

export default Dashboard;
