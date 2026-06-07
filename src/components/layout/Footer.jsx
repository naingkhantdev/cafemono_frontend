import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeUp } from '../ui/AnimatedSection'
import Logo from '../../assets/cafe_mono.png'

export default function Footer() {
    return (
        <footer className="bg-cafe-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-30" />

            <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <FadeUp className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img src={Logo} alt="CafeMono Logo" className="w-full h-full object-contain brightness-110" />
                            </div>
                            <span className="font-serif text-xl font-bold text-cream">CafeMono</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                            We brew each cup with care and intention, sourcing beans from
                            roasters who share our passion for quality and craft.
                        </p>
                        <div className="flex gap-3">
                            {['Facebook', 'Instagram', 'Twitter'].map((s) => (
                                <motion.a
                                    key={s}
                                    href="#"
                                    whileHover={{ scale: 1.1, backgroundColor: '#7B3B2A' }}
                                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/60 hover:text-white transition-colors"
                                >
                                    {s[0]}
                                </motion.a>
                            ))}
                        </div>
                    </FadeUp>

                    {/* Links */}
                    <FadeUp delay={0.1}>
                        <h3 className="font-serif font-bold text-cream mb-4">Quick Links</h3>
                        <ul className="space-y-3">
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
                                        className="text-gray-400 text-sm hover:text-cream transition-colors hover:translate-x-1 inline-block"
                                    >
                                        → {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FadeUp>

                    {/* Hours */}
                    <FadeUp delay={0.2}>
                        <h3 className="font-serif font-bold text-cream mb-4">Opening Hours</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <div className="text-cream font-medium">Mon – Fri</div>
                                <div>7:00 AM – 9:00 PM</div>
                            </li>
                            <li>
                                <div className="text-cream font-medium">Saturday</div>
                                <div>8:00 AM – 10:00 PM</div>
                            </li>
                            <li>
                                <div className="text-cream font-medium">Sunday</div>
                                <div>8:00 AM – 8:00 PM</div>
                            </li>
                        </ul>
                    </FadeUp>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} CafeMono. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Made with ☕ in Bangkok, Thailand
                    </p>
                </div>
            </div>
        </footer>
    )
}