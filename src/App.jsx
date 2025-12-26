import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  TrendingDown, 
  ArrowRight,
  Database,
  Scale,
  ChevronLeft,
  Heart,
  Target,
  Zap,
  Award
} from 'lucide-react';

/** * BRAND CONFIGURATION */
const BRAND_COLOR = "#755FBE";

const SITE_CONTENT = {
  branding: {
    name: "KRIS BABLER",
    title: "Independent for Senate SD49",
    shortName: "KB"
  },
  auditStats: [
    { 
      title: "Betrayal of Stewardship", 
      value: "$250 Million", 
      desc: "Stolen from vulnerable children in the Feeding Our Future fraud. A systemic failure of executive oversight.",
      icon: <TrendingDown className="text-red-500" />
    },
    { 
      title: "The Accountability Gap", 
      value: "$9 Billion", 
      desc: "Funds identified by prosecutors as mismanaged or lost to agency inefficiency.",
      icon: <Database style={{ color: BRAND_COLOR }} />
    },
    { 
      title: "The Net Donor Tax", 
      value: "$1.18 Billion", 
      desc: "In new taxes levied on productive districts like SD49 despite a record state surplus.",
      icon: <Scale className="text-slate-900" />
    }
  ]
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [fraudCounter, setFraudCounter] = useState(250000000);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraudCounter(prev => prev + (Math.random() * 8.5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-slate-900 text-white p-2 rounded-lg">
            <span className="font-bold text-xl tracking-tighter italic">KB</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none tracking-tight uppercase text-lg">KRIS BABLER</h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase">Independent for SD49</p>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-8 items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
          {['Logic', 'Audit', 'Service'].map(item => (
            <button 
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className="hover:text-slate-900 transition-colors"
              style={{ color: activeTab === item.toLowerCase() ? BRAND_COLOR : undefined }}
            >
              {item}
            </button>
          ))}
          <button 
            className="text-white px-6 py-2.5 rounded-full transition-all shadow-lg font-black"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            SECURE $75 REFUND
          </button>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <section className="pt-40 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 border"
                 style={{ backgroundColor: `${BRAND_COLOR}10`, color: BRAND_COLOR, borderColor: `${BRAND_COLOR}30` }}>
              <ShieldCheck size={14} /> The 34th Vote Strategy
            </div>
            <h1 className="text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Your Vote. <br/><span style={{ color: BRAND_COLOR }}>The State's Lever.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">
              Voters in Eden Prairie and Minnetonka aren't looking for a "vibe"—you're looking for an ROI on your tax dollars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setActiveTab('logic')}
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                The Audit Logic <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-slate-50 p-2 rounded-[2.5rem] shadow-inner border border-slate-100 overflow-hidden">
               <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                    <h3 className="font-black text-slate-900 text-sm tracking-widest uppercase flex items-center gap-2">
                       <Scale size={18} style={{ color: BRAND_COLOR }} /> Senate Dynamic Audit
                    </h3>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">Active Lever</span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex gap-1 h-20 rounded-2xl overflow-hidden p-1.5 bg-slate-100 border border-slate-200">
                       <div className="w-[49%] bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-[10px] tracking-widest">DFL (33)</div>
                       <div className="w-[2%] mx-0.5 rounded-lg flex items-center justify-center text-white font-black text-[10px] animate-pulse" style={{ backgroundColor: BRAND_COLOR }}>1</div>
                       <div className="w-[49%] bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-[10px] tracking-widest">GOP (33)</div>
                    </div>
                    
                    <div className="p-8 bg-slate-900 rounded-[2rem] relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-20 text-white"><TrendingDown size={40} /></div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Live Mismanagement Counter</p>
                       <p className="text-4xl font-mono font-bold text-white tracking-tighter">
                          ${fraudCounter.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                       </p>
                       <p className="mt-4 text-[11px] text-slate-500 font-medium max-w-[200px]">Estimated funds lost since 2022.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const AuditDashboard = () => (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 animate-fade-in">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Performance Metrics</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">
            Accountability isn't a partisan value—it's a requirement for a $60 Billion organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {SITE_CONTENT.auditStats.map((item, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-black text-slate-900 text-xl mb-4 tracking-tight">{item.title}</h3>
              <p className="text-4xl font-mono font-bold text-slate-900 mb-6 tracking-tighter">{item.value}</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const LogicPage = () => (
    <div className="pt-40 pb-32 px-4 max-w-5xl mx-auto animate-fade-in">
      <h2 className="text-6xl font-black mb-12 tracking-tighter">Strategic <span style={{ color: BRAND_COLOR }}>Accountability</span></h2>
      <div className="grid md:grid-cols-2 gap-12 mb-20">
         <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl">
            <h3 className="text-2xl font-black mb-6 italic" style={{ color: BRAND_COLOR }}>The Independent Veto</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
               "A Republican vote in SD49 is a vote for the powerless minority. An Independent vote for Kris Babler creates the 34th Vote."
            </p>
         </div>
         <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <Heart size={100} className="absolute -bottom-10 -right-10 opacity-5" style={{ color: BRAND_COLOR }} />
            <h3 className="text-2xl font-black mb-6">Values Safeguard</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10">
               Accountability is a requirement. Fraud steals from the vulnerable. Fix the machine to protect the people.
            </p>
         </div>
      </div>
      <button onClick={() => setActiveTab('home')} className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
         <ChevronLeft size={16} /> Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 tracking-tight">
      <style>{styles}</style>
      <Navigation />
      
      <main>
        {activeTab === 'home' && (
          <>
            <Hero />
            <AuditDashboard />
          </>
        )}
        
        {activeTab === 'logic' && <LogicPage />}

        {!['home', 'logic'].includes(activeTab) && (
           <div className="pt-40 pb-32 text-center">
             <div className="max-w-xl mx-auto py-24 bg-slate-50 rounded-[3rem] border border-slate-200">
               <Target size={60} className="mx-auto text-slate-200 mb-8" />
               <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Syncing Data...</h2>
               <p className="text-slate-500 px-12 mb-10">This module is currently populating with campaign intelligence.</p>
               <button onClick={() => setActiveTab('home')} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase">Return Home</button>
             </div>
           </div>
        )}
      </main>

      <footer className="bg-white py-24 border-t border-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[9px] text-slate-400 border border-slate-200 px-5 py-2.5 rounded-full uppercase font-black tracking-[0.3em] inline-block mb-4">
            Prepared and paid for by Babler for Senate (SD49)
          </p>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2025 Babler for Senate</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
