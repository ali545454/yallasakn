import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      details: ['01234567890', '01234567891'],
      description: 'متاح 24/7 للدعم العاجل'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@studentshousing.com', 'support@studentshousing.com'],
      description: 'سنرد خلال 24 ساعة'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['شارع الجامعة، أسيوط', 'محافظة أسيوط، مصر'],
      description: 'مكتبنا الرئيسي'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: ['السبت - الخميس: 9:00 - 18:00', 'الجمعة: مغلق'],
      description: 'نستقبل الزوار حسب الموعد'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نحن هنا لمساعدتك في العثور على السكن المثالي. تواصل معنا عبر أي من الطرق التالية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">إرسال رسالة</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-right"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="text-right"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="text-right"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">موضوع الرسالة</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر موضوع الرسالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">استفسار عام</SelectItem>
                        <SelectItem value="booking">مشكلة في الحجز</SelectItem>
                        <SelectItem value="property">مشكلة في العقار</SelectItem>
                        <SelectItem value="payment">مشكلة في الدفع</SelectItem>
                        <SelectItem value="technical">مشكلة تقنية</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="min-h-[150px] text-right resize-none"
                      placeholder="اكتب رسالتك هنا..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-base">
                    <Send className="h-5 w-5 ml-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-right">
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-muted-foreground">{detail}</p>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>خريطة الموقع</p>
                      <p className="text-sm">شارع الجامعة، أسيوط</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;