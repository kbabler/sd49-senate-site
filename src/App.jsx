import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  GraduationCap,
  Home,
  CheckCircle2,
  UserPlus,
  Heart,
  ChevronLeft,
  Users,
  TrendingDown,
  Database,
  Scale,
  Target,
  Award,
  Zap,
  Star
} from 'lucide-react';

/** * BRAND CONFIGURATION */
const BRAND_COLOR = "#755FBE";

// Your actual filenames (mapped to files in public/images)
const ASSETS = {
  hero: "kris-babler-portrait.jpg",
  family: "kris-family.jpg",
  community: "kris-lakes.jpg",
  action: "kris-coaching-basketball.jpg"
};

const SITE_CONTENT = {
  branding: {
    name: "KRIS BABLER",
    title: "Independent for Senate SD49",
    shortName: "KB"
  },
  issues: [
    {
      title: "Fiscal Watchdog",
      points: [
        "Reform the LGA formula to ensure Eden Prairie tax dollars return home.",
        "Direct-to-homeowner property tax credits to offset levy increases.",
        "Zero-based budgeting to audit the $17B state surplus."
      ],
      icon: <Calculator size={24} />
    },
    {
      title: "Education Stewardship",
      points: [
        "Lift state-mandated caps on local school referendums.",
        "Ensuring high-quality educators through competitive, professional compensation.",
        "Common-sense SRO authority to ensure classroom safety."
      ],
      icon: <GraduationCap size={24} />
    },
    {
      title: "Local Autonomy",
      points: [
        "Oppose state-mandated upzoning and forced high-density duplexes.",
        "Protect municipal zoning rights for Minnetonka & Eden Prairie.",
        "Incentivize work-from-home infrastructure for the 27% remote workforce."
      ],
      icon: <Home size={24} />
    }
  ]
};

