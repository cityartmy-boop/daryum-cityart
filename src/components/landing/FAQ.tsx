import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "هل يمكنني تجربة المنصة قبل الدفع؟",
      answer: "نعم، نوفر 14 يوم تجربة مجانية كاملة بدون الحاجة لإدخال بيانات بطاقة ائتمانية. يمكنك استكشاف جميع ميزات المنصة خلال هذه الفترة."
    },
    {
      question: "هل تدعم المنصة ضريبة القيمة المضافة السعودية؟",
      answer: "بالتأكيد، المنصة متوافقة 100% مع أنظمة ضريبة القيمة المضافة في السعودية. يمكنك إصدار فواتير ضريبية وتقارير مالية متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك."
    },
    {
      question: "كيف يتم التكامل مع منصات الحجز مثل Airbnb وBooking.com؟",
      answer: "التكامل تلقائي وسهل. بمجرد ربط حسابك على المنصات، يتم مزامنة الحجوزات والأسعار والتوافر بشكل فوري. لا حاجة لتحديثات يدوية."
    },
    {
      question: "هل يوجد دعم فني باللغة العربية؟",
      answer: "نعم، فريق الدعم الفني متاح باللغة العربية عبر الدردشة المباشرة والبريد الإلكتروني والهاتف. نحن هنا لمساعدتك في أي وقت."
    },
    {
      question: "هل يمكنني تغيير الباقة لاحقًا؟",
      answer: "بالطبع، يمكنك الترقية أو التخفيض بين الباقات في أي وقت حسب احتياجاتك. سيتم احتساب الفرق بشكل تلقائي."
    },
    {
      question: "هل بياناتي آمنة؟",
      answer: "أمان بياناتك أولويتنا. نستخدم تشفير SSL والتخزين السحابي الآمن. جميع البيانات محفوظة على خوادم معتمدة مع نسخ احتياطي يومي."
    },
    {
      question: "هل يوجد تطبيق جوال؟",
      answer: "نعم، يتوفر تطبيق داريوم لأجهزة iOS وAndroid. يمكنك إدارة عقاراتك ومتابعة الحجوزات والرد على الرسائل من هاتفك الذكي."
    },
    {
      question: "ماذا يحدث بعد انتهاء التجربة المجانية؟",
      answer: "بعد انتهاء الـ14 يوم، يمكنك اختيار الباقة المناسبة والاستمرار، أو إلغاء الحساب دون أي التزامات مالية. لن نقوم بالخصم التلقائي."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            الأسئلة <span className="text-gradient">الشائعة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            إجابات على أكثر الأسئلة شيوعًا حول داريوم
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass rounded-2xl px-6 border-none animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-right text-lg font-bold hover:no-underline py-6">
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