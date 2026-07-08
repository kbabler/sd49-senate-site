import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  GraduationCap,
  Home,
  CheckCircle2,
  MessageSquare,
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
  Star,
  Newspaper,
  ExternalLink,
  Phone,
  Mail,
  Facebook
} from 'lucide-react';

/** * BRAND CONFIGURATION */
const BRAND_COLOR = "#00c2cc";
const CALENDLY_URL = "https://calendly.com/kb-krisbabler/30min?hide_event_type_details=1&primary_color=00c2cc";
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS_SRC = "https://assets.calendly.com/assets/external/widget.css";

// Optional: set this to your Google Form post endpoint if you want native form submission
// Example: https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
// Note: if you use this path, you also need to update the input names to Google Form entry IDs like entry.123456.
const GOOGLE_FORM_ACTION_URL = "";
const USE_GOOGLE_FORM = Boolean(GOOGLE_FORM_ACTION_URL);

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfSB4cXyKBQQdLl2C5pw4lL0Q4t2KBdF8VwcOLZ_0gijH6KbRQAKTP1N-XgQZOnww8rw/exec";

// Your actual filenames (mapped to files in public/images)
const ASSETS = {
  heroVideo: "mix2.mp4",
  family: "kris-family.jpg",
  community: "kris-lakes.jpg",
  action: "kris-coaching-basketball.jpg",
  promotion: "promotion-cpt.jpg",
  serviceFamily: "family-service.jpg",
  capital: "st-paul-state-capital.jpg"
};

