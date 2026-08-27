import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Disclaimer */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">ClaimPulse</span>
            </div>
            <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
              Independent citizen-service prototype
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turning opaque PF claim status strings into a clear visual journey and actionable next steps.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Privacy & Safety Guarantee
              </div>
              <p className="text-[11px] text-slate-400">
                Never enter UAN Password, OTP, Aadhaar, PAN, or Bank credentials.
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  Track Claim Status
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white font-bold text-amber-400 transition-colors">
                  Judge Demo Mode (/demo)
                </Link>
              </li>
              <li>
                <Link href="/claim" className="hover:text-white transition-colors">
                  Claim History & Demo Scenarios
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-white transition-colors">
                  Quick Status Diagnosis
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="hover:text-white transition-colors">
                  EPFiGMS Grievance Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Protection & Educational */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Citizen Safety & Disclaimers</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scam-shield" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Scam Shield Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About ClaimPulse
                </Link>
              </li>
              <li>
                <Link href="/about#limitations" className="hover:text-white text-amber-300 transition-colors">
                  Platform Limitations & Disclaimers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Portals Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Official EPFO Portals</h4>
            <p className="text-[11px] text-slate-400">
              For official submissions, log in directly via verified Government portals:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-blue-400 flex items-center gap-1"
                >
                  Member e-Sewa Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://epfigms.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-blue-400 flex items-center gap-1"
                >
                  EPFiGMS Grievance Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 ClaimPulse Prototype. Built for Hackathon demonstration.</p>
          <p>Independent citizen-service prototype. Not affiliated with EPFO or Ministry of Labour & Employment.</p>
        </div>
      </div>
    </footer>
  );
};
