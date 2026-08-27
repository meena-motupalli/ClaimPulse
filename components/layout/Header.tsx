'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AccessibilityToolbar } from '@/components/ui/AccessibilityToolbar';
import { Menu, X, ShieldCheck, FileText, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Track Claim', href: '/track' },
    { name: 'Claim History', href: '/claim' },
    { name: 'Grievance Assistance', href: '/grievance' },
    { name: 'Scam Shield', href: '/scam-shield' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8] border-b border-[#D7CBBB] shadow-2xs">
      <AccessibilityToolbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-[#5B477D]">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Original ClaimPulse Geometric Logo */}
            <div className="w-10 h-10 rounded-lg bg-[#4A3026] text-white flex items-center justify-center relative border border-[#37231B] shadow-2xs group-hover:bg-[#37231B] transition-colors">
              <FileText className="w-5 h-5 text-[#F3EBDD]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#5B477D] rounded-full border-2 border-[#FFFDF8]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#276749] rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#4A3026]">
                  ClaimPulse
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#E8DDCC] text-[#4A3026] rounded border border-[#D7CBBB]">
                  Independent Prototype
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#5B477D] tracking-wide">
                Citizen Claim Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-bold text-[#292421]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md transition-colors',
                    isActive
                      ? 'bg-[#4A3026] text-[#FFFDF8]'
                      : 'hover:bg-[#E8DDCC] text-[#292421]'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/track"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#4A3026] hover:bg-[#37231B] text-[#FFFDF8] font-bold text-xs rounded-md shadow-2xs transition-all border border-[#37231B]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Claim</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#4A3026] hover:bg-[#E8DDCC]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-b border-[#D7CBBB] px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-xs font-bold text-[#292421] hover:bg-[#E8DDCC]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-[#4A3026] text-[#FFFDF8] text-center font-bold text-xs rounded-md block"
            >
              Track Claim Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
