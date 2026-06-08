import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, FadeLeft, FadeRight, ScaleIn } from '../components/ui/AnimatedSection'

const contactInfo = [
    { icon: '📞', label: 'Inquiries', value: '+66 81 234 5678', detail: 'Available 24/7 for VIP guests' },
    { icon: '✉️', label: 'Email', value: 'hello@cafemono.com', detail: 'Typically responds within 1 hour' },
    { icon: '📍', label: 'Location', value: 'Siam Paragon, Bangkok', detail: 'The heart of coffee culture' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)
    const [focused, setFocused] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSent(false), 5000)
    }

    return (
        <div className="bg-cream overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center bg-cafe-black">
                <div className="absolute inset-0 bg-grain opacity-20" />
                <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop" 
                    alt="Cafe Interior" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-cafe-black/60 to-cafe-black" />

                <div className="relative z-10 text-center px-8">
                    <FadeUp>
                        <span className="text-cafe-gold font-semibold tracking-[0.4em] uppercase text-xs mb-6 block">Get in touch</span>
                        <h1 className="font-serif text-5xl md:text-8xl font-bold text-cream leading-tight mb-8">
                            Connected by <br />
                            <span className="text-cafe-gold italic">Excellence</span>
                        </h1>
                    </FadeUp>
                </div>
            </section>

            {/* MAIN INTERACTIVE SECTION */}
            <section className="max-w-7xl mx-auto px-8 -mt-24 pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* INFO TILES - DARK PREMIUM */}
                    <div className="lg:col-span-5 space-y-6">
                        {contactInfo.map((info, i) => (
                            <FadeLeft key={info.label} delay={i * 0.1}>
                                <motion.div 
                                    whileHover={{ 
                                        y: -10, 
                                        x: 5,
                                        backgroundColor: '#7B3B2A',
                                        transition: { duration: 0.4 }
                                    }}
                                    className="bg-white p-8 rounded-[32px] shadow-warm border border-transparent hover:border-cafe-gold/30 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-2xl shadow-inner group-hover:bg-cafe-gold group-hover:scale-110 transition-all duration-500">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-cafe-gold font-bold tracking-widest uppercase text-[10px] mb-1 group-hover:text-cafe-gold/80 transition-colors">
                                                {info.label}
                                            </p>
                                            <h3 className="text-cafe-black text-xl font-serif font-bold mb-1 group-hover:text-white transition-colors">
                                                {info.value}
                                            </h3>
                                            <p className="text-cafe-black/40 text-xs group-hover:text-cream/60 transition-colors">
                                                {info.detail}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeLeft>
                        ))}

                        <FadeLeft delay={0.3}>
                            <div className="bg-cafe-black rounded-[40px] p-10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-grain opacity-20" />
                                <div className="relative z-10">
                                    <h3 className="font-serif text-2xl font-bold text-cream mb-4">Visit Our Roastery</h3>
                                    <p className="text-cream/60 text-sm leading-relaxed mb-8">
                                        Experience the art of roasting firsthand. Our master brewers are 
                                        ready to take you on a sensory journey through the world's finest beans.
                                    </p>
                                    <button className="text-cafe-gold font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                        View on map <span className="text-lg">→</span>
                                    </button>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cafe-gold/10 rounded-full blur-3xl group-hover:bg-cafe-gold/20 transition-all" />
                            </div>
                        </FadeLeft>
                    </div>

                    {/* FORM SECTION - CLEAN EDITORIAL */}
                    <div className="lg:col-span-7">
                        <FadeRight className="bg-white rounded-[40px] p-10 md:p-16 shadow-warm-lg h-full border border-cafe-gold/5 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-0.5 bg-cafe-gold rounded-full" />
                                    <h2 className="font-serif text-3xl font-bold text-cafe-black">Exclusive Inquiry</h2>
                                </div>

                                <AnimatePresence>
                                    {sent && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="bg-cafe-gold text-white p-6 rounded-3xl flex items-center gap-4 mb-8 shadow-warm-xl"
                                        >
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">✨</div>
                                            <div>
                                                <p className="font-bold">Message Delivered</p>
                                                <p className="text-xs opacity-90">Our concierge will contact you shortly.</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Your Name</label>
                                            <input
                                                type="text" name="name" value={form.name} onChange={handleChange}
                                                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                                                placeholder="Enter full name" required
                                                className={`w-full px-0 py-3 bg-transparent border-b-2 transition-all duration-500 outline-none text-cafe-black font-medium ${
                                                    focused === 'name' ? 'border-cafe-gold' : 'border-cafe-black/10'
                                                }`}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Email Address</label>
                                            <input
                                                type="email" name="email" value={form.email} onChange={handleChange}
                                                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                                                placeholder="example@domain.com" required
                                                className={`w-full px-0 py-3 bg-transparent border-b-2 transition-all duration-500 outline-none text-cafe-black font-medium ${
                                                    focused === 'email' ? 'border-cafe-gold' : 'border-cafe-black/10'
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Inquiry Type</label>
                                        <select 
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-cafe-black/10 outline-none focus:border-cafe-gold transition-all text-cafe-black font-medium appearance-none cursor-pointer"
                                        >
                                            <option>General Concierge</option>
                                            <option>Private Events & Gatherings</option>
                                            <option>Wholesale Partnerships</option>
                                            <option>Press & Media</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Your Message</label>
                                        <textarea
                                            name="message" value={form.message} onChange={handleChange}
                                            onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                                            rows={4} placeholder="Describe your request..." required
                                            className={`w-full px-0 py-3 bg-transparent border-b-2 transition-all duration-500 outline-none resize-none text-cafe-black font-medium ${
                                                focused === 'message' ? 'border-cafe-gold' : 'border-cafe-black/10'
                                            }`}
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-6 bg-cafe-black text-cream rounded-[20px] font-serif text-xl font-bold shadow-warm-xl hover:shadow-warm-2xl transition-all relative overflow-hidden group"
                                    >
                                        <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">Send Invitation</span>
                                        <div className="absolute inset-0 bg-cafe-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <span className="absolute inset-0 flex items-center justify-center text-cafe-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                            Proceed ✨
                                        </span>
                                    </motion.button>
                                </form>
                            </div>
                        </FadeRight>
                    </div>
                </div>
            </section>

            {/* ARTISTIC MAP SECTION */}
            <section className="py-24 bg-cream-light border-t border-cafe-gold/10">
                <div className="max-w-6xl mx-auto px-8">
                    <FadeUp className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-cafe-black mb-4">Our Presence</h2>
                        <div className="w-20 h-1 bg-cafe-gold mx-auto rounded-full" />
                    </FadeUp>

                    <ScaleIn className="h-[60vh] rounded-[60px] overflow-hidden shadow-warm-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-8 border-white">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.559134954005!2d100.528450715349!3d13.753330601140082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29930f7998399%3A0x6a0a09e0a6d10e0!2sSiam%20Paragon!5e0!3m2!1sen!2sth!4v1654589201548!5m2!1sen!2sth" 
                            className="w-full h-full border-0" 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                    </ScaleIn>
                </div>
            </section>

        </div>
    )
}