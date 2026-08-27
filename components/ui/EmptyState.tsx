import React from 'react';
import Link from 'next/link';
import { SearchX, FilePlus, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No claims tracked yet',
  description = 'You have not added any PF claims to your active diagnosis list. Start by entering your reported claim details.',
  actionText = 'Track Your First Claim',
  actionHref = '/track',
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-6">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-4 border border-blue-100">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
        >
          <FilePlus className="w-4 h-4" />
          {actionText}
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </Link>
      )}
    </div>
  );
};
