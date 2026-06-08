import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import { FadeUp, FadeLeft, ScaleIn } from '../components/ui/AnimatedSection'

const fallback = [
  { id: 1, name: 'Caramel Latte', base_price: 120, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
  { id: 2, name: 'Espresso', base_price: 90, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop' },
  { id: 3, name: 'Cold Brew', base_price: 130, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop' },
  { id: 4, name: 'Matcha Latte', base_price: 125, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop' },
  { id: 5, name: 'Cappuccino', base_price: 110, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop' },
  { id: 6, name: 'Iced Mocha', base_price: 130, image: 'https://images.unsplash.com/photo-1548122850-eb5f2c4ca29c?w=400&auto=format&fit=crop' },
]

export default function Home() {
  const [products, setProducts] = useState(fallback)

  useEffect(() => {
    api.get('/products')
      .then((res) => {
        const data = res.data?.data
        if (data?.length > 0) setProducts(data)
      })
      .catch(() => { }) // silently use fallback
  }, [])

  return (
    <div className="bg-cream overflow-hidden">

      {/* HERO SECTION - REFINED */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeLeft>
                <span className="text-cafe-gold font-semibold tracking-[0.4em] uppercase text-xs mb-6 block">Premium Coffee Roasters</span>
                <h1 className="font-serif text-6xl md:text-8xl font-bold text-cafe-black leading-[1.1] mb-8">
                    Elevate <br />
                    Your <span className="text-cafe-gold italic">Ritual</span>
                </h1>
                <p className="text-cafe-black/60 text-lg leading-relaxed max-w-md mb-10">
                    Experience the pinnacle of coffee craftsmanship. We source, roast, 
                    and brew with an obsession for quality that you can taste in every drop.
                </p>
                <div className="flex gap-4">
                    <Link to="/order" className="px-10 py-4 bg-brown text-white rounded-full font-bold text-sm hover:bg-brown-dark transition-all shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1">
                        Order Now
                    </Link>
                    <Link to="/menu" className="px-10 py-4 border-2 border-brown text-brown rounded-full font-bold text-sm hover:bg-brown hover:text-white transition-all hover:-translate-y-1">
                        View Menu
                    </Link>
                </div>
            </FadeLeft>

            <div className="relative">
                <ScaleIn>
                    <div className="relative rounded-[60px] overflow-hidden shadow-warm-2xl border-8 border-white">
                        <img 
                            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop" 
                            alt="Cafe Atmosphere" 
                            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/40 to-transparent" />
                    </div>
                </ScaleIn>
                
                {/* Floating Elements */}
                <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 hidden xl:block bg-white p-6 rounded-3xl shadow-warm-xl"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cafe-gold rounded-full flex items-center justify-center text-white text-xl">☕</div>
                        <div>
                            <p className="text-xs font-bold text-cafe-black/40 uppercase tracking-widest">Freshly Roasted</p>
                            <p className="text-sm font-bold text-cafe-black">Arrived Today</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* CURATED SELECTION */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <FadeUp className="flex items-end justify-between mb-16">
          <div>
            <span className="text-cafe-gold font-semibold tracking-[0.3em] uppercase text-[10px] mb-3 block">Selected for you</span>
            <h2 className="font-serif text-5xl font-bold text-cafe-black">Curated Menu</h2>
          </div>
          <Link to="/menu" className="group flex items-center gap-3 text-brown font-bold uppercase tracking-widest text-xs">
            View full selection <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 6).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[40px] p-4 shadow-warm hover:shadow-warm-2xl transition-all duration-500"
            >
              <div className="relative rounded-[32px] overflow-hidden h-72 mb-6">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                    <p className="text-brown font-bold text-sm">฿{item.base_price}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-serif text-2xl font-bold text-cafe-black mb-2">{item.name}</h3>
                <p className="text-cafe-black/40 text-sm leading-relaxed mb-6">
                    Meticulously prepared using our signature house blend and organic milk.
                </p>
                <Link to="/order" className="w-full py-3 border border-cafe-black/5 rounded-2xl flex items-center justify-center gap-2 group-hover:bg-cafe-black group-hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
                    Add to order +
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}
