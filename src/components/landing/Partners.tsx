import Image from "next/image";

export function Partners() {
  const partners = [
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
    { name: "Booking.com", logo: "https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png" },
    { name: "Agoda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png" },
    { name: "Vrbo", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Vrbo_logo.svg" },
    { name: "Expedia", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Expedia_2012_logo.svg" },
    { name: "Hotels.com", logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Hotels.com_logo.svg" },
  ];

  const saudiPlatforms = [
    { name: "المطار", color: "from-blue-600 to-blue-800" },
    { name: "المسافر", color: "from-emerald-600 to-emerald-800" },
    { name: "رحلات", color: "from-purple-600 to-purple-800" },
    { name: "وِجهات", color: "from-orange-600 to-orange-800" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-muted-foreground">
            متكامل مع أشهر منصات الحجز العالمية والسعودية
          </h3>
        </div>

        {/* Global Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="relative h-12 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
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

        {/* Saudi Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {saudiPlatforms.map((platform, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className={`w-full h-16 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <span className="text-white font-black text-xl">{platform.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}