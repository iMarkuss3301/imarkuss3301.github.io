import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Star, Menu, X, ArrowRight, Phone, Instagram, Facebook } from 'lucide-react';
import logoImage from './assets/logo.png';
import lycheeJasmineImage from './assets/drinks/lychee-jasmine.png';
import limeButterflyPeaImage from './assets/drinks/lime-butterflypea.png';
import peachLemongrassOrangeImage from './assets/drinks/peach-lemongrass-orange.png';
import passionfruitImage from './assets/drinks/passionfruit.png';
import limeJasmineImage from './assets/drinks/lime-jasmine.png';

type Language = 'en' | 'pl' | 'vi';
const FALLING_LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${(i * 6.7) % 100}%`,
  delay: `${(i * 0.8) % 7}s`,
  duration: `${12 + (i % 6) * 1.5}s`,
  size: `${14 + (i % 5) * 4}px`,
}));

/** Real venue: Google Maps place + Wolt / social listings (verify hours by phone or Maps before visiting). */
const STORE = {
  name: 'Little Saigon',
  fullName: 'Little Saigon – Tea, Coffee & Asian Market',
  area: 'Warsaw · Mokotów',
  addressLines: ['Białej Floty 4', '02-654 Warszawa', 'Poland'] as const,
  phoneDisplay: '+48 22 668 24 24',
  phoneTel: '+48226682424',
  email: 'littlesaigonwaw@gmail.com',
  /** Confirmed from the provided Google Maps screenshot. */
  hours: [
    { label: 'Monday', value: '9:00 AM – 10:00 PM' },
    { label: 'Tuesday', value: '9:00 AM – 10:00 PM' },
    { label: 'Wednesday', value: '9:00 AM – 10:00 PM' },
    { label: 'Thursday', value: '9:00 AM – 10:00 PM' },
    { label: 'Friday', value: '9:00 AM – 10:00 PM' },
    { label: 'Saturday', value: '9:00 AM – 10:00 PM' },
    { label: 'Sunday', value: '9:00 AM – 10:00 PM' },
  ] as const,
  mapsUrl:
    'https://www.google.com/maps/place/Little+Saigon+-+Tea,+Coffee+%26+Asian+Market/@52.1956205,20.9837706,19.58z/data=!4m6!3m5!1s0x47193383d0e71979:0x2bd755bf7adaf9fc!8m2!3d52.195425!4d20.9837161!16s%2Fg%2F11srtbjd0m',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=52.195425,20.9837161&z=17&hl=en&output=embed',
  facebookUrl: 'https://www.facebook.com/littlesaigonsklep/',
  instagramUrl: 'https://www.instagram.com/littlesaigon.war/',
};

const BEST_SELLERS = [
  {
    id: 1,
    name: "Liczi + herbata jaśminowa",
    category: "Tropical Fruit Tea",
    price: "New lineup - March 16",
    image: lycheeJasmineImage
  },
  {
    id: 2,
    name: "Limonka + butterfly pea tea",
    category: "Tropical Fruit Tea",
    price: "New lineup - March 16",
    image: limeButterflyPeaImage
  },
  {
    id: 3,
    name: "Brzoskwinia + trawa cytrynowa + pomarańcza",
    category: "Tropical Fruit Tea",
    price: "New lineup - March 16",
    image: peachLemongrassOrangeImage
  },
  {
    id: 4,
    name: "Marakuja",
    category: "Tropical Fruit Tea",
    price: "New lineup - March 16",
    image: passionfruitImage
  },
  {
    id: 5,
    name: "Limonka + herbata jaśminowa",
    category: "Tropical Fruit Tea",
    price: "New lineup - March 16",
    image: limeJasmineImage
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Anna K.",
    text: "Świetny wybór przekąsek i makaronów. Bardzo miła obsługa i fajny klimat.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael R.",
    text: "Great selection of Asian groceries and drinks. Clean store and easy to find what you need.",
    rating: 5
  },
  {
    id: 3,
    name: "Kasia W.",
    text: "Dużo produktów koreańskich i japońskich, ceny OK. Wracam regularnie po herbaty.",
    rating: 5
  },
  {
    id: 4,
    name: "Daniel P.",
    text: "Friendly team, good prices, and a lot of unique sauces and noodles.",
    rating: 5
  },
  {
    id: 5,
    name: "Ola M.",
    text: "Bardzo wygodna lokalizacja na Mokotowie. Duży plus za świeże dostawy.",
    rating: 5
  },
  {
    id: 6,
    name: "Chris T.",
    text: "A perfect place for quick Asian grocery shopping after work.",
    rating: 5
  }
];

const UI_TEXT: Record<
  Language,
  {
    languageLabel: string;
    navHome: string;
    navBestSellers: string;
    navReviews: string;
    navVisit: string;
    locationBadge: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroDescription: string;
    ctaDirections: string;
    ctaBestSellers: string;
    bestSellersTitle: string;
    bestSellersSubtitle: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    visitTitle: string;
    locationTitle: string;
    openingHoursTitle: string;
    contactTitle: string;
    mapButton: string;
    quickLinks: string;
    followUs: string;
    footerDescription: string;
    footerRights: string;
  }
> = {
  en: {
    languageLabel: 'Language',
    navHome: 'Home',
    navBestSellers: 'Best Sellers',
    navReviews: 'Reviews',
    navVisit: 'Visit Us',
    locationBadge: 'Warsaw · Mokotow',
    heroTitleLine1: 'Authentic flavors,',
    heroTitleLine2: 'right around the corner.',
    heroDescription:
      'Little Saigon - Tea, Coffee and Asian Market: specialty teas and coffees, Asian groceries, snacks, ingredients, and quick bites.',
    ctaDirections: 'Get Directions',
    ctaBestSellers: 'View Best Sellers',
    bestSellersTitle: 'Our Best Sellers',
    bestSellersSubtitle: 'Tropical Fruit Tea lineup added on March 16.',
    reviewsTitle: 'What Our Customers Say',
    reviewsSubtitle: "Don't just take our word for it.",
    visitTitle: 'Come Visit Us',
    locationTitle: 'Location',
    openingHoursTitle: 'Opening Hours',
    contactTitle: 'Contact',
    mapButton: 'Open in Google Maps',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    footerDescription: 'Little Saigon in Warsaw - teas, coffees, groceries, and flavors from across Asia.',
    footerRights: 'All rights reserved.',
  },
  pl: {
    languageLabel: 'Język',
    navHome: 'Start',
    navBestSellers: 'Bestsellery',
    navReviews: 'Opinie',
    navVisit: 'Odwiedź nas',
    locationBadge: 'Warszawa · Mokotów',
    heroTitleLine1: 'Autentyczne smaki,',
    heroTitleLine2: 'tuż za rogiem.',
    heroDescription:
      'Little Saigon - Tea, Coffee & Asian Market: herbaty, kawy, azjatyckie produkty spożywcze, przekąski i szybkie przekąski.',
    ctaDirections: 'Wskazówki dojazdu',
    ctaBestSellers: 'Zobacz bestsellery',
    bestSellersTitle: 'Nasze bestsellery',
    bestSellersSubtitle: 'Linia Tropical Fruit Tea dodana 16 marca.',
    reviewsTitle: 'Opinie klientów',
    reviewsSubtitle: 'Sprawdź, co mówią nasi klienci.',
    visitTitle: 'Odwiedź nas',
    locationTitle: 'Lokalizacja',
    openingHoursTitle: 'Godziny otwarcia',
    contactTitle: 'Kontakt',
    mapButton: 'Otwórz w Google Maps',
    quickLinks: 'Szybkie linki',
    followUs: 'Obserwuj nas',
    footerDescription: 'Little Saigon w Warszawie - herbaty, kawy, produkty spożywcze i smaki z całej Azji.',
    footerRights: 'Wszelkie prawa zastrzeżone.',
  },
  vi: {
    languageLabel: 'Ngon ngu',
    navHome: 'Trang chu',
    navBestSellers: 'Ban chay',
    navReviews: 'Danh gia',
    navVisit: 'Ghe tham',
    locationBadge: 'Cửa hàng thực phẩm châu Á',
    heroTitleLine1: 'Huong vi chinh goc,',
    heroTitleLine2: 'ngay gan ban.',
    heroDescription:
      'Little Saigon - Tea, Coffee & Asian Market: tra, ca phe, thuc pham chau A, do an vat va mon an nhanh.',
    ctaDirections: 'Chi duong',
    ctaBestSellers: 'Xem mon ban chay',
    bestSellersTitle: 'Mon ban chay',
    bestSellersSubtitle: 'Bo suu tap Tropical Fruit Tea them ngay 16 thang 3.',
    reviewsTitle: 'Khach hang noi gi',
    reviewsSubtitle: 'Hay xem danh gia tu khach hang.',
    visitTitle: 'Ghe tham cua hang',
    locationTitle: 'Dia chi',
    openingHoursTitle: 'Gio mo cua',
    contactTitle: 'Lien he',
    mapButton: 'Mo Google Maps',
    quickLinks: 'Lien ket nhanh',
    followUs: 'Theo doi chung toi',
    footerDescription: 'Little Saigon tai Warsaw - tra, ca phe, tap hoa va huong vi chau A.',
    footerRights: 'Bao luu moi quyen.',
  },
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const t = UI_TEXT[language];

  return (
    <div className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green-dark selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt={`${STORE.name} logo`} className="w-10 h-10 rounded-full object-cover border border-brand-green/50" />
              <span className="font-display font-bold text-2xl tracking-tight text-brand-green-dark">{STORE.name}</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium hover:text-brand-green-dark transition-colors">{t.navHome}</a>
              <a href="#best-sellers" className="text-sm font-medium hover:text-brand-green-dark transition-colors">{t.navBestSellers}</a>
              <a href="#reviews" className="text-sm font-medium hover:text-brand-green-dark transition-colors">{t.navReviews}</a>
              <a href="#visit" className="text-sm font-medium hover:text-brand-green-dark transition-colors">{t.navVisit}</a>
              <label className="text-xs text-gray-500">{t.languageLabel}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-white"
                aria-label={t.languageLabel}
              >
                <option value="en">English</option>
                <option value="pl">Polski</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4">
            <a href="#home" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.navHome}</a>
            <a href="#best-sellers" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.navBestSellers}</a>
            <a href="#reviews" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.navReviews}</a>
            <a href="#visit" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.navVisit}</a>
            <div className="pt-2">
              <label className="block text-xs text-gray-500 mb-1">{t.languageLabel}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white"
                aria-label={t.languageLabel}
              >
                <option value="en">English</option>
                <option value="pl">Polski</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="leaf-fall-layer" aria-hidden="true">
            {FALLING_LEAVES.map((leaf) => (
              <span
                key={leaf.id}
                className="leaf-fall"
                style={
                  {
                    left: leaf.left,
                    animationDelay: leaf.delay,
                    animationDuration: leaf.duration,
                    width: leaf.size,
                    height: leaf.size,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-brand-green/30 mix-blend-multiply z-10" />
            <img 
              src="https://images.unsplash.com/photo-1605371924599-2d0365da26f5?auto=format&fit=crop&q=80&w=2000" 
              alt="Asian grocery store aisle" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-white via-brand-white/80 to-transparent z-20" />
          </div>

          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green text-brand-green-dark text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                <span>{t.locationBadge}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-brand-green-dark">
                {t.heroTitleLine1}<br />{t.heroTitleLine2}
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                {t.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#visit" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  {t.ctaDirections}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#best-sellers" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green text-brand-green-dark rounded-full font-medium hover:bg-[#cbf4d8] transition-colors">
                  {t.ctaBestSellers}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section id="best-sellers" className="py-24 bg-brand-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t.bestSellersTitle}</h2>
                <p className="text-gray-600 max-w-2xl">{t.bestSellersSubtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BEST_SELLERS.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-brand-black">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-brand-green-dark transition-colors">{product.name}</h3>
                  <p className="text-gray-600 font-medium">{product.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-24 bg-brand-green/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t.reviewsTitle}</h2>
              <p className="text-gray-700">{t.reviewsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {REVIEWS.map((review, index) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-brand-green"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-green-dark text-brand-green-dark" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{review.text}"</p>
                  <p className="font-bold text-brand-black">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Hours Section */}
        <section id="visit" className="py-24 bg-brand-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">{t.visitTitle}</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{t.locationTitle}</h3>
                      <p className="text-gray-600">
                        {STORE.addressLines.map((line) => (
                          <React.Fragment key={line}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-brand-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{t.openingHoursTitle}</h3>
                      <ul className="text-gray-600 space-y-1">
                        {STORE.hours.map((row) => (
                          <li key={row.label} className="flex justify-between gap-8 max-w-xs">
                            <span>{row.label}</span>
                            <span>{row.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-brand-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{t.contactTitle}</h3>
                      <p className="text-gray-600">
                        <a href={`tel:${STORE.phoneTel}`} className="hover:text-brand-green-dark transition-colors">
                          {STORE.phoneDisplay}
                        </a>
                        <br />
                        <a href={`mailto:${STORE.email}`} className="hover:text-brand-green-dark transition-colors">
                          {STORE.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-[500px] bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200"
              >
                <iframe
                  title={`${STORE.fullName} on Google Maps`}
                  src={STORE.mapsEmbedSrc}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={STORE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-medium text-brand-green-dark shadow-lg border border-gray-100 hover:bg-brand-green transition-colors"
                >
                  {t.mapButton}
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImage} alt={`${STORE.name} logo`} className="w-8 h-8 rounded-full object-cover border border-brand-green/50" />
                <span className="font-display font-bold text-xl">{STORE.name}</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                {t.footerDescription}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t.quickLinks}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-brand-green transition-colors">{t.navHome}</a></li>
                <li><a href="#best-sellers" className="hover:text-brand-green transition-colors">{t.navBestSellers}</a></li>
                <li><a href="#reviews" className="hover:text-brand-green transition-colors">{t.navReviews}</a></li>
                <li><a href="#visit" className="hover:text-brand-green transition-colors">{t.navVisit}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">{t.followUs}</h4>
              <div className="flex gap-4">
                <a
                  href={STORE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green hover:text-brand-black transition-colors"
                  aria-label="Little Saigon on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={STORE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green hover:text-brand-black transition-colors"
                  aria-label="Little Saigon on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${STORE.phoneTel}`}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green hover:text-brand-black transition-colors"
                  aria-label={`Call ${STORE.phoneDisplay}`}
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Little Saigon Store. {t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
