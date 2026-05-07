import Image from "next/image";

export function Partners() {
  const partners = [
    // Global Booking Platforms
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
    { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" },
    { name: "Expedia", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Expedia_2012_logo.svg" },
    { name: "Agoda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.svg" },
    { name: "Vrbo", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Vrbo_logo.svg" },
    { name: "Hotels.com", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Hotels.com_logo.svg" },
    
    // Saudi Local Platforms
    { name: "Almatar", logo: "https://www.almatar.com/images/logo.svg" },
    { name: "Almosafer", logo: "https://www.almosafer.com/images/logo.svg" },
  ];

  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4 hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            تكاملات متقدمة
          </div>
          <h2 className="text-3xl lg:text-4xl font-black mb-4 text-foreground">
            متكامل مع أشهر منصات الحجز
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مزامنة تلقائية فورية مع جميع قنوات الحجز العالمية والسعودية
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-border/50 hover:border-primary/30 flex items-center justify-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full h-16 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="flex items-center justify-center h-full font-bold text-foreground">${partner.name}</div>`;
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <p className="text-muted-foreground text-lg">
            وأكثر من <span className="text-primary font-bold">20+ منصة</span> أخرى
          </p>
        </div>
      </div>
    </section>
  );
}