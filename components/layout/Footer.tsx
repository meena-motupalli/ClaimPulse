import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Disclaimer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white font-bold shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">ClaimPulse</span>
            </div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
              Independent Citizen-Service Prototype
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Turning opaque public claim status strings into a clear visual journey and actionable next steps.
            </p>
            <div className="p-3 bg-slate-800 rounded border border-slate-700 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-emerald-400">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Privacy & Safety Guarantee
              </div>
              <p className="text-[10px] text-slate-400">
                Never enter UAN Password, OTP, Aadhaar, PAN, or Bank credentials.
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Services & Navigation</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
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
                  Claim History & Records
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-white transition-colors">
                  Diagnostic Simulator
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="hover:text-white transition-colors">
                  Grievance Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Protection & Disclaimers */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Safety & Disclaimers</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="/scam-shield" className="hover:text-white transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  PF Scam Shield
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About ClaimPulse
                </Link>
              </li>
              <li>
                <Link href="/about#limitations" className="hover:text-white text-amber-300 transition-colors">
                  Platform Limitations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Official Sources */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Verified Official Sources</h4>
            <p className="text-[10px] text-slate-400">
              Official filings and portal access:
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-blue-400 flex items-center gap-1 font-semibold"
                >
                  <span>EPFO Member e-Sewa</span>
                  <span className="text-[9px] font-mono text-slate-500 font-normal">(Official source)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://epfigms.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-blue-400 flex items-center gap-1 font-semibold"
                >
                  <span>EPFiGMS Grievance Portal</span>
                  <span className="text-[9px] font-mono text-slate-500 font-normal">(Official source)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-500">
          <p>© 2026 ClaimPulse Prototype. Built for Hackathon demonstration.</p>
          <p className="text-amber-400 font-medium">ClaimPulse is not affiliated with or operated by EPFO.</p>
        </div>
      </div>
    </footer>
  );
};
