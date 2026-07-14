import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MotionOrchestrator } from '@/components/MotionOrchestrator';
import { siteConfig } from '@/lib/site-data';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}｜${siteConfig.primaryClaim}`,
    template: `%s｜${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL('https://www.staroakx.com'),
  openGraph: {
    title: `${siteConfig.name}｜${siteConfig.primaryClaim}`,
    description: siteConfig.description,
    url: 'https://www.staroakx.com',
    siteName: siteConfig.name,
    images: [{ url: '/assets/og-staroak.png', width: 1200, height: 630 }],
    locale: 'zh_CN',
    type: 'website'
  },
  icons: {
    icon: '/assets/favicon.ico',
    apple: '/assets/favicon-180.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">跳到主要内容</a>
        <MotionOrchestrator />
        <div className="site-shell">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
