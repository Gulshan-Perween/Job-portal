import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0614] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14 md:flex md:justify-between gap-10">
        
        <div className="mb-10 md:mb-0 max-w-xs">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6A38C2]">
            JobHunt
          </h2>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Your go-to platform for discovering top jobs in tech, design, marketing, and more across India.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-purple-500/50 hover:text-purple-400 transition">
              <Facebook size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-purple-500/50 hover:text-purple-400 transition">
              <Twitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-purple-500/50 hover:text-purple-400 transition">
              <Linkedin size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-purple-500/50 hover:text-purple-400 transition">
              <Instagram size={14} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-purple-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-purple-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">For Recruiters</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-purple-400 transition">Post a Job</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Browse Talent</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Pricing</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} <span className="text-purple-500">JobHunt</span>. All rights reserved. Made with ♥ in India.
      </div>
    </footer>
  );
};

export default Footer;