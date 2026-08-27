'use client';

import React, { useState, useEffect } from 'react';
import { Type, Eye, Languages, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AccessibilityToolbar: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Font size attribute
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
    // Reduce motion attribute
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
        {/* Left Notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            Citizen-First Government Service Prototype
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <Languages className="w-3.5 h-3.5 text-blue-400 ml-1.5" />
            <button
              onClick={() => setLang('EN')}
              className={cn(
                'px-2 py-0.5 rounded-md text-[11px] font-bold transition-all',
                lang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              English
            </button>
            <button
              onClick={() => setLang('HI')}
              className={cn(
                'px-2 py-0.5 rounded-md text-[11px] font-bold transition-all',
                lang === 'HI' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              हिंदी
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center gap-0.5 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold px-1 flex items-center gap-0.5">
              <Type className="w-3 h-3 text-slate-400" />
            </span>
            <button
              onClick={() => setFontSize('normal')}
              className={cn(
                'px-1.5 py-0.5 rounded-md text-[11px] font-bold transition-all',
                fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              )}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={cn(
                'px-1.5 py-0.5 rounded-md text-[11px] font-bold transition-all',
                fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              )}
              title="Large Font Size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={cn(
                'px-1.5 py-0.5 rounded-md text-[11px] font-bold transition-all',
                fontSize === 'xlarge' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              )}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Reduce Motion Toggle */}
          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className={cn(
              'px-2 py-0.5 rounded-lg text-[11px] font-semibold border flex items-center gap-1 transition-all',
              reduceMotion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            )}
            title="Toggle reduced motion animations"
          >
            <Eye className="w-3 h-3" />
            {reduceMotion ? 'Motion Off' : 'Motion On'}
          </button>
        </div>
      </div>
    </div>
  );
};
