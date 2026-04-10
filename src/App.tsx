import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Star, ShoppingBag, Menu, X, ArrowRight, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const BEST_SELLERS = [
  {
    id: 1,
    name: "Spicy Tonkotsu Ramen Kit",
    category: "Ramen",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Premium Matcha Powder",
    category: "Drinks",
    price: "$24.50",
    image: "https://images.unsplash.com/photo-1582787031315-188b0a9f539c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Gochujang Paste (Authentic)",
    category: "Ingredients",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1585032841411-9273b1855a8f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Assorted Mochi Box",
    category: "Snacks",
    price: "$15.00",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800"
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The best selection of Korean snacks in town! I always find my favorite ramen brands here. The staff is incredibly helpful.",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    text: "Little Saigon is a hidden gem. Their fresh ingredients section is always stocked, and the matcha quality is top tier.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    text: "Love the atmosphere and the variety. It's so clean and organized. My go-to spot for weekend cooking supplies!",
    rating: 5
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green-dark selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-brand-green-dark" />
              <span className="font-display font-bold text-2xl tracking-tight">Little Saigon</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium hover:text-brand-green-dark transition-colors">Home</a>
              <a href="#best-sellers" className="text-sm font-medium hover:text-brand-green-dark transition-colors">Best Sellers</a>
              <a href="#reviews" className="text-sm font-medium hover:text-brand-green-dark transition-colors">Reviews</a>
              <a href="#visit" className="text-sm font-medium hover:text-brand-green-dark transition-colors">Visit Us</a>
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
            <a href="#home" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#best-sellers" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</a>
            <a href="#reviews" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
            <a href="#visit" className="block text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>Visit Us</a>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
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
                <span>Your local Asian market</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                Authentic flavors,<br />right around the corner.
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Discover a world of taste at Little Saigon. From specialty ramen and fresh ingredients to unique Japanese and Korean snacks.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#visit" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#best-sellers" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green text-brand-green-dark rounded-full font-medium hover:bg-[#cbf4d8] transition-colors">
                  View Best Sellers
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Best Sellers</h2>
                <p className="text-gray-600 max-w-2xl">Hand-picked favorites loved by our community. Stock up on these essentials.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
              <p className="text-gray-700">Don't just take our word for it.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Come Visit Us</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Location</h3>
                      <p className="text-gray-600">123 Market Street<br />Downtown District<br />Cityville, ST 12345</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-brand-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Opening Hours</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li className="flex justify-between w-48"><span>Mon - Fri:</span> <span>9:00 AM - 8:00 PM</span></li>
                        <li className="flex justify-between w-48"><span>Saturday:</span> <span>10:00 AM - 9:00 PM</span></li>
                        <li className="flex justify-between w-48"><span>Sunday:</span> <span>10:00 AM - 6:00 PM</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-brand-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Contact</h3>
                      <p className="text-gray-600">(555) 123-4567<br />hello@littlesaigon.com</p>
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
                {/* Map Placeholder - In a real app, use Google Maps iframe or similar */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-50 grayscale" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-xs">
                    <MapPin className="w-10 h-10 text-brand-green-dark mx-auto mb-3" />
                    <h4 className="font-bold text-lg mb-1">Little Saigon</h4>
                    <p className="text-sm text-gray-500">123 Market Street</p>
                    <a href="#" className="inline-block mt-4 text-sm font-medium text-brand-green-dark hover:underline">Open in Maps</a>
                  </div>
                </div>
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
                <ShoppingBag className="w-6 h-6 text-brand-green" />
                <span className="font-display font-bold text-xl">Little Saigon</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Your premier destination for authentic Asian groceries, special ramen, and unique ingredients.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-brand-green transition-colors">Home</a></li>
                <li><a href="#best-sellers" className="hover:text-brand-green transition-colors">Best Sellers</a></li>
                <li><a href="#reviews" className="hover:text-brand-green transition-colors">Reviews</a></li>
                <li><a href="#visit" className="hover:text-brand-green transition-colors">Visit Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green hover:text-brand-black transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green hover:text-brand-black transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green hover:text-brand-black transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Little Saigon Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
