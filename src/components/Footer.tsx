import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
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
              منصة موثوقة لإيجاد السكن المناسب للطلاب في أسيوط. نربط بين الطلاب وأصحاب السكن بأمان وسهولة.
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
            <h3 className="font-semibold text-lg">روابط سريعة</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                البحث عن شقق
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                لوحة تحكم المالك
              </Link>
              <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                الملف الشخصي
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                الشروط والأحكام
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                سياسة الخصوصية
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">الدعم والمساعدة</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                تواصل معنا
              </Link>
              <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                مركز المساعدة
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                الأسئلة الشائعة
              </Link>
              <Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                نصائح الأمان
              </Link>
              <Link to="/report" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                الإبلاغ عن مشكلة
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>01006371321</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@yallasakn.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>أسيوط، مصر</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">اشترك في النشرة الإخبارية</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  name="newsletter"
                  aria-label="البريد الإلكتروني للاشتراك"
                  placeholder="بريدك الإلكتروني"
                  className="text-right text-sm"
                />
                <Button size="sm">اشتراك</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} يلا سكن. جميع الحقوق محفوظة.</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-primary transition-colors">
              الشروط والأحكام
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              الخصوصية
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              ملفات تعريف الارتباط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
