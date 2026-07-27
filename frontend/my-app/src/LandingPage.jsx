import React, { useState } from "react";
import { ChevronDown, Check, Star, ChevronLeft, ChevronRight, BookOpen, Award, BarChart, ShieldCheck, Video, Sparkles } from "lucide-react";

export default function LandingPage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Nav mega-menu items
  const productsMenu = [
    { name: "Interactive Course Builder", desc: "Create dynamic learning paths", icon: BookOpen },
    { name: "Automated Certifications", desc: "Issue verifiable credentials", icon: Award },
    { name: "Centralized Analytics", desc: "Real-time student progress tracking", icon: BarChart },
    { name: "Live Classroom Integration", desc: "Seamless Zoom & Teams video sync", icon: Video },
  ];

  // Testimonials matching the screenshot cards
  const testimonials = [
    {
      title: "Interactive Course Builder",
      quote: "Centralizing course building and progress tracking transformed our hybrid onboarding pipeline completely.",
      author: "Sana Saidi",
      role: "Head of Learning, TechCorp",
      rating: 5,
    },
    {
      title: "Seamless Integrations",
      quote: "The live classroom integration and automated certifications saved our administration team over 20 hours a week.",
      author: "Anais Moon",
      role: "Director of Education",
      rating: 5,
    },
    {
      title: "Live Classroom Integration",
      quote: "Live analytics during lectures gave our instructors actionable data on student engagement in real time.",
      author: "Stevis Henton",
      role: "Lead Instructor",
      rating: 5,
    },
    {
      title: "Automated Grading",
      quote: "Automating our assessment certifications allowed us to scale from 500 to 10,000 active students seamlessly.",
      author: "Marcus Vance",
      role: "Operations Lead",
      rating: 5,
    },
  ];

  // FAQs
  const faqs = [
    "How does pricing work?",
    "How do I deploy our LMS?",
    "Can I integrate with Zoom & Teams?",
    "Can I secure question banks & exams?",
    "What white-label options are available?",
    "Is student data SOC2 compliant and secure?",
  ];

  return (
    <div className="bg-white text-slate-800 font-sans antialiased">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <span>LearnCloud</span>
          </a>

          {/* Nav Links with Hover Dropdown */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative" onMouseEnter={() => setActiveDropdown("products")} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm hover:text-[#0066FF] py-6">
                Products <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {/* Mega Dropdown */}
              {activeDropdown === "products" && (
                <div className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 grid grid-cols-1 gap-2">
                  {productsMenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a key={item.name} href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="p-2.5 rounded-lg bg-blue-50 text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-[#0066FF]">{item.name}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="#features" className="text-slate-700 font-semibold text-sm hover:text-[#0066FF]">
              Features
            </a>
            <a href="#testimonials" className="text-slate-700 font-semibold text-sm hover:text-[#0066FF]">
              Reviews
            </a>
            <a href="#pricing" className="text-slate-700 font-semibold text-sm hover:text-[#0066FF]">
              Pricing
            </a>
            <a href="#faq" className="text-slate-700 font-semibold text-sm hover:text-[#0066FF]">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-bold text-slate-700 hover:text-slate-900 px-3 py-2">
              Log in
            </a>
            <a
              href="#contact"
              className="text-sm font-bold bg-slate-900 hover:bg-[#0066FF] text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION (min-h-[200vh]) ================= */}
      <section className="min-h-[200vh] bg-gradient-to-b from-blue-50/40 via-blue-100/30 to-white flex flex-col justify-between pt-20 pb-28 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center my-auto">
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Learning Engine
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              The Modern LMS for Hybrid Learning Teams
            </h1>

            <p className="text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Centralize your course authoring, automate student certifications, and track real-time progress across your enterprise environment.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-[#0066FF] text-white font-bold text-sm shadow-md transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="#features"
                className="px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-colors"
              >
                Explore Platform
              </a>
            </div>
          </div>

          {/* Right Hero Visual with Floating Cloud Backdrop & White Checklist Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Cloud Illustration Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/40 to-indigo-200/50 rounded-full blur-3xl opacity-70 -z-10 transform scale-125" />

            <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-slate-100 z-10 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Cloud Platform gives you:</h3>

              <ul className="space-y-4">
                {[
                  "Interactive Course Builder",
                  "Automated Certifications",
                  "Centralized Analytics",
                  "Centralized Options",
                  "White-Label Branding",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 leading-relaxed">
                Included with all enterprise tiers and self-serve team plans.
              </p>
            </div>
          </div>
        </div>

        {/* Cloud Wave Divider */}
        <div className="w-full text-white">
          <svg viewBox="0 0 1440 120" fill="currentColor" className="w-full h-16 drop-shadow-sm">
            <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,70L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ================= FEATURES SECTION (min-h-[200vh]) ================= */}
      <section id="features" className="min-h-[200vh] bg-white flex flex-col justify-center py-28 px-8">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-20 tracking-tight">Shared LMS Features</h2>

          {/* 2-Column Clean Layout matching Screenshot */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {/* Feature 1 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center relative z-10 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-[#0066FF] text-white flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-20 h-3 bg-slate-200 rounded-full mx-auto -mt-2 blur-[1px]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Interactive Course Builder</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Although custom authoring can be complex, our platform gives you pre-built interactive modules. Build quizzes, video lectures, and
                  assignments in minutes.{" "}
                  <a href="#" className="text-[#e3503e] hover:underline font-semibold inline-flex items-center gap-1">
                    Learn more &rarr;
                  </a>
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center relative z-10 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-[#e3503e] text-white flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-20 h-3 bg-slate-200 rounded-full mx-auto -mt-2 blur-[1px]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Certifications</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Need automatic credential issuance? Our dedicated workflow engine generates PDF certificates upon course completion.{" "}
                  <a href="#" className="text-[#e3503e] hover:underline font-semibold">
                    Live Chat
                  </a>
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center relative z-10 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-20 h-3 bg-slate-200 rounded-full mx-auto -mt-2 blur-[1px]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Live Classroom Integration</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Get up and running fast with integrated video webhooks that auto-sync attendance records and attendance logs directly from Zoom or
                  Microsoft Teams.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center relative z-10 shadow-inner">
                  <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                    <BarChart className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-20 h-3 bg-slate-200 rounded-full mx-auto -mt-2 blur-[1px]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Detailed Performance Analytics</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Track student retention, quiz completion curves, and cohort progress through clean dashboard visualizers built directly into your
                  LMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION (min-h-[200vh]) ================= */}
      <section id="testimonials" className="min-h-[200vh] bg-slate-50 flex flex-col justify-center py-28 px-8 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-16 tracking-tight">Trusted by Thousands</h2>

          {/* Carousel Layout */}
          <div className="relative max-w-6xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="p-3 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-slate-900 z-10 flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-3 gap-6 w-full overflow-hidden">
              {testimonials.slice(activeTestimonialIdx, activeTestimonialIdx + 3).map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    {/* Trustpilot Green Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white">
                          <Star className="w-3 h-3 fill-white stroke-none" />
                        </div>
                      ))}
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">"{item.quote}"</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{item.author}</div>
                      <div className="text-[11px] text-slate-400">{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-slate-900 z-10 flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 text-center text-xs font-semibold text-slate-500">
            Rated <span className="font-bold text-slate-900">4.8 / 5</span> based on{" "}
            <a href="#" className="underline text-slate-700">
              2,400+ reviews
            </a>{" "}
            on <span className="font-bold text-[#00b67a]">★ Trustpilot</span>
          </div>
        </div>
      </section>

      {/* ================= FAQ & CONTACT FORM SECTION (min-h-[200vh]) ================= */}
      <section id="faq" className="min-h-[200vh] bg-blue-100/40 flex flex-col justify-center py-28 px-8">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-16 tracking-tight">FAQ & Contact</h2>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: FAQ Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faqText, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-blue-200/60 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 font-bold text-slate-800 text-sm flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faqText}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-slate-600 text-xs border-t border-slate-100 pt-3 leading-relaxed">
                      LearnCloud provides flexible options with self-serve billing, automated onboarding tools, and dedicated enterprise SLA support.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-8 border border-slate-200 shadow-xl" id="contact">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Have questions?</h3>
              <p className="text-slate-500 text-xs mb-6">Our team is ready to assist you with custom deployment options.</p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Team Size</label>
                  <select className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]">
                    <option>1 - 10 instructors</option>
                    <option>10 - 50 instructors</option>
                    <option>50+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-[#0066FF] text-white font-bold text-xs rounded-lg transition-colors shadow-md"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-black text-lg">
            <BookOpen className="w-5 h-5 text-[#0066FF]" /> LearnCloud
          </div>
          <div className="text-slate-500">© {new Date().getFullYear()} LearnCloud Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
