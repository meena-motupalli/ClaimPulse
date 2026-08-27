'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Menu, X, Activity, Search, ShieldAlert, Info, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Activity },
  { name: 'Track Claim', href: '/track', icon: Search },
  { name: 'Claim History', href: '/claim', icon: Clock },
  { name: 'Scam Shield', href: '/scam-shield', icon: ShieldAlert },
  { name: 'About', href: '/about', icon: Info },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-300">Independent Diagnostic Platform:</span>
          <span className="text-slate-400 hidden sm:inline">Never enter your UAN Password, OTP, or Bank Details.</span>
          <Link href="/about" className="underline text-blue-300 hover:text-blue-200 font-medium ml-1">
            Learn More
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-lg p-1">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                ClaimPulse
                <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-md">
                  Citizen
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium -mt-1">EPFO Claim Guidance</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-blue-600' : 'text-slate-400')} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/track"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-98"
            >
              Track Claim
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-blue-600' : 'text-slate-400')} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 bg-blue-600 text-white font-medium rounded-xl text-base shadow-sm"
            >
              Track My Claim Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
