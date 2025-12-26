import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  TrendingDown, 
  Search, 
  Target, 
  Briefcase, 
  Users, 
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  PieChart,
  ClipboardCheck,
  Zap,
  Award,
  Lock,
  Heart,
  Database,
  ArrowUpRight,
  ChevronLeft,
  Scale
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
      desc: "Funds identified by prosecutors as mismanaged or lost to agency inefficiency. Resources stolen from the social safety net.",
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
  const [zipCode, setZipCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraudCounter(prev => prev + (Math.random() * 8.5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const zipData = {
    '55344': { city: 'Eden Prairie', lga: '$0', funding: 'Capped', status: 'Net Donor' },
    '55347': { city: 'Eden Prairie', lga: '$0', funding: 'Capped', status: 'Net Donor' },
    '55345': { city: 'Minnetonka', lga: '$0', funding: 'Capped', status: 'Net Donor' },
    '55305': { city: 'Minnetonka', lga: '$0', funding: 'Capped', status: 'Net Donor' },
  };

  const handleZipSearch = (e) => {
    e.preventDefault();
    setSearchResult(zipData[zipCode] || 'not-found');
  };

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
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
            {['Logic', 'Audit', 'Local', 'Service'].map(item => (
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
              className="text-white px-6 py-2.5 rounded-full transition-all shadow-lg"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              SECURE $75 REFUND
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <section className="pt-40 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
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
          
          <div className="relative animate-in fade-in zoom-in duration-700">
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
                       <p className="mt-4 text-[11px] text-slate-500 font-medium max-w-[200px]">Estimated funds lost to agency fraud and management crisis since 2022.</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="absolute -top-6 -right-6">
               <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="p-2.5 rounded-xl text-white" style={{ backgroundColor: BRAND_COLOR }}>
                     <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">SD49</p>
                    <p className="text-sm font-black text-slate-900 leading-tight">The Independent <br/>34th Vote</p>
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
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Performance Metrics</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">
            Accountability isn't a partisan value—it's a requirement for a $60 Billion organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {SITE_CONTENT.auditStats.map((item, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
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

  const AccountabilitySection = () => (
    <section className="relative py-40 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
         <img 
           src="https://via.placeholder.com/1600x900?text=State+Capitol" 
           className="w-full h-full object-cover opacity-20 grayscale scale-110" 
           alt="State Capitol"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-black text-white mb-8 leading-tight tracking-tighter">
            Where Did the <br/><span style={{ color: BRAND_COLOR }}>Money Go?</span>
          </h2>
          <p className="text-slate-400 text-xl leading-relaxed mb-12 font-medium">
            While SD49 families balance their checkbooks, the state government has overseen a historic management crisis. From the $250M Feeding Our Future scandal to billion-dollar agency leaks, the social safety net is being drained by corruption.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default group">
               <ShieldCheck style={{ color: BRAND_COLOR }} className="shrink-0 group-hover:scale-110 transition-transform" />
               <p className="text-white font-bold tracking-tight">Protecting programs by purging fraud.</p>
            </div>
            <div className="flex items-start gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default group">
               <Database style={{ color: BRAND_COLOR }} className="shrink-0 group-hover:scale-110 transition-transform" />
               <p className="text-white font-bold tracking-tight">Unlocking local school funding from St. Paul's handcuffs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ServiceSection = () => (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
               <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://via.placeholder.com/800x1000?text=Kris+Coaching" className="w-full h-full object-cover" alt="Kris Coaching" />
               </div>
               <div className="aspect-square rounded-[2.5rem] bg-slate-900 flex items-center justify-center p-10">
                  <p className="text-white font-black text-3xl leading-none tracking-tighter">Skin in the <br/>Game.</p>
               </div>
            </div>
            <div className="pt-12 space-y-6">
               <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://via.placeholder.com/800x800?text=Family+of+Servants" className="w-full h-full object-cover" alt="Family" />
               </div>
               <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://via.placeholder.com/800x1000?text=Professional+Leadership" className="w-full h-full object-cover" alt="Professional Leadership" />
               </div>
            </div>
          </div>

          <div>
            <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8" style={{ backgroundColor: `${BRAND_COLOR}15`, color: BRAND_COLOR }}>
               CEO • Army • Coach
            </div>
            <h2 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter">A Record of Delivery.</h2>
            <div className="space-y-8 text-slate-500 text-lg leading-relaxed font-medium">
              <p>
                I am not a career politician. I am a father, a business leader, and a veteran who understands that you cannot manage what you do not measure.
              </p>
              <p>
                My "Family of Servants" approach means I view this role as a mission, not a promotion. I have skin in the game—my children attend these schools, and my neighbors pay these taxes.
              </p>
              
              <div className="pt-8 border-t border-slate-100 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl italic">KB</div>
                 <div>
                    <p className="font-black text-slate-900 uppercase tracking-widest text-sm">Kris Babler</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Performance-First Leadership</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const LocalAuditSection = () => (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
       <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight italic">How is your precinct doing?</h2>
          <form onSubmit={handleZipSearch} className="flex gap-4 mb-12">
             <input 
               type="text" 
               placeholder="Enter Zip Code (55344, 55305...)" 
               className="flex-1 px-8 py-5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-slate-900 transition-all font-bold text-lg"
               value={zipCode}
               onChange={(e) => setZipCode(e.target.value)}
             />
             <button className="px-12 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl" style={{ backgroundColor: BRAND_COLOR }}>Audit</button>
          </form>

          {searchResult && searchResult !== 'not-found' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
               <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">State Funding Cap</p>
                  <p className="text-4xl font-black text-red-500">{searchResult.funding}</p>
               </div>
               <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Tax Balance</p>
                  <p className="text-4xl font-black text-slate-900">{searchResult.status}</p>
               </div>
            </div>
          )}
       </div>
    </section>
  );

  const LogicPage = () => (
    <div className="pt-40 pb-32 px-4 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8">
      <h2 className="text-6xl font-black mb-12 tracking-tighter">Strategic <span style={{ color: BRAND_COLOR }}>Accountability</span></h2>
      <div className="grid md:grid-cols-2 gap-12 mb-20">
         <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl">
            <h3 className="text-2xl font-black mb-6 italic" style={{ color: BRAND_COLOR }}>The Independent Veto</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
               "A Republican vote in SD49 is a vote for the powerless minority. An Independent vote for Kris Babler creates the 34th Vote—the only vote that can actually force an audit of state agencies."
            </p>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-slate-500">Business Intelligence</p>
               <p className="font-bold text-sm">Holding the line against the 35 new workplace mandates.</p>
            </div>
         </div>
         <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <Heart size={100} className="absolute -bottom-10 -right-10 opacity-5" style={{ color: BRAND_COLOR }} />
            <h3 className="text-2xl font-black mb-6">Values Safeguard</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10">
               "Accountability is a liberal value. Fraud steals from the vulnerable. I am pro-choice and pro-privacy—protecting the personal autonomy of Minnesotans while fixing the broken state machine."
            </p>
            <button className="text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all" style={{ color: BRAND_COLOR }}>
               Full Policy Brief <ArrowRight size={16} />
            </button>
         </div>
      </div>
      <button onClick={() => setActiveTab('home')} className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
         <ChevronLeft size={16} /> Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-50 tracking-tight">
      <Navigation />
      
      <main>
        {activeTab === 'home' && (
          <>
            <Hero />
            <AuditDashboard />
            <AccountabilitySection />
            <LocalAuditSection />
            <ServiceSection />
          </>
        )}
        
        {activeTab === 'logic' && <LogicPage />}

        {['audit', 'local', 'service'].includes(activeTab) && (
           <div className="pt-40 pb-32 text-center">
             <div className="max-w-xl mx-auto py-24 bg-slate-50 rounded-[3rem] border border-slate-200">
               <Database size={60} className="mx-auto text-slate-200 mb-8" />
               <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Populating Data...</h2>
               <p className="text-slate-500 px-12 mb-10">This module is syncing with the 2024 Strategic Audit reports.</p>
               <button onClick={() => setActiveTab('home')} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase">Dashboard Home</button>
             </div>
           </div>
        )}
      </main>

      <footer className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:row justify-between items-center gap-12 border-b border-slate-100 pb-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2 rounded-lg">
                <span className="font-bold italic">KB</span>
              </div>
              <p className="font-black text-slate-900 uppercase tracking-tighter text-xl">KRIS BABLER</p>
            </div>
            <div className="flex gap-4">
               <button className="px-8 py-4 rounded-xl text-white font-black text-[10px] tracking-widest uppercase shadow-xl" style={{ backgroundColor: BRAND_COLOR }}>Secure $75 Refund</button>
               <button className="px-8 py-4 rounded-xl bg-slate-100 text-slate-600 font-black text-[10px] tracking-widest uppercase border border-slate-200">Walk with accountability</button>
            </div>
          </div>
          <div className="flex flex-col md:row justify-between items-center gap-6">
            <p className="text-[9px] text-slate-400 border border-slate-200 px-5 py-2.5 rounded-full uppercase font-black tracking-[0.3em]">
              Prepared and paid for by Babler for Senate (SD49)
            </p>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2025 Babler for Senate</p>
          </div>
        </div>
      </footer>
      
      {/* PCR Floating CTA */}
      <div className="fixed bottom-10 right-10 z-40 hidden md:block group">
        <button className="text-white p-1 pr-10 rounded-full flex items-center gap-5 shadow-2xl hover:scale-105 transition-all" style={{ backgroundColor: BRAND_COLOR }}>
          <div className="bg-white/20 p-5 rounded-full">
            <Zap size={24} />
          </div>
          <span className="font-black text-xs uppercase tracking-[0.2em]">Claim your $75 Refund</span>
        </button>
      </div>
    </div>
  );
};

export default App;
