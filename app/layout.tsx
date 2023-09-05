import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blog posts test task',
  description: 'Simple list of blog posts with search and filtering',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{props.children}</body>
    </html>
  );
}
