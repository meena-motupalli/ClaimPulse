'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X, Activity, Search, ShieldAlert, Info, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Activity },
  { name: 'Track Claim', href: '/track', icon: Search },
  { name: 'Claim History', href: '/claim', icon: Clock },
  { name: 'Scam Shield', href: '/scam-shield', icon: ShieldAlert },
  { name: 'Judge Demo', href: '/demo', icon: Sparkles },
  { name: 'About', href: '/about', icon: Info },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Institutional Subtitle */}
          <Link href="/" className="flex items-center gap-3 focus:outline-hidden focus:ring-2 focus:ring-blue-600 p-1">
            <div className="w-10 h-10 rounded-lg bg-blue-800 text-white flex items-center justify-center shadow-xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight">ClaimPulse</span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                  Independent Prototype
                </span>
              </div>
              <span className="text-[11px] text-slate-600 font-medium -mt-0.5">
                Citizen Claim Intelligence System
              </span>
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
                    'flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all',
                    isActive
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-blue-800' : 'text-slate-500')} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/demo"
              className="inline-flex items-center gap-1 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold rounded-md border border-amber-300 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Judge Demo
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-md shadow-xs transition-all"
            >
              Track Claim
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-colors',
                  isActive ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-blue-800' : 'text-slate-500')} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-md text-xs shadow-xs"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-slate-950" />
              Open Judge Demo Mode
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 bg-blue-800 text-white font-bold rounded-md text-xs shadow-xs"
            >
              Track My Claim Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
