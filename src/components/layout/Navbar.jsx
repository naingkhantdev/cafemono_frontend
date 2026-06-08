import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const links = [
    { label: 'Home', to: '/' },
    { label: 'Menu', to: '/menu' },
    { label: 'About', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
    const { pathname } = useLocation()
    const { user, logout } = useAuth()
    const [scrolled, setScrolled] = useState(false)
    
    // Check if we are on a page that starts with a dark section
    const isDarkPage = pathname === '/about' || pathname === '/contact' || pathname === '/menu'

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const isWhiteText = isDarkPage && !scrolled

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-cream-light/90 backdrop-blur-md shadow-warm-sm py-3' 
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 transition-transform group-hover:rotate-12 duration-500">
                        <img src="/logo.png" alt="CafeMono Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className={`font-serif font-bold text-xl tracking-tight hidden sm:block transition-colors duration-500 ${
                        isWhiteText ? 'text-cream' : 'text-cafe-black'
                    }`}>
                        CafeMono
                    </span>
                </Link>

                {/* Links */}
                <ul className="hidden md:flex items-center gap-10">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`text-sm font-bold tracking-widest uppercase relative transition-all duration-500 ${
                                    isWhiteText 
                                        ? (pathname === link.to ? 'text-cafe-gold' : 'text-cream/80 hover:text-white') 
                                        : (pathname === link.to ? 'text-brown' : 'text-cafe-black/70 hover:text-brown')
                                }`}
                            >
                                {link.label}
                                {pathname === link.to && (
                                    <motion.span
                                        layoutId="underline"
                                        className={`absolute -bottom-2 left-0 right-0 h-0.5 rounded-full ${
                                            isWhiteText ? 'bg-cafe-gold' : 'bg-brown'
                                        }`}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className={`text-xs font-bold uppercase tracking-widest hidden lg:block transition-colors duration-500 ${
                                isWhiteText ? 'text-cream/60' : 'text-cafe-black/60'
                            }`}>
                                <span className={isWhiteText ? 'text-cream' : 'text-cafe-black'}>{user.name}</span>
                            </span>
                            <Link
                                to="/order"
                                className="px-6 py-2.5 bg-brown text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brown-dark transition-all shadow-warm hover:shadow-warm-lg"
                            >
                                Order
                            </Link>
                            <button
                                onClick={logout}
                                className={`px-5 py-2 border-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                    isWhiteText 
                                        ? 'border-cream/20 text-cream hover:bg-cream hover:text-cafe-black' 
                                        : 'border-brown text-brown hover:bg-brown hover:text-white'
                                }`}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                                    isWhiteText ? 'text-cream hover:text-cafe-gold' : 'text-cafe-black hover:text-brown'
                                }`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/order"
                                className="px-7 py-2.5 bg-brown text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brown-dark transition-all shadow-warm hover:shadow-warm-lg"
                            >
                                Order
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </motion.nav>
    )
}
