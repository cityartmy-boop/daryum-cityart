import Link from "next/link";
import Image from "next/image";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const navigation = {
    product: [
      { name: "المزايا", nameEn: "Features", href: "#features" },
      { name: "الأسعار", nameEn: "Pricing", href: "#pricing" },
      { name: "التكاملات", nameEn: "Integrations", href: "#integrations" },
      { name: "التحديثات", nameEn: "Updates", href: "#updates" },
    ],
    company: [
      { name: "من نحن", nameEn: "About", href: "#about" },
      { name: "مدونة", nameEn: "Blog", href: "#blog" },
      { name: "وظائف", nameEn: "Careers", href: "#careers" },
      { name: "تواصل معنا", nameEn: "Contact", href: "#contact" },
    ],
    resources: [
      { name: "مركز المساعدة", nameEn: "Help Center", href: "#help" },
      { name: "الوثائق", nameEn: "Documentation", href: "#docs" },
      { name: "واجهة برمجية", nameEn: "API", href: "#api" },
      { name: "حالات عملية", nameEn: "Case Studies", href: "#cases" },
    ],
    legal: [
      { name: "الخصوصية", nameEn: "Privacy", href: "#privacy" },
      { name: "الشروط", nameEn: "Terms", href: "#terms" },
      { name: "الأمان", nameEn: "Security", href: "#security" },
    ],
  };
  
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/daryum-logo.png" 
                alt="داريوم" 
                width={140}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              نظام تشغيل متكامل لإدارة العقارات المؤجرة في السعودية. مزامنة فورية، تحليلات ذكية، وعمليات سلسة.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span dir="ltr">info@proptech.sa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 11 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="font-display text-lg mb-4">المنتج</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/70 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-display text-lg mb-4">الشركة</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/70 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-display text-lg mb-4">الموارد</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/70 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-display text-lg mb-4">قانوني</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/70 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2026 PropTech. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <button className="hover:text-white transition-colors">العربية</button>
              <span>|</span>
              <button className="hover:text-white transition-colors">English</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}