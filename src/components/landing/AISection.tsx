import { Sparkles, Brain, TrendingUp } from "lucide-react";

export function AISection() {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden group border border-primary/20 hover:border-primary/50 transition-colors duration-500 animate-fade-in-up">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Text Content */}
              <div className="flex-1 text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-primary text-white font-medium text-xs mb-4 shadow-lg">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  مدعوم بالذكاء الاصطناعي
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">
                  <span className="text-foreground">مساعدك الذكي</span>
                  <br />
                  <span className="text-gradient">لتحقيق أقصى إيراد</span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                  يحلل النظام آلاف البيانات يومياً ليقدم لك توصيات تسعير ديناميكية، ويكتشف فجوات الإشغال، ويقترح ردوداً ذكية على ضيوفك تلقائياً.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-background/80 rounded-lg px-4 py-2 text-sm font-bold shadow-sm border border-border/50 hover:-translate-y-1 transition-transform">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span>+15% زيادة متوقعة</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/80 rounded-lg px-4 py-2 text-sm font-bold shadow-sm border border-border/50 hover:-translate-y-1 transition-transform">
                    <Brain className="w-4 h-4 text-primary" />
                    <span>يتعلم من أنماط عملك</span>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex-shrink-0 w-full md:w-1/3 relative">
                <div className="aspect-square max-w-[240px] mx-auto relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
                  
                  {/* Central Brain Icon with rings */}
                  <div className="relative w-32 h-32 rounded-full glass-dark flex items-center justify-center z-10 border border-primary/30 shadow-[0_0_40px_rgba(var(--primary),0.3)]">
                    <Brain className="w-14 h-14 text-primary animate-bounce" />
                    
                    {/* Orbiting Elements */}
                    <div className="absolute w-full h-full rounded-full border border-primary/20 animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute w-[140%] h-[140%] rounded-full border border-dashed border-accent/40 animate-[spin_8s_linear_infinite_reverse]"></div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}