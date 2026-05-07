import Image from "next/image";

export function Partners() {
  const globalPartners = [
    { 
      name: "Airbnb", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      bgColor: "bg-white"
    },
    { 
      name: "Booking.com", 
      logo: "https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png",
      bgColor: "bg-white"
    },
    { 
      name: "Agoda", 
      logo: "https://logos-world.net/wp-content/uploads/2022/04/Agoda-Logo.png",
      bgColor: "bg-white"
    },
    { 
      name: "Vrbo", 
      logo: "https://logos-world.net/wp-content/uploads/2022/04/Vrbo-Logo.png",
      bgColor: "bg-white"
    },
    { 
      name: "Expedia", 
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Expedia-Logo.png",
      bgColor: "bg-white"
    },
    { 
      name: "Hotels.com", 
      logo: "https://logos-world.net/wp-content/uploads/2022/05/Hotelscom-Logo.png",
      bgColor: "bg-white"
    },
  ];

  const saudiPartners = [
    {
      name: "المطار",
      logo: "https://www.almatar.com/static/version1736247972/frontend/Almatar/default/ar_SA/images/logo.svg",
      bgColor: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    {
      name: "المسافر",
      logo: "https://cdn.almosafer.com/assets/logo-ar.svg",
      bgColor: "bg-gradient-to-br from-emerald-600 to-emerald-800"
    },
    {
      name: "رحلات",
      logo: "https://wego.com/assets/web-client/static/media/wego-logo-mobile.d0a94ed9.svg",
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-800"
    },
    {
      name: "Airbnb السعودية",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      bgColor: "bg-gradient-to-br from-orange-600 to-orange-800"
    },
  ];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-muted-foreground">
            متكامل مع أشهر منصات الحجز العالمية والسعودية
          </h3>
        </div>

        {/* Global Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {globalPartners.map((partner, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-16 w-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Saudi Platforms */}
        <div className="text-center mb-8">
          <h4 className="text-xl font-bold text-foreground">المنصات السعودية المحلية</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {saudiPartners.map((platform, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative h-20 w-full rounded-xl ${platform.bgColor} p-4 group-hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center overflow-hidden`}>
                {platform.logo ? (
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-white font-black text-xl">{platform.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}