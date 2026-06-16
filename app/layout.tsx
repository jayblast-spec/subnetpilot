import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SubnetPilot | Network planning',
  description: 'turn messy IP space into clean, secure, auditable network plans',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
