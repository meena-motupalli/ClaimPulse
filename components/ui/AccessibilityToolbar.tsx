'use client';

import React, { useState, useEffect } from 'react';
import { Type, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export const AccessibilityToolbar: React.FC = () => {
  const { showToast } = useToast();
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleLanguage = () => {
    const next = language === 'EN' ? 'HI' : 'EN';
    setLanguage(next);
    showToast(next === 'HI' ? 'Language switched to Hindi (हिंदी)' : 'Language switched to English', 'info');
  };

  return (
    <div className="w-full font-sans text-xs">
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-[#432F28] text-[#F1ECE4] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#32221D] flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide font-semibold">
          <span className="font-bold text-white">CLAIMPULSE</span>
          <span className="opacity-40">|</span>
          <span className="text-[#F1ECE4]">Independent Citizen-Service Prototype</span>
        </div>

        {/* Accessibility & Language Controls */}
        <div className="flex items-center gap-3 text-[11px]">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="hover:text-white font-bold transition-colors flex items-center gap-1"
            title="Toggle Language"
          >
            <span>{language === 'EN' ? 'English' : 'हिंदी'}</span>
          </button>

          <span className="opacity-40">|</span>

          {/* Font Size Controls */}
          <div className="flex items-center gap-1 bg-[#32221D] px-2 py-0.5 rounded border border-[#62507D]/50 text-[10px]">
            <Type className="w-3 h-3 text-[#F1ECE4]" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1 rounded ${fontSize === 'normal' ? 'bg-[#62507D] font-bold text-white' : 'hover:text-white'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1 rounded ${fontSize === 'large' ? 'bg-[#62507D] font-bold text-white' : 'hover:text-white'}`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1 rounded ${fontSize === 'xlarge' ? 'bg-[#62507D] font-bold text-white' : 'hover:text-white'}`}
            >
              A++
            </button>
          </div>

          <span className="opacity-40">|</span>

          {/* Motion Toggle */}
          <button
            onClick={() => {
              setReduceMotion(!reduceMotion);
              showToast(reduceMotion ? 'Animations enabled' : 'Motion reduced', 'info');
            }}
            className={`px-1.5 py-0.5 rounded border text-[10px] transition-colors ${
              reduceMotion ? 'bg-[#62507D] border-[#62507D] text-white font-bold' : 'border-[#6B625D] hover:text-white'
            }`}
          >
            Motion {reduceMotion ? 'Off' : 'On'}
          </button>

          {/* High Contrast */}
          <button
            onClick={() => {
              setHighContrast(!highContrast);
              showToast(highContrast ? 'Standard contrast restored' : 'High contrast mode enabled', 'info');
            }}
            className={`px-1.5 py-0.5 rounded border text-[10px] transition-colors ${
              highContrast ? 'bg-amber-400 border-amber-400 text-[#262321] font-bold' : 'border-[#6B625D] hover:text-white'
            }`}
          >
            Contrast
          </button>

          <span className="opacity-40">|</span>

          {/* Help link */}
          <a
            href="/about#help"
            className="hover:text-white flex items-center gap-1 font-semibold text-[11px]"
          >
            <HelpCircle className="w-3 h-3 text-[#62507D]" />
            <span>Help</span>
          </a>
        </div>
      </div>

      {/* 2. GOVERNMENT NOTICE BAR */}
      <div className="bg-[#F1ECE4] text-[#262321] border-b border-[#D8D2CA] py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-[#62507D] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
            ⓘ
          </div>
          <p className="leading-snug text-left">
            <strong>Government Service Prototype Notice:</strong> ClaimPulse is an independent prototype designed to help citizens understand public-service claim journeys.
          </p>
        </div>
      </div>
    </div>
  );
};
