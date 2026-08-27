import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBannerProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = 'Unable to analyze claim data',
  message = 'We couldn\'t analyze this claim information. Please check the fields and try again.',
  onRetry,
}) => {
  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-5 my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-rose-100 rounded-xl text-rose-600 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-rose-950">{title}</h4>
          <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
};