const SplashOverlay = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <div className="text-center px-6 max-w-2xl">
        <div className="w-32 h-32 mx-auto mb-8 rounded-2xl shadow-2xl overflow-hidden">
          <img src="/images/KB_Logo_Plum_512px.png" alt="Kris Babler Logo" className="w-full h-full object-cover" />
        </div>
        <p className="text-2xl text-slate-600 font-bold mb-8">
          Results over rhetoric
        </p>
        <button
          onClick={onDismiss}
          className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg"
          style={{ backgroundColor: BRAND_COLOR }}
        >
          Enter Site
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const CampaignImage = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    // Normalize source: if it's not an absolute path or URL, assume it's under /images/
    const srcPath = src && !src.startsWith('/') && !src.startsWith('http') ? `/images/${src}` : src;
    if (error) {
      return (
        <div className={`${className} bg-slate-200 flex flex-col items-center justify-center text-slate-400 p-6 text-center border-2 border-dashed border-slate-300`}>
          <Users size={40} className="mb-2 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-widest">{alt}</p>
          <p className="text-[8px] mt-1 opacity-60">File: {srcPath}</p>
        </div>
      );
    }
    return <img src={srcPath} alt={alt} className={className} onError={() => setError(true)} />;
  };

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* KB Logo - Updated 2025-12-31 */}
          <div className="w-10 h-10 rounded-lg shadow-lg overflow-hidden">
            <img src="/images/KB_Logo_Plum_512px.png" alt="Kris Babler Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-brand-navy leading-none tracking-tight uppercase text-lg">KRIS BABLER</h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase">Independent for SD49</p>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-8 items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>The Mission</button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'text-brand-navy' : 'hover:text-slate-600'}>Meet Kris</button>
          <button onClick={() => setActiveTab('issues')} className={activeTab === 'issues' ? 'text-brand-navy' : 'hover:text-slate-600'}>Issues</button>
          <button onClick={() => setActiveTab('volunteer')} className={activeTab === 'volunteer' ? 'text-brand-navy' : 'hover:text-slate-600'}>Volunteer</button>
          <button 
            onClick={() => setActiveTab('pcr')}
            className="text-white px-6 py-2.5 rounded-full transition-all shadow-lg font-black hover:scale-105 active:scale-95"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            DONATE & REFUND
          </button>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border bg-slate-50 text-slate-600 border-slate-200 shadow-sm">
              <Star size={14} style={{ color: BRAND_COLOR }} /> Roots in Eden Prairie & Minnetonka
            </div>
            <h1 className="text-5xl lg:text-[4.8rem] font-black text-brand-navy leading-[0.95] mb-8 tracking-tighter">
              Results over Rhetoric. <br/>
              <span style={{ color: BRAND_COLOR }}>People over Party.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">
              Kris Babler is your neighbor running for State Senate to restore focus to our district. He's an Independent leader putting the needs of our families above partisan noise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setActiveTab('about')}
                className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl"
              >
                Meet Kris <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setActiveTab('pcr')}
                className="bg-white text-brand-navy border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
              >
                The $75 Refund
              </button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
             <div className="relative aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                <CampaignImage 
                  src={ASSETS.hero} 
                  alt="Kris Babler Official Portrait" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-10 -right-10 w-full h-full bg-slate-50 rounded-[3rem] -z-0 transform -rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-square bg-white p-2">
                 <CampaignImage src={ASSETS.family} alt="Kris with family" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="bg-brand-navy p-8 rounded-3xl text-white">
                 <Heart className="mb-4 text-rose-500" />
                 <p className="text-xs font-bold leading-relaxed uppercase tracking-tight">Dedicated to the future of our local families.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-[3/4] bg-white p-2">
                 <CampaignImage src={ASSETS.community} alt="In the community" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-square bg-white p-2">
                 <CampaignImage src={ASSETS.action} alt="Taking action" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-brand-navy leading-tight">
              A Life Defined by <br/>
              <span style={{ color: BRAND_COLOR }}>Service & Stewardship.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                Kris Babler isn't running for a title—he's running to represent his neighbors. As a professional, a father, and a long-time resident of SD49, Kris understands that our community values results over political theater.
              </p>
              <p>
                From Eden Prairie to Minnetonka, he has seen the impact of St. Paul's disconnect from suburban priorities. Kris is focused on a common-sense approach that protects our schools, secures our tax dollars, and preserves local control.
              </p>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('issues')}
                  className="bg-brand-navy text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg"
                >
                  View the Playbook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const IssuesSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-brand-navy mb-4 tracking-tight uppercase italic">The SD49 Playbook</h2>
            <p className="text-slate-500 font-medium italic">Practical solutions for a productive district.</p>
          </div>
          <div className="hidden md:block">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-navy flex items-center justify-center text-white text-[10px] font-black italic">
                +49
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SITE_CONTENT.issues.map((issue, idx) => (
            <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-slate-300 transition-all group">
              <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: BRAND_COLOR }}>
                {issue.icon}
              </div>
              <h3 className="text-2xl font-black mb-6 text-brand-navy">{issue.title}</h3>
              <ul className="space-y-4">
                {issue.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex gap-3 text-sm font-medium text-slate-600 leading-relaxed">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const VolunteerPortal = () => (
    <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600"><UserPlus /></div>
          <div>
            <h2 className="text-3xl font-black tracking-tight uppercase">Join the Movement</h2>
            <p className="text-slate-500 font-medium">Lend your voice to a neighbor-led campaign.</p>
          </div>
        </div>
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" className="w-full bg-slate-50 border-none p-5 rounded-2xl font-medium outline-none focus:ring-2" style={{"--tw-ring-color": BRAND_COLOR}} placeholder="Full Name" />
            <input type="tel" className="w-full bg-slate-50 border-none p-5 rounded-2xl font-medium outline-none focus:ring-2" style={{"--tw-ring-color": BRAND_COLOR}} placeholder="Mobile Number" />
          </div>
          <button className="w-full py-6 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-lg" style={{ backgroundColor: BRAND_COLOR }}>
            GET INVOLVED
          </button>
        </form>
      </div>
    </div>
  );

  const DonationPortal = () => (
    <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
      <div className="bg-brand-navy rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">Support SD49 Independence</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl leading-relaxed">
            The <span className="text-white font-bold underline decoration-indigo-500">Political Contribution Refund</span> makes it easy. Donate $75 and the State of Minnesota will refund you 100%.
          </p>
          <div className="flex flex-wrap gap-4">
             <button className="bg-white text-brand-navy px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-colors">Donate $75</button>
             <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest border border-slate-700 hover:bg-slate-700">Other Amount</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Award size={120} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy tracking-tight">
      {showSplash && <SplashOverlay onDismiss={() => setShowSplash(false)} />}
      <Navigation />
      
      <main className="animate-fade-in">
        {activeTab === 'home' && (
          <>
            <Hero />
            <AboutSection />
            <IssuesSection />
          </>
        )}
        
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'issues' && <IssuesSection />}
        {activeTab === 'volunteer' && <VolunteerPortal />}
        {activeTab === 'pcr' && <DonationPortal />}
      </main>

      <footer className="bg-slate-50 py-20 border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[9px] text-slate-400 border border-slate-200 px-6 py-3 rounded-full uppercase font-black tracking-[0.4em] inline-block mb-4">
            Prepared and paid for by Babler for Senate (SD49)
          </p>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest block">© 2025 Kris Babler for State Senate</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