const SITE_CONTENT = {
  branding: {
    name: "KRIS BABLER",
    title: "Independent for Senate SD49",
    shortName: "KB"
  },
  news: {
    substackUrl: "https://krisbabler.substack.com/",
    items: [
      {
        title: "On Policy: The Tax the Rich Deceit",
        description: "A direct look at the current state of Minnesota governance and what voters should expect from real leadership.",
        source: "Substack",
        href: "https://krisbabler.substack.com/p/on-policy-the-tax-the-rich-deceit?r=1i94n6"
      },
      {
        title: "On Policy #2: The $168 Billion Healthcare Question",
        description: "A closer look at the growing healthcare cost crisis and the reforms Minnesota needs to protect families and taxpayers.",
        source: "Substack",
        href: "https://krisbabler.substack.com/p/on-policy-2-the-168-billion-healthcare?r=1i94n6"
      },
      {
        title: "You Are Not Alone",
        description: "A message for neighbors who feel left out of the partisan noise and are looking for a more grounded path forward.",
        source: "Substack",
        href: "https://krisbabler.substack.com/p/you-are-not-alone?r=1i94n6"
      },
      {
        title: "On Policy: People Need Jobs",
        description: "A clear look at how workforce and economic policy shape opportunity for families and communities across Minnesota.",
        source: "Substack",
        href: "https://open.substack.com/pub/krisbabler/p/people-need-jobs?r=1i94n6&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"
      },
      {
        title: "Why I'm Stepping Into the Arena",
        description: "Kris shares the personal story and conviction behind his decision to run for Senate — and what's at stake for SD49.",
        source: "Substack",
        href: "https://krisbabler.substack.com/p/why-im-stepping-into-the-arena"
      }
    ]
  },
  issues: [
    {
      title: "Fiscal Watchdog",
      points: [
        "Balance the budget. I'll demand professional audits to ensure your taxes fund results, not St. Paul's systemic waste."
      ],
      icon: <Calculator size={24} />
    },
    {
      title: "Educational Excellence",
      points: [
        "Classrooms over bureaucracy. Let local parents and teachers decide our priorities, not top-down mandates from St. Paul."
      ],
      icon: <GraduationCap size={24} />
    },
    {
      title: "People Need Jobs",
      points: [
        "Human-centric growth. Pro-economic growth policies that protect our future, cut housing costs, and create jobs."
      ],
      icon: <Home size={24} />
    },
    {
      title: "Settled Law",
      points: [
        "I view reproductive freedom and marriage equality as settled. I'm here to block distractions, not relitigate the past."
      ],
      icon: <ShieldCheck size={24} />
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
  const [showSplash, setShowSplash] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    smsConsent: false
  });
  const [volunteerOptions, setVolunteerOptions] = useState({
    knockDoors: false,
    hostListening: false,
    yardSign: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buildTogetherSubmitting, setBuildTogetherSubmitting] = useState(false);
  const [buildTogetherSubmitted, setBuildTogetherSubmitted] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const heroVideoRef = useRef(null);

  const scrollToSection = (id) => {
    setScrollTarget(id);
    setActiveTab('home');
  };

  useEffect(() => {
    if (activeTab === 'home' && scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setScrollTarget(null);
    }
  }, [activeTab, scrollTarget]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    try {
      v.preload = 'auto';
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {
        // autoplay may be blocked; muted autoplay typically allowed—fail silently
        console.debug('Hero video play was prevented by browser autoplay policy');
      });
    } catch (err) {
      console.debug('Error attempting to play hero video', err);
    }
  }, []);

  const [calendlyScriptLoaded, setCalendlyScriptLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS_SRC}"]`)) {
      const link = document.createElement('link');
      link.href = CALENDLY_CSS_SRC;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) {
      setCalendlyScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setCalendlyScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Calendly script');
      setCalendlyScriptLoaded(false);
    };
    document.body.appendChild(script);
  }, []);

  const openCalendlyPopup = (e) => {
    if (e) e.preventDefault();

    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }

    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  const handleSignupSubmit = async (e) => {
    if (USE_GOOGLE_FORM) return;
    e.preventDefault();
    const form = e.target;
    console.log('Signup form submitted:', signupForm);
    try {
      const formData = new FormData(form);
      formData.set('smsConsent', signupForm.smsConsent ? 'Yes' : 'No');
      formData.set('involvement', 'Join the Mission');
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      setFormSubmitted(true);
      form.reset();
      setSignupForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        smsConsent: false
      });
      setTimeout(() => setFormSubmitted(false), 3000);
    } catch (error) {
      console.error('Error!', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBuildTogetherSubmit = async (e) => {
    if (USE_GOOGLE_FORM) return;
    e.preventDefault();
    const form = e.target;
    setBuildTogetherSubmitting(true);

    try {
      const formData = new FormData(form);
      const involvement = [
        volunteerOptions.knockDoors && 'Knocking on Doors',
        volunteerOptions.yardSign && 'Yard Sign Request',
        volunteerOptions.hostListening && 'Hosting a Listening Post'
      ]
        .filter(Boolean)
        .join('; ');

      formData.set('knockDoors', volunteerOptions.knockDoors ? 'Yes' : 'No');
      formData.set('yardSign', volunteerOptions.yardSign ? 'Yes' : 'No');
      formData.set('hostListening', volunteerOptions.hostListening ? 'Yes' : 'No');
      formData.set('smsConsent', signupForm.smsConsent ? 'Yes' : 'No');
      formData.set('involvement', involvement || 'Build Together');

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      setBuildTogetherSubmitted(true);
      form.reset();
      setSignupForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        smsConsent: false
      });
      setVolunteerOptions({
        knockDoors: false,
        hostListening: false,
        yardSign: false
      });
    } catch (error) {
      console.error('Error!', error.message);
    } finally {
      setBuildTogetherSubmitting(false);
      setTimeout(() => setBuildTogetherSubmitted(false), 3000);
    }
  };

  const handleVolunteerChange = (e) => {
    const { name, checked } = e.target;
    setVolunteerOptions(prev => ({
      ...prev,
      [name]: checked
    }));
  };

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

  const DonationWidget = () => {
    return (
      <button
        onClick={() => setActiveTab('volunteer')}
        className="text-white px-6 py-2.5 rounded-full transition-all shadow-lg font-black hover:scale-105 active:scale-95"
        style={{ backgroundColor: BRAND_COLOR }}
      >
        $75 REFUND
      </button>
    );
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
            <h1 className="font-black text-brand-navy leading-none tracking-tight uppercase text-xl lg:text-2xl">KRIS BABLER</h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase">SD49 (Eden Prairie &amp; Minnetonka)</p>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-8 items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
          <button onClick={() => scrollToSection('issues')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>Playbook</button>
          <button onClick={() => scrollToSection('about')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>The Man</button>
          <button onClick={() => scrollToSection('service')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>Service in Action</button>
          <button onClick={() => scrollToSection('volunteer')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>Get Involved</button>
          <button onClick={() => scrollToSection('pcr')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>Donate</button>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <section className="relative w-full bg-white flex flex-col lg:flex-row lg:items-center pt-20 lg:min-h-[85vh] overflow-hidden">
      
      {/* 1. THE VIDEO: Anchored to the right, scaled by height to prevent cropping */}
      <div className="relative w-full h-[56.25vw] sm:h-[48vw] md:h-[40vw] lg:absolute lg:top-0 lg:right-0 lg:w-[65%] lg:h-full z-0 lg:flex lg:justify-end">
        
        {/* 2. THE GRADIENT SHIELD: Bridges the white gap and fades into the video */}
        <div 
          className="hidden lg:block absolute inset-y-0 left-0 w-full z-10 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to right, #ffffff 0%, #ffffff 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)' 
          }}
        ></div>

        <video
          ref={heroVideoRef}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center lg:w-auto lg:max-w-none lg:object-[center_right] z-0"
        >
          <source src={`/images/${ASSETS.heroVideo}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 3. THE TEXT CONTENT: Anchored safely to the left */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:min-h-[85vh] lg:flex lg:items-center pointer-events-none">
        <div className="w-full lg:w-[50%] py-10 lg:py-12 bg-white lg:bg-transparent pointer-events-auto">
          
          <h1 className="text-5xl lg:text-[4.8rem] font-black text-brand-navy leading-[0.95] mb-6 tracking-tighter">
            Our District.<br/>
            <span style={{ color: BRAND_COLOR }}>Their Mess.</span><br/>
            Your Choice.
          </h1>
          
          <h2 className="text-xl lg:text-2xl font-black text-brand-navy mb-6 max-w-lg">
            Tired of party gridlock? You are not alone.
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-950 mb-8 max-w-lg leading-relaxed font-medium">
            I’m <strong>Kris Babler</strong>—former Army Captain, coach, and Independent. The party machines are corrupted by special interests and self-service. I owe them nothing.
          </p>
          
          <p className="text-lg lg:text-xl text-slate-950 mb-10 max-w-lg leading-relaxed font-medium">
            With a deciding swing vote, I will force both sides to govern. I don’t answer to party bosses. <strong>I answer to you.</strong>
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-lg max-w-xl">
            <h3 className="text-xl font-black text-brand-navy mb-3 uppercase tracking-wide">Meet Kris</h3>
            <p className="text-slate-600 mb-6 leading-relaxed font-medium">
              Book 20 minutes with Kris to discuss district priorities, service, or local campaign concerns.
            </p>
            <button
              type="button"
              onClick={openCalendlyPopup}
              disabled={!calendlyScriptLoaded}
              className="w-full py-4 rounded-full font-black text-white text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              {calendlyScriptLoaded ? 'Book 20 Minutes with Kris' : 'Loading...'}
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );

  const InvestmentBar = () => (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-brand-navy mb-4 tracking-tight">
            Give $75—Get $75 Back
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
            Minnesota's PCR program fully refunds your first $75 contribution ($150 for couples). It costs you nothing to fuel an independent voice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://secure.anedot.com/campaign-fund-of-kris-babler/donate?amount=25"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition-all"
            >
              $25
            </a>
            <a
              href="https://secure.anedot.com/campaign-fund-of-kris-babler/donate?amount=50"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition-all"
            >
              $50
            </a>
            <a
              href="https://secure.anedot.com/campaign-fund-of-kris-babler/donate?amount=75"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white shadow-lg hover:scale-105 transition-all"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              $75 (Refundable)
            </a>
            <a
              href="https://secure.anedot.com/campaign-fund-of-kris-babler/donate?amount=150"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition-all"
            >
              $150
            </a>
            <a
              href="https://secure.anedot.com/campaign-fund-of-kris-babler/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition-all"
            >
              Custom
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section id="about" className="py-24 bg-slate-50">
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
              A Neighbor Running To <br/>
              <span style={{ color: BRAND_COLOR }}>Make A Difference.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                I'm a dad, a local business owner, and a neighbor who believes that if you see a problem, you step up. My path to this campaign wasn't through politics; it was through service.
              </p>
              <div className="space-y-6">
                <p>
                  <span className="font-black">Leadership Under Pressure</span> As a U.S. Army Captain, I learned that leadership isn't about rank—it's about the mission and the people. When a plan fails in the field, you don't point fingers; you adapt and get the job done. I'm bringing that same "mission-first" accountability to St. Paul.
                </p>
                <p>
                  <span className="font-black">Cutting the Red Tape</span> Working in School Administration, I saw how top-down mandates from the state get in the way of actual learning. We need to stop the experiments and start supporting our teachers and parents so our kids can thrive.
                </p>
                <p>
                  <span className="font-black">Building the Team</span> Coaching basketball is where I've seen the real Minnesota. It's about discipline and showing up for each other. I'm not a career politician—I'm running to be a teammate for Eden Prairie and Minnetonka.
                </p>
                <p>
                  <span className="font-black">Protecting the Bottom Line</span> As a Business Owner, I know the weight of a budget. Every dollar St. Paul spends comes out of your pocket. I will treat your tax dollars with the same respect I treat my own bottom line—because you've earned it.
                </p>
              </div>
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
    <section id="issues" className="py-24 bg-white">
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

  const BuildTogetherSection = () => (
    <section id="volunteer" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">Build Together</h2>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">Tell us how you want to help protect our district.</p>
          </div>

          <form
            id="kris-form"
            action={GOOGLE_FORM_ACTION_URL || undefined}
            method="POST"
            target={GOOGLE_FORM_ACTION_URL ? "_blank" : undefined}
            onSubmit={handleBuildTogetherSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="involvement" value={
              [
                volunteerOptions.knockDoors && 'Knocking on Doors',
                volunteerOptions.yardSign && 'Yard Sign Request',
                volunteerOptions.hostListening && 'Hosting a Listening Post'
              ]
              .filter(Boolean)
              .join('; ') || 'Build Together'
            } />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                required
                value={signupForm.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-200 focus:border-white/50 focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                required
                value={signupForm.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-200 focus:border-white/50 focus:outline-none"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              required
              value={signupForm.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-200 focus:border-white/50 focus:outline-none"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                value={signupForm.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-200 focus:border-white/50 focus:outline-none"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code*"
                required
                value={signupForm.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-slate-200 focus:border-white/50 focus:outline-none"
              />
            </div>

            <div className="text-left space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">I want to help with:</p>
              <div className="grid gap-3">
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    name="knockDoors"
                    value="Yes"
                    checked={volunteerOptions.knockDoors}
                    onChange={handleVolunteerChange}
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                  Knocking on Doors
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    name="yardSign"
                    value="Yes"
                    checked={volunteerOptions.yardSign}
                    onChange={handleVolunteerChange}
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                  Yard Sign Request
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    name="hostListening"
                    value="Yes"
                    checked={volunteerOptions.hostListening}
                    onChange={handleVolunteerChange}
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                  Hosting a Listening Post
                </label>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-200 leading-relaxed">
                <input
                  type="checkbox"
                  name="smsConsent"
                  required
                  checked={signupForm.smsConsent}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10"
                />
                <span className="text-sm text-slate-200 leading-relaxed">
                  By providing my number, I consent to receive updates via text. Msg/data rates apply. Reply STOP to opt-out. <a href="/privacy" className="underline text-slate-300">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              id="submit-btn"
              className="w-full py-4 rounded-xl font-black text-brand-navy uppercase tracking-widest text-sm transition-all hover:scale-105 shadow-lg bg-white"
            >
              {buildTogetherSubmitting ? 'Sending...' : 'SIGN ME UP'}
            </button>

            {buildTogetherSubmitted && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center text-emerald-800 font-semibold">
                Mission Received. Thanks for joining the team!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );

  const ServiceSection = () => (
    <section id="service" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-navy mb-4 tracking-tighter uppercase italic">Service in Action</h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">85 years of combined military service. Between my grandfathers, my father, and my own time in the Army, service is more than a slogan for me—it's a family tradition.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <CampaignImage src={ASSETS.promotion} alt="Promotion Captain" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <CampaignImage src={ASSETS.capital} alt="St. Paul State Capital" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <CampaignImage src={ASSETS.serviceFamily} alt="Family Service" className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-8 text-center">Kris Babler is a former member of the U.S. Army. Use of his military rank, job titles, and photographs in uniform does not imply endorsement by the Department of the Army or the Department of Defense.</p>
      </div>
    </section>
  );

  const NewsSection = () => (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border bg-slate-50 text-slate-600 border-slate-200 shadow-sm">
                <Newspaper size={14} style={{ color: BRAND_COLOR }} /> Articles & News
              </div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-brand-navy leading-tight mb-4">
                Step out of the partisan echo chamber.
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                I&apos;m breaking down the truth about Minnesota governance and the path to fixing our state. Join for a neighbor&apos;s take on the issues at my Substack.
              </p>
            </div>

            <a
              href={SITE_CONTENT.news.substackUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Follow Me <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {SITE_CONTENT.news.items.map((item, idx) => (
              <div key={idx} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">{item.source}</p>
                  <h3 className="text-2xl font-black text-brand-navy mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.description}</p>
                </div>

                {item.href !== '#' ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide"
                    style={{ color: BRAND_COLOR }}
                  >
                    Open link <ArrowRight size={16} />
                  </a>
                ) : (
                  <span className="text-sm font-black uppercase tracking-wide text-slate-400">
                    Paste URL here
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const DonateSection = () => (
    <section id="pcr" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-start mb-12">
            <div>
              <h2 className="text-4xl font-black text-brand-navy mb-4 tracking-tight uppercase">Donate to Fuel the Campaign</h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Donations are now live. Make your secure contribution below to support Kris Babler for State Senate.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <p className="text-3xl font-black" style={{ color: BRAND_COLOR }}>$75</p>
                <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mt-2">PCR-Refundable Amount</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <p className="text-3xl font-black text-emerald-600">$0</p>
                <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mt-2">Your Net Cost (via MN PCR)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 mb-10">
            <iframe
              src="https://secure.anedot.com/campaign-fund-of-kris-babler/donate?embed=true"
              width="100%"
              height="800px"
              frameBorder="0"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              title="Kris Babler Campaign Donation"
            ></iframe>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-[12px] font-black text-blue-900 uppercase tracking-wide mb-2">🔒 Secure Payment</p>
              <p className="text-sm text-blue-800 leading-relaxed">
                Payments are processed securely via Anedot. Donations opened on April 2 and are processed through our secure payment partner.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-[12px] font-black text-slate-900 uppercase tracking-wide mb-3">Eligibility & How It Works</p>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                <li className="flex gap-3">
                  <span className="font-black">•</span>
                  <span>You must be a Minnesota resident to participate in the Political Contribution Refund program.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black">•</span>
                  <span>After your contribution, our campaign submits the required refund paperwork on your behalf.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black">•</span>
                  <span>Your donation today helps build an Independent voice for SD49 in St. Paul.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const VolunteerPortal = () => (
    <div className="pt-20 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Context */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-brand-navy mb-6 leading-tight">
            Donate to Fuel the Campaign
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
            Donations are now live. Make your secure contribution below to support Kris Babler for State Senate.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-3xl font-black" style={{ color: BRAND_COLOR }}>$75</p>
              <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mt-2">PCR-Refundable Amount</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-3xl font-black text-emerald-600">$0</p>
              <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mt-2">Your Net Cost (via MN PCR)</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 mb-12">
          <iframe 
            src="https://secure.anedot.com/campaign-fund-of-kris-babler/donate?embed=true" 
            width="100%" 
            height="800px" 
            frameBorder="0"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            title="Kris Babler Campaign Donation"
          ></iframe>
        </div>

        {/* Trust Signals */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-[12px] font-black text-blue-900 uppercase tracking-wide mb-2">🔒 Secure Payment</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              Payments are processed securely via Anedot. Donations opened on April 2 and are processed through our secure payment partner.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <p className="text-[12px] font-black text-slate-900 uppercase tracking-wide mb-3">Eligibility & How It Works</p>
            <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <li className="flex gap-3">
                <span className="font-black">•</span>
                <span>You must be a Minnesota resident to participate in the Political Contribution Refund program.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black">•</span>
                <span>After your contribution, our campaign submits the required refund paperwork on your behalf.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black">•</span>
                <span>Your donation today helps build an Independent voice for SD49 in St. Paul.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const DonationPortal = () => (
    <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
      <div className="bg-brand-navy rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">Support SD49 Independence</h2>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-black uppercase tracking-[0.2em] text-slate-100">
            <CheckCircle2 size={16} /> 100% Refundable via MN PCR
          </div>
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
      <Navigation />
      
      <main className="animate-fade-in">
        {activeTab === 'home' && (
          <>
            <Hero />
            <InvestmentBar />
            <AboutSection />
            <IssuesSection />
            <BuildTogetherSection />
            <ServiceSection />
            <NewsSection />
            <DonateSection />
          </>
        )}
        
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'issues' && (
          <>
            <IssuesSection />
            <NewsSection />
          </>
        )}
        {activeTab === 'volunteer' && <VolunteerPortal />}
        {activeTab === 'pcr' && <DonationPortal />}
      </main>

      <footer className="bg-brand-navy text-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider mb-4 text-slate-400">Contact</p>
              <div className="space-y-3 text-sm">
                <a href="tel:218-206-2664" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                  <Phone size={16} /> Call Kris
                </a>
                <a href="mailto:KB@krisbabler.com" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                  <Mail size={16} /> Email Kris
                </a>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider mb-4 text-slate-400">Follow</p>
              <a href="https://www.facebook.com/profile.php?id=61572137380455" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-slate-300 transition-colors text-sm">
                <Facebook size={16} /> Facebook
              </a>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider mb-4 text-slate-400">About</p>
              <p className="text-sm text-slate-300 leading-relaxed">Kris Babler is a candidate for the Minnesota State Senate in District 49. Our work is focused on providing the residents of Eden Prairie and Minnetonka with a professional, results-oriented choice that prioritizes local impact over partisan interests.</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.4em] mb-4">
              Prepared and paid for by Babler for Senate (SD49)
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2025 Kris Babler for State Senate</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
