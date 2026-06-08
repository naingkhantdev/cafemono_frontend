import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeUp } from '../ui/AnimatedSection'

export default function Footer() {
    return (
        <footer className="bg-cafe-black text-white relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-grain opacity-30" />

            <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <FadeUp className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 flex items-center justify-center">
                                <img src="/logo.png" alt="CafeMono Logo" className="w-full h-full object-contain brightness-110" />
                            </div>
                            <span className="font-serif text-2xl font-bold text-cream tracking-tight">CafeMono</span>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-8">
                            We brew each cup with care and intention, sourcing beans from
                            roasters who share our passion for quality and craft.
                        </p>
                        <div className="flex gap-4">
                            {['Facebook', 'Instagram', 'Twitter'].map((s) => (
                                <motion.a
                                    key={s}
                                    href="#"
                                    whileHover={{ scale: 1.1, backgroundColor: '#C8963E' }}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs text-white/60 hover:text-cafe-black transition-all"
                                >
                                    {s[0]}
                                </motion.a>
                            ))}
                        </div>
                    </FadeUp>

                    {/* Links */}
                    <FadeUp delay={0.1}>
                        <h3 className="font-serif font-bold text-cafe-gold mb-6 uppercase tracking-widest text-xs">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'Menu', to: '/menu' },
                                { label: 'About Us', to: '/about' },
                                { label: 'Contact', to: '/contact' },
                                { label: 'Order Now', to: '/order' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 text-sm hover:text-cream transition-all hover:translate-x-1 inline-block"
                                    >
                                        → {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FadeUp>

                    {/* Hours */}
                    <FadeUp delay={0.2}>
                        <h3 className="font-serif font-bold text-cafe-gold mb-6 uppercase tracking-widest text-xs">Opening Hours</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-cream/80">Mon – Fri</span>
                                <span>7:00 – 21:00</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-cream/80">Saturday</span>
                                <span>8:00 – 22:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-cream/80">Sunday</span>
                                <span>8:00 – 20:00</span>
                            </li>
                        </ul>
                    </FadeUp>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} CafeMono. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">
                        Made with <span className="text-brown">☕</span> in Bangkok
                    </p>
                </div>
            </div>
        </footer>
    )
}