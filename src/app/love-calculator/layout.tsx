import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Love Calculator with FLAMES – Check Love Percentage ❤️',
  description: 'Check your love percentage and relationship type using our Love Calculator with FLAMES. Fun and instant results.',
  keywords: 'love calculator, flames game, relationship compatibility, online love test, couple compatibility, choghadiya india',
};

export default function LoveCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
