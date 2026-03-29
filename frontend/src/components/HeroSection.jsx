import { Search, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

const HeroSection = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => onSearch(query);
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <section className="relative overflow-hidden bg-[#0f0a1e] text-white py-24 px-4">
      {/* Gradient orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-[#6A38C2] opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] bg-[#a855f7] opacity-15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
          <Sparkles size={14} />
          No.1 Job Hunt Platform in India
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6A38C2]">Dream Job</span>
          <br />Before Anyone Else
        </h1>

        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Thousands of opportunities across India. Search, apply, and get hired — all in one place.
        </p>

        {/* Search bar */}
        <div className="flex w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-purple-500/30 bg-white/5 backdrop-blur-sm shadow-xl shadow-purple-900/20">
          <input
            type="text"
            placeholder="Job title, skill, or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-500 text-sm md:text-base focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white px-6 py-4 font-semibold text-sm hover:opacity-90 transition"
          >
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Frontend", "Remote", "Fullstack", "DevOps", "Data Science"].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-400 hover:border-purple-400 hover:text-purple-300 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;