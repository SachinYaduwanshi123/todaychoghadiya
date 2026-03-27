import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Kundli Generator – Get Your Birth Chart & Astrology Prediction',
  description: 'Generate your free Kundli online with accurate birth chart and AI-based astrology predictions in Hindi and English.',
};

export default function KundliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-orange-50/30 min-h-screen">
      {children}
    </div>
  );
}
