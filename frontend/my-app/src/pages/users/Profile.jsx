import React, { useState } from "react";
import {
  Grid,
  Bookmark,
  Heart,
  MessageCircle,
  MapPin,
  Link2,
  Calendar,
  Layers,
  Compass,
  SlidersHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Briefcase,
} from "lucide-react";

export default function SeriousUserProfile() {
  const [activeTab, setActiveTab] = useState("insights");

  // Realistic template schema
  const profile = {
    name: "Dr. Aris Thorne",
    handle: "aris.thorne.design",
    title: "Principal Systems Architect",
    company: "Helix Laboratories",
    isVerified: true,
    location: "Zurich, Switzerland",
    link: "https://helixlabs.io/thorne",
    memberSince: "Joined October 2024",
    bio: "Engineering deterministic interface systems and cross-chain execution engines. Formerly core infrastructure lead at Vercel. Obsessed with sub-millisecond layout painting and structural typographical systems.",
    stats: { followers: 18400, following: 892, publications: 56 },
    skills: ["Reactive Graphing", "Distributed Systems", "Tailwind Spec Core", "Rust Wasm"],
  };

  const dynamicItems = [
    {
      id: "feed-1",
      type: "featured_case",
      category: "Systems Architecture",
      title: "Deterministic UI Rendering Engines for Sub-Millisecond Financial Dashboards",
      summary:
        "An exhaustive breakdown of virtual DOM synchronization strategies under hyper-frequent WebSockets data strain, utilizing low-level memory allocation arrays directly in the main layout layer.",
      metrics: { likes: "1.2k", comments: 94 },
      time: "4 min read",
      date: "Today",
    },
    {
      id: "feed-2",
      type: "visual_resource",
      category: "Design Systems",
      title: "The Token Matrix: Multi-Brand Scale Utility",
      summary: "Open-sourcing our core programmatic layout schema for cross-platform Tailwind compilation maps.",
      metrics: { likes: 482, comments: 19 },
      time: "12 min read",
      date: "3 days ago",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "feed-3",
      type: "editorial_note",
      category: "Product Critique",
      title: "Why Uniform Card Grids are Ruining Content Discovery and Spatial Information Context",
      summary:
        "Uniform grids treat all information with flat priority weights. Real design requires visual resistance, intentional text length breaks, and systematic asymmetry to direct reading pathways naturally.",
      metrics: { likes: 823, comments: 142 },
      time: "7 min read",
      date: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-zinc-200 antialiased font-sans px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Main Interface Layout split line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Anchor Side Profile Panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-12">
              {/* Identity Presentation Block */}
              <div className="relative group">
                <div className="h-28 w-28 overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-300 group-hover:border-zinc-700">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300"
                    alt={profile.name}
                    className="h-full w-full object-cover  transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight text-white">{profile.name}</h1>
                    {profile.isVerified && <ShieldCheck className="h-4 w-4 text-zinc-400 fill-zinc-900" />}
                  </div>
                  <p className="text-xs font-mono text-zinc-500">@{profile.handle}</p>
                </div>
              </div>

              {/* Corporate Metadata Row */}
              <div className="mt-6 space-y-3 border-t border-zinc-900 pt-6 text-sm">
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Briefcase className="h-4 w-4 text-zinc-600" />
                  <span>
                    {profile.title} at <span className="text-zinc-200">{profile.company}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <MapPin className="h-4 w-4 text-zinc-600" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Link2 className="h-4 w-4 text-zinc-600" />
                  <a href={profile.link} className="hover:text-white transition underline decoration-zinc-800 underline-offset-4">
                    {profile.link.replace("https://", "")}
                  </a>
                </div>
              </div>

              {/* Precise Numerical Metric Matrix */}
              <div className="mt-8 grid grid-cols-3 gap-2 rounded-2xl bg-zinc-950/60 p-4 border border-zinc-900">
                <div>
                  <span className="block text-sm font-bold text-white tracking-tight">{(profile.stats.followers / 1000).toFixed(1)}k</span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Followers</span>
                </div>
                <div className="border-x border-zinc-900 px-3">
                  <span className="block text-sm font-bold text-white tracking-tight">{profile.stats.following}</span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Following</span>
                </div>
                <div className="pl-2">
                  <span className="block text-sm font-bold text-white tracking-tight">{profile.stats.publications}</span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Logs</span>
                </div>
              </div>

              {/* Extended Biographical Segment */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Executive Synthesis</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{profile.bio}</p>
              </div>

              {/* Programmatic Taxonomy Tags */}
              <div className="mt-8 pt-6 border-t border-zinc-900">
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-lg bg-zinc-900/40 border border-zinc-850 px-2.5 py-1 text-xs text-zinc-400 font-mono"
                    >
                      <Zap className="h-2.5 w-2.5 text-zinc-600" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Anchor Activity/Feed Segment */}
          <div className="lg:col-span-8 space-y-8">
            {/* Navigational Segment Switcher */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("insights")}
                  className={`pb-3 text-sm font-medium transition-all relative ${activeTab === "insights" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  System Logs
                  {activeTab === "insights" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />}
                </button>
                <button
                  onClick={() => setActiveTab("bookmarks")}
                  className={`pb-3 text-sm font-medium transition-all relative ${activeTab === "bookmarks" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  Archived Indices
                  {activeTab === "bookmarks" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />}
                </button>
              </div>
              <button className="p-1.5 rounded-lg border border-zinc-900 text-zinc-500 hover:text-zinc-300 transition">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Asymmetric Stream Container */}
            <div className="space-y-8">
              {dynamicItems.map((item) => (
                <div key={item.id} className="group relative border-b border-zinc-900/70 pb-8 last:border-0 transition-all duration-300">
                  {/* Mode 1: High Priority Text Editorial Row */}
                  {item.type === "featured_case" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-500 px-2 py-0.5 rounded border border-zinc-900 bg-zinc-950">{item.category}</span>
                        <span className="text-zinc-600">{item.date}</span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors duration-200">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 text-zinc-700 group-hover:text-white transition-colors shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">{item.summary}</p>
                    </div>
                  )}

                  {/* Mode 2: Split Media Component Array */}
                  {item.type === "visual_resource" && (
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {item.imageUrl && (
                        <div className="w-full md:w-44 h-28 rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950 shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      )}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400 font-semibold">{item.category}</span>
                          <span className="text-zinc-600">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">{item.summary}</p>
                      </div>
                    </div>
                  )}

                  {/* Mode 3: Dynamic Dense Typographical Block */}
                  {item.type === "editorial_note" && (
                    <div className="bg-zinc-950/40 rounded-2xl p-6 border border-zinc-900/60 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                        <Layers className="h-3 w-3 text-zinc-600" />
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-200 tracking-tight leading-snug">{item.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-mono border-l-2 border-zinc-800 pl-4 py-1">{item.summary}</p>
                    </div>
                  )}

                  {/* Shared Global Meta Metrics Panel */}
                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 pt-2 font-mono">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 hover:text-zinc-300 transition">
                        <Heart className="h-3.5 w-3.5" />
                        <span>{item.metrics.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-zinc-300 transition">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{item.metrics.comments}</span>
                      </button>
                    </div>
                    <span className="text-zinc-600">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
