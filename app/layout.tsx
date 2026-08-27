import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ClaimPulse - EPF Claim Status Guidance & Diagnostic Platform',
  description:
    'Don\'t just see your claim status. Understand what happens next. Independent citizen-side diagnostic tool for EPFO claim journeys.',
  keywords: [
    'EPFO claim status',
    'PF claim tracking',
    'Claim Submitted at Portal',
    'PF claim delay',
    'EPFiGMS grievance',
    'PF withdrawal Form 19',
    'Form 10C',
    'Form 31',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F3EBDD] text-[#292421] antialiased flex flex-col min-h-screen">
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
