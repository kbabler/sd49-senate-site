import React, { useState, useEffect } from 'react';
import { LISTENING_POST_URL } from './main';
import { 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  GraduationCap,
  Home,
  CheckCircle2,
  Heart,
  Menu,
  X,
  Camera,
  Facebook,
  Mail,
  Phone
} from 'lucide-react';

/** * CAMPAIGN CONTENT DASHBOARD (CONFIG)
 * ---------------------------------------------------------
 * Update these values to change the site content and images.
 */
const CONFIG = {
  branding: {
    name: "KRIS BABLER",
    title: "Babler for State Senate",
    district: "SD49 (Eden Prairie & Minnetonka)",
    color: "#4B384C", // Dark purple (primary)
    accent: "#00c2cc", // Poll-tested teal (accent)
  },
  
  links: {
    substack: "https://krisbabler.substack.com/",
    facebook: "https://www.facebook.com/profile.php?id=61572137380455"
  },

  substackArticles: [
    {
      title: "Minnesota, Is This the Best We Can Do?",
      href: "https://krisbabler.substack.com/p/minnesota-is-this-the-best-we-can?r=1i94n6"
    },
    {
      title: "You Are Not Alone",
      href: "https://krisbabler.substack.com/p/you-are-not-alone?r=1i94n6"
    },
    {
      title: "Why I'm Stepping Into the Arena",
      href: "https://krisbabler.substack.com/p/why-im-stepping-into-the-arena"
    }
  ],
  
  images: {
    hero: "babler-headshot.png",
    bio: "kris-lakes.jpg",
    action: "kris-coaching-basketball.jpg",
    family: "kris-family.jpg",
    service1: "promotion-cpt.jpg",
    service2: "st-paul-state-capital.jpg",
    service3: "family-service.jpg"
  },

  copy: {
    heroLead: "MISSION FIRST. NEIGHBORS ALWAYS.",
    heroSub: "It's time for professional accountability in SD49. Join the independent movement to fix the 'math of failure' in St. Paul.",
    bioTitle: "A Neighbor Running To Make A Difference",
    bioShort: "I'm a dad, a local business owner, and a neighbor who believes that if you see a problem, you step up. My path to this campaign wasn't through politics; it was through service.",
    bioLong: "Leadership Under Pressure As a U.S. Army Captain, I learned that leadership isn't about rank—it's about the mission and the people. When a plan fails in the field, you don't point fingers; you adapt and get the job done. I'm bringing that same \"mission-first\" accountability to St. Paul.\nCutting the Red Tape Working in School Administration, I saw how top-down mandates from the state get in the way of actual learning. We need to stop the experiments and start supporting our teachers and parents so our kids can thrive.\nBuilding the Team Coaching basketball is where I've seen the real Minnesota. It's about discipline and showing up for each other. I'm not a career politician—I'm running to be a teammate for Eden Prairie and Minnetonka.\nProtecting the Bottom Line As a Business Owner, I know the weight of a budget. Every dollar St. Paul spends comes out of your pocket. I will treat your tax dollars with the same respect I treat my own bottom line—because you've earned it.",
    substackTitle: "Step out of the partisan echo chamber.",
    substackText: "I'm breaking down the truth about Minnesota governance and the path to fixing our state. Join for a neighbor's take on the issues at my Substack.",
    pcrText: "The Political Contribution Refund allows you to donate $75 and get a full refund from the State of Minnesota. It's a zero-cost way to fuel our campaign."
  },

  issues: [
    {
      title: "Fiscal Watchdog",
      icon: <Calculator className="w-6 h-6" />,
      points: [
        "Balance the budget. I'll demand professional audits to ensure your taxes fund results, not St. Paul's systemic waste."
      ]
    },
    {
      title: "Educational Excellence",
      icon: <GraduationCap className="w-6 h-6" />,
      points: [
        "Classrooms over bureaucracy. Let local parents and teachers decide our priorities, not top-down mandates from St. Paul."
      ]
    },
    {
      title: "Minnesota Advantage",
      icon: <Home className="w-6 h-6" />,
      points: [
        "Restore the Minnesota Advantage. I'll fight to restore our state's competitive edge and economic growth."
      ]
    },
    {
      title: "Settled Law",
      icon: <ShieldCheck className="w-6 h-6" />,
      points: [
        "I view reproductive freedom and marriage equality as settled. I'm here to block distractions, not relitigate the past."
      ]
    }
  ]
};

const SplashOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <div className="text-center px-6 max-w-2xl">
        <div className="w-32 h-32 mx-auto mb-8 rounded-2xl shadow-2xl overflow-hidden">
          <img src="/images/KB_Logo_Plum_512px.png" alt="Kris Babler Logo" className="w-full h-full object-cover logo-teal" />
        </div>
        <p className="text-2xl text-slate-600 font-bold mb-8">
          Our District. Their Deficit. Your Choice.
        </p>
      </div>
    </div>
  );
};

const PledgeForm = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-brand-navy mb-6 leading-tight">
          Donate to Fuel the Campaign
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
          Donations are now live. Make your secure contribution below to support Kris Babler for State Senate.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <p className="text-3xl font-black" style={{ color: CONFIG.branding.color }}>$75</p>
            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mt-2">PCR-Refundable Amount</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <p className="text-3xl font-black" style={{ color: CONFIG.branding.accent }}>$0</p>
            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide mt-2">Your Net Cost (via MN PCR)</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8 mb-10">
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
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    smsConsent: false
  });
  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerOptions, setVolunteerOptions] = useState({
    knockDoors: false,
    hostListening: false,
    yardSign: false
  });

  const submitToSheet = async (payload) => {
    try {
      await fetch(LISTENING_POST_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(payload)
      });
    } catch (error) {
      console.error('Error submitting to Google Sheet:', error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await submitToSheet({
      formType: 'Join the Mission',
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      zipCode: formData.get('zipCode') || '',
      smsConsent: formData.get('smsConsent') ? 'Yes' : 'No',
      timestamp: new Date().toISOString()
    });

    setSignupSubmitted(true);
    e.target.reset();
    setTimeout(() => setSignupSubmitted(false), 3000);
  };

  const handleVolunteerChange = (e) => {
    const { name, checked } = e.target;
    setVolunteerOptions(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    console.log('Volunteer options:', volunteerOptions);

    const involvement = [
      volunteerOptions.knockDoors && 'Knocking on Doors',
      volunteerOptions.yardSign && 'Yard Sign Request',
      volunteerOptions.hostListening && 'Hosting a Listening Post'
    ]
      .filter(Boolean)
      .join('; ');

    await submitToSheet({
      formType: 'Build Together',
      firstName: e.target.firstName?.value || '',
      lastName: e.target.lastName?.value || '',
      email: e.target.email?.value || '',
      phone: e.target.phone?.value || '',
      zipCode: e.target.zipCode?.value || '',
      involvement,
      knockDoors: volunteerOptions.knockDoors ? 'Yes' : 'No',
      yardSign: volunteerOptions.yardSign ? 'Yes' : 'No',
      hostListening: volunteerOptions.hostListening ? 'Yes' : 'No',
      smsConsent: e.target.smsConsent?.checked ? 'Yes' : 'No',
      timestamp: new Date().toISOString()
    });

    setVolunteerSubmitted(true);
    setVolunteerOptions({
      knockDoors: false,
      hostListening: false,
      yardSign: false
    });
    e.target.reset();
    setTimeout(() => setVolunteerSubmitted(false), 3000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const SmartImage = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    // Normalize src: if not an absolute path, assume /images/
    let srcPath = src && !src.startsWith('/') && !src.startsWith('http') ? `/images/${src}` : src;
    // Encode URI to handle spaces and unsafe characters
    if (srcPath) srcPath = encodeURI(srcPath);
    if (error || !srcPath || srcPath.includes('placeholder')) {
      return (
        <div className={`${className} bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-400 p-4 text-center`}>
          <div className="flex flex-col items-center gap-2">
            <Camera size={20} className="opacity-20" />
            <div className="text-[10px] font-bold uppercase tracking-tighter">Placeholder:<br/>{alt}</div>
          </div>
        </div>
      );
    }
    return <img src={srcPath} alt={alt} className={className} onError={() => setError(true)} />;
  };

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 rounded-lg shadow-lg overflow-hidden">
            <img src="/images/KB_Logo_Plum_512px.png" alt="KB Logo" className="w-full h-full object-cover logo-teal" />
          </div>
          <div className="hidden sm:block text-left">
            <h1 className="font-black text-brand-navy leading-none tracking-tighter uppercase text-lg">{CONFIG.branding.name}</h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">{CONFIG.branding.district}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-black">
          <button onClick={() => scrollToSection('issues')} className="transition-colors hover:text-brand-navy">Playbook</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-brand-navy transition-colors">The Man</button>
          <button onClick={() => scrollToSection('service')} className="hover:text-brand-navy transition-colors">Service in Action</button>
          <button 
            onClick={() => scrollToSection('volunteer')}
            className="normal-case text-black px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: CONFIG.branding.accent }}
          >
            Get Involved
          </button>
          <button 
            onClick={() => scrollToSection('pcr')}
            className="text-black px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: CONFIG.branding.accent }}
          >
            Donate
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-8 space-y-6 flex flex-col items-center text-[12px] font-black uppercase tracking-widest text-black">
          <button onClick={() => scrollToSection('issues')} className="hover:text-brand-navy transition-colors">Playbook</button>
          <button onClick={() => scrollToSection('about')}>The Man</button>
          <button onClick={() => scrollToSection('service')}>Service in Action</button>
          <button 
            onClick={() => scrollToSection('volunteer')}
            className="w-full py-4 rounded-xl text-white text-center shadow-lg"
            style={{ backgroundColor: CONFIG.branding.color }}
          >
            Get Involved
          </button>
          <button 
            onClick={() => scrollToSection('pcr')}
            className="w-full py-4 rounded-xl text-white text-center shadow-lg"
            style={{ backgroundColor: CONFIG.branding.color }}
          >
            Donate
          </button>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy overflow-x-hidden selection:bg-indigo-100">
      <Navigation />
      
      {/* HERO */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:items-start">
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-black text-brand-navy leading-[0.85] mb-8 tracking-tighter">
                Our District.<br/>
                <span style={{ color: '#00c2cc' }}>Their Mess.</span><br/>
                Your Choice.
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">I'm Kris Babler—a neighbor, coach, and former Army Captain on a mission to make the math work for SD49.</p>
              
              {/* Signup Form */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-xl font-black text-brand-navy mb-6 uppercase tracking-wide">Join the Mission</h3>
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      required
                      className="px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-400 focus:outline-none font-medium"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      required
                      className="px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-400 focus:outline-none font-medium"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-400 focus:outline-none font-medium"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code*"
                    pattern="[0-9]{5}"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-400 focus:outline-none font-medium"
                  />
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      required
                      className="mt-1"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      I consent to receive mission updates and text alerts. Msg/data rates apply. Reply STOP to opt-out.
                    </span>
                  </label>
                  
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-black text-white text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-lg"
                    style={{ backgroundColor: '#4B384C' }}
                  >
                    {signupSubmitted ? 'MISSION JOINED!' : 'JOIN THE MISSION'}
                  </button>
                </form>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 relative z-10 border-4 border-white transform lg:rotate-2">
                <SmartImage src={CONFIG.images.hero} alt="Kris Babler Portrait" className="w-full h-full object-cover object-left" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-slate-50 rounded-[3rem] -z-0 transform -rotate-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT BAR */}
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
                style={{ backgroundColor: CONFIG.branding.color }}
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

      {/* ISSUES */}
      <section id="issues" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-4 tracking-tighter uppercase italic">The SD49 Playbook: Leadership for Eden Prairie & Minnetonka</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CONFIG.issues.map((issue, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: '#4B384C' }}>
                  {issue.icon}
                </div>
                <h3 className="text-2xl font-black mb-6 text-brand-navy">{issue.title}</h3>
                <ul className="space-y-4">
                  {issue.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-600 font-medium leading-relaxed">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: CONFIG.branding.accent }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD TOGETHER */}
      <section id="volunteer" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-4 tracking-tighter uppercase italic">Build Together</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">Tell us how you want to help protect our district.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-lg">
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  required
                  className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:border-slate-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  required
                  className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:border-slate-400 focus:outline-none"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                required
                className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:border-slate-400 focus:outline-none"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (Optional)"
                  className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:border-slate-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code*"
                  required
                  className="w-full px-4 py-4 rounded-2xl border border-slate-300 focus:border-slate-400 focus:outline-none"
                />
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">I want to help with:</p>
                <div className="grid gap-3">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="knockDoors"
                      checked={volunteerOptions.knockDoors}
                      onChange={handleVolunteerChange}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Knocking on Doors
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="yardSign"
                      checked={volunteerOptions.yardSign}
                      onChange={handleVolunteerChange}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Yard Sign Request
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="hostListening"
                      checked={volunteerOptions.hostListening}
                      onChange={handleVolunteerChange}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Hosting a Listening Post
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-600 leading-relaxed">
                  <input
                    type="checkbox"
                    name="smsConsent"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <span>
                    By providing my number, I consent to receive updates via text. Msg/data rates apply. Reply STOP to opt-out. <a className="underline text-slate-700" href="/privacy">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-navy text-white font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] shadow-lg"
              >
                SIGN ME UP
              </button>

              {volunteerSubmitted && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-emerald-800 font-semibold">
                  Thanks! Your volunteer request was received.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              <div className="space-y-4 pt-16">
                <div className="h-3/5 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                  <SmartImage src={CONFIG.images.family} alt="Family Portrait" className="w-full h-full object-cover" />
                </div>
                <div className="h-2/5 bg-brand-navy rounded-3xl p-8 text-white flex flex-col justify-center shadow-lg">
                  <Heart className="mb-4 text-rose-500" />
                  <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Dedicated to the future of Minnesota.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-1/2 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                  <SmartImage src={CONFIG.images.action} alt="Kris in Action" className="w-full h-full object-cover" />
                </div>
                <div className="h-1/2 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                  <SmartImage src={CONFIG.images.bio} alt="Kris Community" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black tracking-tighter text-brand-navy leading-[0.9]">
                {CONFIG.copy.bioTitle.split(' ').slice(0, 3).join(' ')} <br/>
                <span style={{ color: CONFIG.branding.color }}>{CONFIG.copy.bioTitle.split(' ').slice(3).join(' ')}.</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>{CONFIG.copy.bioShort}</p>
                <ul className="space-y-4">
                  {CONFIG.copy.bioLong.split('\n').map((item, i) => (
                    <li key={i} className="flex gap-3">
                      {!item.startsWith("I'm not interested") && (
                        <CheckCircle2 size={20} className="text-brand-teal shrink-0 mt-1" />
                      )}
                      <span className={item.startsWith("I'm not interested") ? "mt-4" : ""}>
                        {(() => {
                          if (item.startsWith('Leadership Under Pressure')) {
                            return <><strong className="text-brand-navy">Leadership Under Pressure</strong>{item.substring('Leadership Under Pressure'.length)}</>;
                          } else if (item.startsWith('Cutting the Red Tape')) {
                            return <><strong className="text-brand-navy">Cutting the Red Tape</strong>{item.substring('Cutting the Red Tape'.length)}</>;
                          } else if (item.startsWith('Building the Team')) {
                            return <><strong className="text-brand-navy">Building the Team</strong>{item.substring('Building the Team'.length)}</>;
                          } else if (item.startsWith('Protecting the Bottom Line')) {
                            return <><strong className="text-brand-navy">Protecting the Bottom Line</strong>{item.substring('Protecting the Bottom Line'.length)}</>;
                          }
                          return item;
                        })()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE GALLERY */}
      <section id="service" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-brand-navy mb-4 tracking-tighter uppercase italic">Service in Action</h2>
            <p className="text-slate-500 font-medium"><strong className="text-brand-navy">85 years of combined military service.</strong> Between my grandfathers, my father, and my own time as a Captain, service is more than a slogan for me—it's a family tradition.</p>
            <p className="text-slate-500 font-medium mt-4">Whether it's on a mission abroad or a basketball court here in Eden Prairie, I believe in showing up for the team and protecting the values that make our community home.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-md">
              <SmartImage src={CONFIG.images.service1} alt="Community Service Event 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-md">
              <SmartImage src={CONFIG.images.service2} alt="Local Volunteering" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-md">
              <SmartImage src={CONFIG.images.service3} alt="Neighborhood Meeting" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-8 text-center max-w-3xl mx-auto">
            Kris Babler is a former member of the U.S. Army. Use of his military rank, job titles, and photographs in uniform does not imply endorsement by the Department of the Army or the Department of Defense.
          </p>
        </div>
      </section>

      {/* SUBSTACK */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6 tracking-tighter leading-tight">{CONFIG.copy.substackTitle}</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">{CONFIG.copy.substackText}</p>
          <a 
            href={CONFIG.links.substack} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-black uppercase tracking-widest text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: CONFIG.branding.color }}
          >
            Follow Me <ArrowRight size={18} />
          </a>

          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            {CONFIG.substackArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Substack Article</p>
                <h3 className="text-xl font-black text-brand-navy leading-snug mb-4">{article.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide" style={{ color: CONFIG.branding.color }}>
                  Read article <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="pcr" className="py-24 px-4 max-w-7xl mx-auto">
        <PledgeForm />
      </section>

      <footer className="bg-slate-50 py-20 border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[10px] text-slate-400 border border-slate-200 px-6 py-3 rounded-full uppercase font-black tracking-[0.4em] inline-block mb-8">Prepared and paid for by Babler for State Senate (SD49)</p>
          <p className="text-xs text-slate-500 max-w-3xl mx-auto mb-8 leading-relaxed">Kris Babler is a candidate for the Minnesota State Senate in District 49. Our work is focused on providing the residents of Eden Prairie and Minnetonka with a professional, results-oriented choice that prioritizes local impact over partisan interests.</p>
          <div className="max-w-3xl mx-auto mb-8 grid gap-3 text-sm text-slate-500 sm:grid-cols-3 sm:text-left">
            <a href="tel:218-206-2664" className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 text-slate-700 hover:border-brand-navy hover:text-brand-navy transition-all">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-navy text-white">
                <Phone size={20} className="text-white" />
              </span>
              <span className="font-semibold">Call Kris</span>
            </a>
            <a href="mailto:KB@krisbabler.com" className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 text-slate-700 hover:border-brand-navy hover:text-brand-navy transition-all">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-navy text-white">
                <Mail size={20} className="text-white" />
              </span>
              <span className="font-semibold">Email Kris</span>
            </a>
            <a href={CONFIG.links.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 text-slate-700 hover:border-brand-navy hover:text-brand-navy transition-all">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-navy text-white">
                <Facebook size={20} className="text-white" />
              </span>
              <span className="font-semibold">Facebook</span>
            </a>
          </div>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            <span>Eden Prairie, MN</span>
            <span>Minnetonka, MN</span>
            <span>SD49</span>
          </div>
          <p className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2025 {CONFIG.branding.name}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;