import React, { useState, useEffect } from 'react';
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
  Phone,
  Mail,
  Facebook
} from 'lucide-react';
import AlertBanner from './components/AlertBanner';
import SubstackFeed from './components/SubstackFeed';

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
  heroImage: "headshot (2).jpg",
  family: "kris-family.jpg",
  community: "krisheadshot.png",
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
  issues: [
    {
      title: "Fiscal Watchdog",
      tagline: "Accountability for every tax dollar.",
      description: "Demand independent audits and measurable outcomes to ensure your tax dollars fund clear results, not St. Paul's systemic waste.",
      icon: <Calculator size={24} />
    },
    {
      title: "Educational Excellence",
      tagline: "Classrooms over bureaucracy.",
      description: "Empower local parents and teachers to direct our schools, keeping the focus on student achievement rather than top-down state mandates.",
      icon: <GraduationCap size={24} />
    },
    {
      title: "Economic Opportunity & Housing",
      tagline: "Lowering costs, building prosperity.",
      description: "Cut red tape, spur job creation, and address housing affordability so West Metro families and small businesses can thrive.",
      icon: <Home size={24} />
    },
    {
      title: "Medical Freedom & Privacy",
      tagline: "Protecting personal medical decisions.",
      description: "Keep healthcare decisions—including reproductive care, IVF, and contraception—between women and their doctors. I'll block partisan overreach and defend constitutional rights.",
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

  const Navigation = () => (
    <nav className="main-header sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-100 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        
        {/* LOGO BLOCK */}
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/images/logo.png" alt="Kris Babler campaign logo" />
        </a>
        
        {/* NAVIGATION LINKS & SOCIALS */}
        <div className="nav-links hidden lg:flex gap-8 items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
          <button onClick={() => scrollToSection('about')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>The Man</button>
          <button onClick={() => scrollToSection('newsletter')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>Newsletter</button>
          <button onClick={() => scrollToSection('service')} className={activeTab === 'home' ? 'text-brand-navy' : 'hover:text-slate-600'}>Service in Action</button>
          
          {/* SOCIAL MEDIA ICONS (With vertical divider line) */}
          <div className="social-icons flex items-center gap-4 border-l border-slate-300 pl-6 ml-2">
            
            {/* Facebook */}
            <a 
              href="https://facebook.com/profile.php?id=61572137380455" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-[#1877F2] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/coachbabler/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-[#E4405F] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@krisbabler" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.589 6.686a4.793 4.793 0 01-3.77-3.77A4.793 4.793 0 0115.684 2h-3.292v13.333a2.916 2.916 0 11-2.917-2.916c.245 0 .484.03.711.087v-3.36a6.294 6.294 0 00-.711-.04A6.23 6.23 0 1015.704 15V8.236a8.057 8.057 0 004.71 1.517V6.46a4.8 4.8 0 01-.825.226z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-y-0 right-[4%] w-full lg:right-[12%] lg:w-[42%]">
        <img
          src={`/images/${ASSETS.heroImage}`}
          alt=""
          aria-hidden="true"
          className="absolute inset-y-[4%] right-0 h-[92%] w-[88%] object-cover object-[center_35%]"
        />
        <div className="absolute inset-y-[4%] left-[12%] w-[22.4%] bg-gradient-to-r from-brand-navy via-brand-navy/70 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[600px] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl lg:w-[60%]">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-white/80">
            Eden Prairie &amp; Minnetonka <span className="px-2 text-brand-teal" aria-hidden="true">·</span> Independent Civic Voice
          </p>
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span style={{ color: BRAND_COLOR, fontFamily: '"Poller One", cursive' }}>MOVING FORWARD</span>
          </h1>
          <div className="space-y-5 text-lg font-medium leading-relaxed text-white sm:text-xl">
            <p className="max-w-2xl">
              The 2026 election is in the books. Over 2,000 neighbors across Eden Prairie and Minnetonka cast their votes for a pragmatic, independent alternative. The campaign has concluded, but the work of tracking state spending, standing up for local classrooms, and demanding common sense at the Capitol continues.
            </p>
            <ul className="space-y-3 text-base font-semibold sm:text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                <span>Independent oversight of state budgets and tax dollars</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                <span>Education funding focused directly inside the classroom</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                <span>Practical, non-partisan solutions for suburban families</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center rounded-xl px-7 py-4 text-sm font-black uppercase tracking-widest text-brand-navy shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Meet Kris
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
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
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-square bg-white p-2">
                 <CampaignImage src="speaking.png" alt="Kris speaking with community" className="w-full h-full object-cover rounded-2xl" />
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
              Service in the Field. <br/>
              <span style={{ color: BRAND_COLOR }}>Accountability at Home.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                Dad, business founder, and Army veteran. If there’s a problem, you roll up your sleeves and fix it.
              </p>
              <div className="space-y-6">
                <p>
                  <span className="font-black">Leadership Under Pressure</span> As an Army Reserve Captain deployed during Operation Inherent Resolve, I learned that real leadership is about the mission and the people. When systems fail under pressure, you don’t point fingers; you adapt, enforce accountability, and get the job done.
                </p>
                <p>
                  <span className="font-black">Cutting Red Tape</span> Directing school athletic programs showed me firsthand how bureaucracies get in the way of actual results. Good governance isn't about passing more rules; it's about clearing obstacles so teachers, coaches, and local administrators can succeed.
                </p>
                <p>
                  <span className="font-black">Building the Team</span> Whether building athletic ventures from scratch or coaching college athletes, real progress comes from accountability and showing up for each other. I build alliances to win in mission-first environments. Different people have different strengths.
                </p>
                <p>
                  <span className="font-black">Protecting the Bottom Line</span> As a business owner, I know the weight of a balance sheet. Every single dollar the state or school district spends comes out of a taxpayer’s pocket. I evaluate public spending with the exact same fiscal discipline I bring to my own operations.
                </p>
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
        
        <div className="grid md:grid-cols-2 gap-8">
          {SITE_CONTENT.issues.map((issue, idx) => (
            <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-slate-300 transition-all group">
              <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: BRAND_COLOR }}>
                {issue.icon}
              </div>
              <h3 className="text-2xl font-black mb-6 text-brand-navy">{issue.title}</h3>
              <p className="text-sm font-bold italic text-brand-navy mb-3">{issue.tagline}</p>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">{issue.description}</p>
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
                  By checking this box and providing my number, I consent to receive recurring automated and peer-to-peer campaign text messages from Kris Babler for State Senate (SD49). Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. See our{' '}
                  <a
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('privacy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="underline text-slate-300 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                  .
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

  const PrivacyPolicySection = () => (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-xl p-8 md:p-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 mb-3">Privacy Policy</p>
              <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">Kris Babler for State Senate (SD49)</h1>
              <p className="text-sm text-slate-500 mt-2">Effective Date: August 6, 2026</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:border-slate-300 hover:text-slate-800"
            >
              Back to Home
            </button>
          </div>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <p>We value your privacy and are committed to maintaining the trust of our supporters.</p>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">1. Mobile & Text Messaging (SMS/MMS) Privacy (10DLC Compliance)</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-800">A. Mobile Information Non-Sharing Disclosure</h3>
                <p>Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
                <h3 className="text-lg font-black text-slate-800">B. SMS Consent & Opt-In</h3>
                <p>We collect mobile phone numbers only when you explicitly provide them to us through our web forms, volunteer sign-ups, event registrations, paper petitions, door-to-door canvassing, or when you initiate an inbound text message (for example, texting a keyword such as START to our campaign number).</p>
                <p>By providing your mobile phone number and submitting a form with text consent, you agree to receive recurring automated and peer-to-peer text messages from Kris Babler for State Senate (SD49) regarding campaign updates, event reminders, voting information, and volunteer opportunities.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Message Frequency:</span> Message frequency varies.</li>
                  <li><span className="font-semibold">Cost:</span> Message and data rates may apply.</li>
                  <li><span className="font-semibold">Opt-Out Instructions:</span> You may unsubscribe from mobile text messages at any time by replying STOP to any text message you receive from us. You will receive a single confirmation message verifying that you have been unsubscribed.</li>
                  <li><span className="font-semibold">Support Instructions:</span> For support or help regarding our text messaging program, reply HELP to any message, or contact us directly at KB@krisbabler.com or 218-206-2664.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">2. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-800">A. Information You Provide Voluntarily</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Contact Information:</span> Name, email address, physical address, ZIP code, and phone number when you sign up for updates, fill out a contact form, or register for an event.</li>
                  <li><span className="font-semibold">Field & Survey Data:</span> Voting preferences, key policy issues, and survey responses provided during door-to-door canvassing, phone banks, or online forms.</li>
                  <li><span className="font-semibold">Donor Information:</span> Name, billing address, occupation, employer, and contribution amount when you make a campaign donation.</li>
                </ul>
                <h3 className="text-lg font-black text-slate-800">B. Automated Information & Web Telemetry</h3>
                <p>When you browse our website or click links inside campaign emails or text messages, our servers automatically record telemetry data, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Device & Usage Data:</span> IP address, browser type, operating system, referring URL, pages viewed, and timestamps.</li>
                  <li><span className="font-semibold">Tracking Technologies & Cookies:</span> We use first-party cookies and tokenized link parameters to measure engagement, understand which policy pages resonate with voters, and streamline user experience.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to advance our political campaign and engage with voters, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send campaign news, policy updates, election reminders, and event invitations.</li>
                <li>Organize grassroots field activities, volunteer opportunities, and door-to-door canvassing.</li>
                <li>Process campaign donations and fulfill legal reporting requirements under federal and state campaign finance laws.</li>
                <li>Analyze web traffic and communication effectiveness to optimize our outreach strategy.</li>
                <li>Respond to inquiries, support requests, and user feedback.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">4. Information Sharing & Disclosures</h2>
              <p>We respect your personal data and do not sell, rent, or trade voter lists or personal information to commercial marketers. We share personal information only under the following strictly defined circumstances:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><span className="font-semibold">Campaign Partners & Affiliates:</span> We may share non-SMS voter data with affiliated political committees, state party organizations, or allied caucus committees solely for election efforts, voter mobilization, and political coordination. Mobile opt-in data and SMS consent are strictly excluded from sharing.</li>
                <li><span className="font-semibold">Campaign Vendors & Service Providers:</span> We may share necessary information with trusted third-party service providers who assist in running our campaign. These providers are bound by strict confidentiality obligations and are prohibited from using your data for any independent purpose.</li>
                <li><span className="font-semibold">Public Campaign Finance Reporting:</span> Under state and federal election laws, campaign contributions over regulatory thresholds require us to collect and report the donor’s full name, mailing address, occupation, and employer to the relevant Election Board or Campaign Finance Board. These reports are a matter of public record.</li>
                <li><span className="font-semibold">Legal Compliance & Safety:</span> We may disclose information if required to do so by law, court order, or governmental regulation, or if we believe disclosure is necessary to protect the safety, rights, or property of our campaign, voters, or the public.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">5. Third-Party Websites & Payment Processors</h2>
              <p>Our website may contain links to external websites, social media platforms, or third-party donation processors. We are not responsible for the privacy practices or content of these third-party platforms. Financial transactions conducted through third-party payment processors are governed directly by their respective privacy policies and security standards.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">6. Children’s Privacy (COPPA)</h2>
              <p>Our website and political outreach programs are intended for registered voters, adults, and young adults eligible to participate in civic activities. We do not knowingly collect personal information from children under the age of 13. If we become aware that we have collected personal data from a child under 13 without verified parental consent, we will take immediate steps to delete that information from our database.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">7. Data Security & Retention</h2>
              <p>We implement industry-standard physical, technical, and administrative security measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction. We retain your personal information for as long as necessary to fulfill campaign objectives, maintain legal records, and comply with state and federal campaign finance regulations.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">8. Your Choices & Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-semibold">Email Opt-Out:</span> You may unsubscribe from marketing or campaign email updates at any time by clicking the “Unsubscribe” link located at the bottom of any email we send.</li>
                <li><span className="font-semibold">SMS Opt-Out:</span> You may stop receiving text messages by replying STOP to any text message sent by our campaign.</li>
                <li><span className="font-semibold">Cookie Controls:</span> You can adjust your web browser settings to reject cookies or alert you when cookies are being set. Note that disabling cookies may affect the functionality of certain website features.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-brand-navy mb-3">9. Changes to This Privacy Policy</h2>
              <p>We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our campaign operations, legal requirements, or mobile carrier regulations. Any updates will be posted on this page with a revised Effective Date at the top. We encourage you to review this policy periodically.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy tracking-tight">
      <AlertBanner />
      <Navigation />
      
      <main className="animate-fade-in">
        {activeTab === 'home' && (
          <>
            <Hero />
            <SubstackFeed />
            <AboutSection />
            <ServiceSection />
          </>
        )}
        
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'privacy' && <PrivacyPolicySection />}
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
              <p className="text-sm text-slate-300 leading-relaxed">Kris Babler is an independent civic analyst, business founder, and former legislative candidate based in Eden Prairie, Minnesota. BablerParty provides non-partisan oversight, budget scrutiny, and public policy commentary.</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setActiveTab('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-[0.22em] mt-4">
              Disclaimer: Some campaign B-roll footage was produced with AI tools for storytelling.
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">© 2026 Kris Babler · BablerParty. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
