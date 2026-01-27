import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <a href="/">
                <img src="/yallasakn.png" alt="Yalla Sakan Logo" className="w-[120px]" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.companyDescription')}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/yallasakn87"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="icon"  className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/company/yallaskan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="icon"  className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.quickLinks')}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.searchApartments')}
              </Link>

              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.terms')}
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.privacy')}
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.support')}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.contactUs')}
              </Link>
              <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.helpCenter')}
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.faq')}
              </Link>
              <Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.safetyTips')}
              </Link>
              <Link to="/report" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.reportIssue')}
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{t('footer.email')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{t('footer.location')}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">{t('footer.newsletterTitle')}</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  name="newsletter"
                  aria-label={t('footer.newsletterPlaceholder')}
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="text-right text-sm"
                />
                <Button size="sm">{t('footer.subscribe')}</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
