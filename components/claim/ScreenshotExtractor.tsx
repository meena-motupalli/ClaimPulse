'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, X, Image as ImageIcon, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { ClaimType, ClaimStatusInput } from '@/types/claim';

interface ExtractedData {
  claimType: ClaimType;
  submissionDate: string;
  status: ClaimStatusInput;
  rejectionReason?: string;
  fieldOffice?: string;
}

interface ScreenshotExtractorProps {
  onExtracted: (data: ExtractedData) => void;
}

export const ScreenshotExtractor: React.FC<ScreenshotExtractorProps> = ({ onExtracted }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setExtractedData(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate Upload Progress
      setIsUploading(true);
      setUploadProgress(10);
      const p1 = setTimeout(() => setUploadProgress(50), 200);
      const p2 = setTimeout(() => setUploadProgress(85), 400);
      const p3 = setTimeout(() => {
        setUploadProgress(100);
        setIsUploading(false);
      }, 600);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setExtractedData(null);
  };

  const handleRunMockExtraction = () => {
    // Simulated OCR extraction from claim portal screenshot
    const mockResult: ExtractedData = {
      claimType: 'Form 19',
      submissionDate: '2026-08-12',
      status: 'Claim Submitted',
      fieldOffice: 'RO Gurgaon (Haryana)',
      rejectionReason: undefined,
    };
    setExtractedData(mockResult);
    onExtracted(mockResult);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-blue-600" />
          Upload Portal Screenshot (Mock OCR)
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
          Client-Side Processing
        </span>
      </div>

      {/* Upload Zone */}
      {!selectedFile ? (
        <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50 hover:bg-slate-50 transition-all relative cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Click or drag & drop claim portal screenshot
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Supports PNG, JPG, WebP</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Claim Screenshot"
                  className="w-12 h-12 object-cover rounded-lg border border-slate-200 shadow-2xs"
                />
              )}
              <div className="text-xs">
                <p className="font-bold text-slate-900 truncate max-w-[200px]">{selectedFile.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <button
              onClick={handleRemove}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          {isUploading || uploadProgress < 100 ? (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Simulating OCR scan...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Image Loaded
              </span>
              <button
                type="button"
                onClick={handleRunMockExtraction}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Run Demo Extraction
              </button>
            </div>
          )}
        </div>
      )}

      {/* Extracted Output Result Box */}
      {extractedData && (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Demo Extraction Result
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-200/80 text-emerald-900 rounded-md font-bold">
              Demo Extraction
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-white rounded-lg border border-emerald-100">
              <span className="text-[10px] text-slate-400 font-bold block">Claim Type</span>
              <span className="font-bold text-slate-900">{extractedData.claimType}</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-emerald-100">
              <span className="text-[10px] text-slate-400 font-bold block">Submission Date</span>
              <span className="font-bold text-slate-900">{extractedData.submissionDate}</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-emerald-100">
              <span className="text-[10px] text-slate-400 font-bold block">Extracted Status</span>
              <span className="font-bold text-emerald-700">{extractedData.status}</span>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Warning */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700">Privacy Protection:</strong> Images are processed purely client-side in browser memory and are never uploaded to remote servers.
        </p>
      </div>
    </div>
  );
};
