import Image from "next/image";

export function Partners() {
  const partners = [
    // Global OTAs
    { 
      name: "Airbnb", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
      width: 120,
      height: 40
    },
    { 
      name: "Booking.com", 
      logo: "https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png",
      width: 140,
      height: 30
    },
    { 
      name: "Expedia", 
      logo: "https://www.expedia.com/_dms/header/logo.svg",
      width: 120,
      height: 30
    },
    { 
      name: "Agoda", 
      logo: "https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg",
      width: 100,
      height: 30
    },
    { 
      name: "Vrbo", 
      logo: "https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.18/images/vrbo/logos/vrbo-logo-dark.svg",
      width: 80,
      height: 30
    },
    { 
      name: "Hotels.com", 
      logo: "https://a.travel-assets.com/globalcontrols-service/content/f285fb631b0a976202ef57611c7050e9ef5ca51a/images/EG_Wordmark_blue_RGB.svg",
      width: 110,
      height: 30
    },
    
    // Saudi Local Platforms
    { 
      name: "Almatar", 
      logo: "https://www.almatar.com/static/version1736247972/frontend/Almatar/default/ar_SA/images/logo.svg",
      width: 100,
      height: 35
    },
    { 
      name: "Almosafer", 
      logo: "https://cdn.almosafer.com/assets/logo-ar.svg",
      width: 100,
      height: 35
    },
    
    // Payment Gateways
    { 
      name: "Mada", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Mada_Logo.svg/2560px-Mada_Logo.svg.png",
      width: 80,
      height: 30
    },
    { 
      name: "Visa", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
      width: 60,
      height: 25
    },
    { 
      name: "Mastercard", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
      width: 50,
      height: 30
    },
    { 
      name: "Apple Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
      width: 50,
      height: 30
    },
  ];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            متكامل مع أشهر منصات الحجز والدفع
          </h3>
          <p className="text-muted-foreground">
            اتصال سلس مع جميع القنوات العالمية والسعودية
          </p>
        </div>

        {/* Unified Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 animate-fade-in-up border border-border/50 hover:border-primary/30"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-16 w-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100 max-h-full w-auto"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const text = document.createElement('span');
                      text.textContent = partner.name;
                      text.className = 'text-sm font-bold text-foreground';
                      parent.appendChild(text);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            وأكثر من 20+ منصة أخرى
          </p>
        </div>
      </div>
    </section>
  );
}