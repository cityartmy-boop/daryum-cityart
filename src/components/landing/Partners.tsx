import Image from "next/image";

export function Partners() {
  const partners = [
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" },
    { name: "Agoda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.svg" },
    { name: "Vrbo", logo: "https://upload.wikimedia.org/wikipedia/commons/4/49/Vrbo_logo.svg" },
    { name: "Expedia", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Expedia_2012_logo.svg" },
    { name: "Hotels.com", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Hotels.com_logo.svg" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-muted-foreground mb-2">
            متكامل مع أشهر منصات الحجز العالمية
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="glass rounded-xl p-6 flex items-center justify-center hover:scale-110 transition-transform animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full h-12 grayscale hover:grayscale-0 transition-all">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}