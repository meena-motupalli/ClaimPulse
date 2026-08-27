'use client';

import React, { useState, useEffect } from 'react';
import { Info, Volume2, Type, Eye, Sparkles, HelpCircle } from 'lucide-react';
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
      {/* 1. TOP INSTITUTIONAL BAR */}
      <div className="bg-[#4A3026] text-[#F3EBDD] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#37231B] flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide font-semibold">
          <span className="font-bold text-white">CLAIMPULSE</span>
          <span className="opacity-40">|</span>
          <span className="text-[#E8DDCC]">Independent Citizen-Service Prototype</span>
          <span className="hidden md:inline opacity-40">|</span>
          <span className="hidden md:inline text-amber-200">For Demonstration Purposes Only</span>
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
          <div className="flex items-center gap-1 bg-[#37231B] px-2 py-0.5 rounded border border-[#5B477D]/50 text-[10px]">
            <Type className="w-3 h-3 text-[#F3EBDD]" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1 rounded ${fontSize === 'normal' ? 'bg-[#5B477D] font-bold text-white' : 'hover:text-white'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1 rounded ${fontSize === 'large' ? 'bg-[#5B477D] font-bold text-white' : 'hover:text-white'}`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1 rounded ${fontSize === 'xlarge' ? 'bg-[#5B477D] font-bold text-white' : 'hover:text-white'}`}
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
              reduceMotion ? 'bg-[#5B477D] border-[#5B477D] text-white font-bold' : 'border-[#665D56] hover:text-white'
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
              highContrast ? 'bg-amber-400 border-amber-400 text-[#292421] font-bold' : 'border-[#665D56] hover:text-white'
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
            <HelpCircle className="w-3 h-3 text-[#5B477D]" />
            <span>Help</span>
          </a>
        </div>
      </div>

      {/* 2. GOVERNMENT NOTICE BAR */}
      <div className="bg-[#E8DDCC] text-[#292421] border-b border-[#D7CBBB] py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-[#5B477D] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
            ⓘ
          </div>
          <p className="leading-snug">
            <strong>Government Service Prototype Notice:</strong> ClaimPulse is an independent prototype designed to help citizens understand public-service claim journeys.
          </p>
        </div>
      </div>
    </div>
  );
};
