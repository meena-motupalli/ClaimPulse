'use client';

import React, { useState, useEffect } from 'react';
import { Type, Eye, Languages, Shield, Info, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AccessibilityToolbar: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'large') {
      root.style.fontSize = '17px';
    } else if (fontSize === 'xlarge') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
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

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
      {/* Top Institutional Bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="font-bold tracking-wider text-slate-100 uppercase">
            CLAIMPULSE | Independent Citizen-Service Prototype
          </span>
          <span className="hidden sm:inline text-slate-400">• For Demonstration Purposes Only</span>
        </div>

        {/* Accessibility & Language Controls */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <button
              onClick={() => setLang('EN')}
              className={cn(
                'px-2 py-0.5 rounded text-[11px] font-bold transition-all',
                lang === 'EN' ? 'bg-blue-700 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              English
            </button>
            <button
              onClick={() => setLang('HI')}
              className={cn(
                'px-2 py-0.5 rounded text-[11px] font-bold transition-all',
                lang === 'HI' ? 'bg-blue-700 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              हिंदी
            </button>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-0.5 bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 px-1 font-bold">A</span>
            <button
              onClick={() => setFontSize('normal')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[11px] font-bold',
                fontSize === 'normal' ? 'bg-blue-700 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Standard
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[11px] font-bold',
                fontSize === 'large' ? 'bg-blue-700 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[11px] font-bold',
                fontSize === 'xlarge' ? 'bg-blue-700 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              A++
            </button>
          </div>

          {/* Motion Off */}
          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className={cn(
              'px-2 py-0.5 rounded text-[11px] font-medium border transition-all flex items-center gap-1',
              reduceMotion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            )}
          >
            <Eye className="w-3 h-3" />
            {reduceMotion ? 'Motion Off' : 'Motion On'}
          </button>

          {/* High Contrast */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={cn(
              'px-2 py-0.5 rounded text-[11px] font-medium border transition-all flex items-center gap-1',
              highContrast
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            )}
          >
            <Sun className="w-3 h-3" />
            Contrast
          </button>
        </div>
      </div>

      {/* Slim Government-Style Notice Bar */}
      <div className="bg-blue-950/90 border-t border-blue-900/60 py-1.5 px-4 text-blue-200 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>
            <strong>Public Disclosure:</strong> ClaimPulse is an independent citizen-service prototype designed to help citizens understand public claim journeys. It is not an official EPFO portal.
          </span>
        </div>
      </div>
    </div>
  );
};
