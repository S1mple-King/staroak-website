import Image from 'next/image';
import Link from 'next/link';
import { navItems, siteConfig } from '@/lib/site-data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <span className="footer-rootline-cap" aria-hidden="true" />
          <Image
            className="footer-logo"
            src="/assets/staroak-mark-transparent.png"
            alt="StarOak 星橡"
            width={650}
            height={442}
          />
          <p className="footer-brand-name">星橡 StarOak</p>
          <p>{siteConfig.slogan}</p>
          <p className="muted">{siteConfig.legalName}</p>
        </div>
        <div>
          <h4>站点导航</h4>
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <h4>联系入口</h4>
          <p>info@staroakx.com</p>
          <p>partnership@staroakx.com</p>
          <p className="muted">深圳 / 香港 · 正式地址待确认</p>
        </div>
        <div>
          <h4>合规提示</h4>
          <p className="muted">AI量化交易相关内容仅用于技术能力与研究方向说明，不构成投资建议、收益承诺或金融产品推介。</p>
          <Link href="/privacy">隐私政策</Link>
          <Link href="/disclaimer">免责声明</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} StarOak. All rights reserved.</span>
        <span>Privacy Policy · Disclaimer · Compliance Notice</span>
      </div>
    </footer>
  );
}
