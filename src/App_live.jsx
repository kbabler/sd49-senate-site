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
  Star,
  Menu,
  X,
  Send,
  Camera,
  MessageSquare,
  Award
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
    color: "#755FBE", // Signature Purple
    accent: "#10b981", // Emerald Green
  },
  
  links: {
    substack: "https://krisbabler.substack.com/"
  },
  
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
    heroLead: "Our District. Their Mess. Your Choice.",
    heroSub: "We've had enough of the drama. I'm Kris Babler, a former Army Captain and a neighbor running for State Senate to restore Professional Stewardship to our community. I'm driven by the 45% Independent voters who are ready to look beyond the old party machines and build something new together. I'm not going to St. Paul to join a team; I'm going to be a teammate for Eden Prairie and Minnetonka. I will protect our settled liberties and focus on the basic job of making things work again.",
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
          <img src="/images/KB_Logo_Plum_512px.png" alt="Kris Babler Logo" className="w-full h-full object-cover" />
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
    <div className="max-w-2xl mx-auto">
      {/* Header Context */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm">
          <CheckCircle2 size={14} /> 100% Refundable via MN PCR
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-brand-navy mb-6 leading-tight">
          Donate to Fuel the Campaign
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
          Donations are now live. Make your secure contribution below to support Kris Babler for State Senate.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <p className="text-3xl font-black" style={{ color: CONFIG.branding.color }}>$75</p>
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
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(LISTENING_POST_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous',
          message: formData.message,
          timestamp: new Date().toISOString()
        })
      });
      
      setFormSubmitted(true);
      setFormData({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success message since no-cors doesn't allow reading response
      setFormSubmitted(true);
      setFormData({ name: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
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
            <img src="/images/KB_Logo_Plum_512px.png" alt="KB Logo" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block text-left">
            <h1 className="font-black text-brand-navy leading-none tracking-tighter uppercase text-lg">{CONFIG.branding.name}</h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">{CONFIG.branding.district}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
          <button onClick={() => scrollToSection('issues')} className="hover:text-brand-navy transition-colors">Playbook</button>
          <button onClick={() => scrollToSection('listening-post')} className="hover:text-brand-navy transition-colors">Listening Post</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-brand-navy transition-colors">The Man</button>
          <button onClick={() => scrollToSection('service')} className="hover:text-brand-navy transition-colors">Service in Action</button>
          <button 
            onClick={() => scrollToSection('pcr')}
            className="text-white px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: CONFIG.branding.color }}
          >
            $75 Refund
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-8 space-y-6 flex flex-col items-center text-[12px] font-black uppercase tracking-widest">
          <button onClick={() => scrollToSection('issues')}>Playbook</button>
          <button onClick={() => scrollToSection('listening-post')}>Listening Post</button>
          <button onClick={() => scrollToSection('about')}>The Man</button>
          <button onClick={() => scrollToSection('service')}>Service in Action</button>
          <button 
            onClick={() => scrollToSection('pcr')}
            className="w-full py-4 rounded-xl text-white text-center shadow-lg"
            style={{ backgroundColor: CONFIG.branding.color }}
          >
            $75 Refund / Donate
          </button>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy overflow-x-hidden selection:bg-indigo-100">
      <Navigation />
      
      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 bg-slate-50 border border-slate-200 text-slate-500">
                <Star size={14} style={{ color: CONFIG.branding.color }} /> Independent Voice for SD49
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-brand-navy leading-[0.85] mb-8 tracking-tighter">
                {CONFIG.copy.heroLead.split('.').map((part, i) => (
                  <span key={i} className={i === 1 ? 'block' : ''} style={i === 1 ? { color: CONFIG.branding.color } : {}}>
                    {part}{i < 3 && part ? '.' : ''}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">{CONFIG.copy.heroSub}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection('about')} className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl shadow-slate-200">Meet Kris <ArrowRight size={18} /></button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 relative z-10 border-4 border-white transform lg:rotate-2">
                <SmartImage src={CONFIG.images.hero} alt="Kris Babler Portrait" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-slate-50 rounded-[3rem] -z-0 transform -rotate-2"></div>
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
                <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: CONFIG.branding.color }}>
                  {issue.icon}
                </div>
                <h3 className="text-2xl font-black mb-6 text-brand-navy">{issue.title}</h3>
                <ul className="space-y-4">
                  {issue.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-600 font-medium leading-relaxed">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTENING POST */}
      <section id="listening-post" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-navy rounded-[3rem] p-8 md:p-16 text-white relative flex flex-col lg:flex-row gap-16 items-center shadow-2xl">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 bg-white/10 text-white/80 border border-white/10">
                <MessageSquare size={14} /> The Listening Post
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none italic uppercase">Your Voice. <br/><span style={{ color: CONFIG.branding.color }}>My Mission.</span></h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">Representative government only works when the representative listens. Tell Kris what issues are impacting your family in SD49.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm font-bold">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white">1</div>
                  <span>What's the biggest challenge in your neighborhood?</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white">2</div>
                  <span>How can St. Paul better serve Eden Prairie & Minnetonka?</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              {!formSubmitted ? (
                <form className="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Name (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 transition-all" 
                      placeholder="Neighbor Name" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Your Priority Issue</label>
                    <textarea 
                      rows="4" 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full bg-slate-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 transition-all" 
                      placeholder="Tax reform, school safety, local zoning..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ backgroundColor: CONFIG.branding.color }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-12 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black italic">Message Received</h3>
                  <p className="text-slate-400 font-medium">Thank you for sharing your priorities. Kris and the team will review this as we build our policy platform.</p>
                  <button onClick={() => setFormSubmitted(false)} className="text-[10px] font-black uppercase tracking-widest text-emerald-500 pt-4">Send another message</button>
                </div>
              )}
            </div>
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
                        <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1" />
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

      {/* SERVICE GALLERY (Placeholders) */}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
        </div>
      </section>

      {/* DONATE */}
      <section id="pcr" className="py-24 px-4 max-w-5xl mx-auto">
        <PledgeForm />
      </section>

      <footer className="bg-slate-50 py-20 border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[10px] text-slate-400 border border-slate-200 px-6 py-3 rounded-full uppercase font-black tracking-[0.4em] inline-block mb-8">Prepared and paid for by Babler for State Senate (SD49)</p>
          <p className="text-xs text-slate-500 max-w-3xl mx-auto mb-8 leading-relaxed">Babler for State Senate is an exploratory committee. Kris Babler has not yet formally declared as a candidate for SD49. All funds and activities are currently dedicated to evaluating the viability of an independent, common-sense voice for our district.</p>
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
