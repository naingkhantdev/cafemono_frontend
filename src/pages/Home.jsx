import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const bestsellers = [
  { name: 'Caramel Latte', price: '฿120', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
  { name: 'Espresso', price: '฿90', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop' },
  { name: 'Cold Brew', price: '฿130', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop' },
  { name: 'Matcha Latte', price: '฿125', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop' },
  { name: 'Cappuccino', price: '฿110', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop' },
  { name: 'Iced Mocha', price: '฿130', image: 'https://images.unsplash.com/photo-1548122850-eb5f2c4ca29c?w=400&auto=format&fit=crop' },
]

export default function Home() {
  return (
    <div className="bg-cream min-h-screen">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-12">
        <div className="bg-cream-dark rounded-3xl overflow-hidden flex flex-row min-h-[340px]">
          {/* Left */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h1 className="font-serif text-4xl font-bold text-cafe-black leading-tight mb-3">
              The best coffee<br />starts here
            </h1>
            <p className="text-cafe-black/60 text-sm leading-relaxed mb-8 max-w-xs">
              We brew each cup with care and intention, sourcing beans from roasters
              who share our passion. Come experience the difference that quality and
              craft can make.
            </p>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/order"
                  className="px-7 py-2.5 bg-brown text-white rounded-full font-semibold text-sm hover:bg-brown-dark transition-all"
                >
                  Order
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/menu"
                  className="px-7 py-2.5 border-2 border-brown text-brown rounded-full font-semibold text-sm hover:bg-brown hover:text-white transition-all"
                >
                  Explore
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right — image */}
          <div className="flex-1 min-h-[340px]">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop"
              alt="Cafe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-cafe-black">Our Menu</h2>
          <Link to="/menu" className="text-brown text-sm font-semibold hover:underline">
            view all &gt;
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {bestsellers.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(123,59,42,0.15)' }}
              className="bg-cream-light rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: '0 2px 8px rgba(123,59,42,0.08)' }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold text-cafe-black text-sm">{item.name}</p>
                <p className="text-brown text-sm font-bold mt-0.5">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}