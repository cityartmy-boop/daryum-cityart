import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "ما هي داريوم؟",
      answer: "داريوم منصة سعودية متكاملة لإدارة العقارات المؤجرة. نوفر حلاً شاملاً يجمع الحجوزات، التنظيف، الصيانة، التقارير المالية، وتقارير الملاك في مكان واحد."
    },
    {
      question: "هل تتكامل داريوم مع منصات الحجز العالمية؟",
      answer: "نعم! داريوم تتكامل مباشرة مع Airbnb وBooking.com وAgoda وVrbo وExpedia وHotels.com وغيرها. المزامنة فورية للحجوزات والأسعار والتقويمات."
    },
    {
      question: "كم تكلفة الاشتراك؟",
      answer: "لدينا 4 باقات تبدأ من 99 ريال شهرياً للباقة الأساسية حتى باقة المؤسسات. جميع الباقات تشمل تجربة مجانية 14 يوم بدون بطاقة ائتمان."
    },
    {
      question: "هل يمكنني إدارة عدة عقارات؟",
      answer: "بالتأكيد! داريوم مصممة لإدارة محافظ عقارية كاملة. يمكنك إدارة من عقار واحد إلى مئات العقارات من لوحة تحكم واحدة."
    },
    {
      question: "هل البيانات آمنة؟",
      answer: "نعم، أمان بياناتك أولويتنا القصوى. نستخدم تشفير SSL وننفذ نسخ احتياطي يومي. جميع بياناتك محمية وفق معايير الأمان العالمية."
    },
    {
      question: "هل يمكنني تجربة المنصة قبل الاشتراك؟",
      answer: "نعم! نوفر تجربة مجانية 14 يوم كاملة لجميع الميزات بدون الحاجة لبطاقة ائتمان. يمكنك الإلغاء في أي وقت."
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-primary font-bold text-sm tracking-wider">الأسئلة الشائعة</span>
          <h2 className="text-4xl font-black mt-4 mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-muted-foreground">
            إجابات سريعة على الأسئلة الأكثر شيوعاً
          </p>
        </div>

        <div className="glass rounded-3xl p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50 last:border-0">
                <AccordionTrigger className="text-right text-lg font-bold hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}