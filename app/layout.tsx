import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '愚かなあきと',
  description: '分岐で結末が変わるアキト更生ノベルゲーム',
  openGraph: {
    title: '愚かなあきと',
    description: '分岐で結末が変わるアキト更生ノベルゲーム',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    title: '愚かなあきと',
    description: '分岐で結末が変わるアキト更生ノベルゲーム',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
