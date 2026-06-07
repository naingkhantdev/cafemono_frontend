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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? 'rgba(253,246,236,0.97)' : '#FDF6EC',
                boxShadow: scrolled ? '0 2px 20px rgba(123,59,42,0.10)' : 'none',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
            }}
        >
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div
                        className="w-10 h-10 rounded-full border-2 border-brown flex items-center justify-center"
                        style={{ background: '#FDF6EC' }}
                    >
                        <span className="text-brown font-bold text-[8px] text-center leading-tight font-serif">
                            CAFE<br />MONO
                        </span>
                    </div>
                </Link>

                {/* Links */}
                <ul className="flex items-center gap-8">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="text-sm font-medium relative transition-colors"
                                style={{ color: pathname === link.to ? '#7B3B2A' : '#1A1209' }}
                            >
                                {link.label}
                                {pathname === link.to && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brown rounded-full"
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="text-sm text-cafe-black/60 hidden md:block">
                                Hi, <span className="font-semibold text-cafe-black">{user.name}</span>
                            </span>
                            <Link
                                to="/order"
                                className="px-5 py-2 bg-brown text-white rounded-full text-sm font-semibold hover:bg-brown-dark transition-all"
                                style={{ boxShadow: '0 2px 10px rgba(123,59,42,0.25)' }}
                            >
                                Order
                            </Link>
                            <button
                                onClick={logout}
                                className="px-5 py-2 border-2 border-brown text-brown rounded-full text-sm font-semibold hover:bg-brown hover:text-white transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 border-2 border-brown text-brown rounded-full text-sm font-semibold hover:bg-brown hover:text-white transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                to="/order"
                                className="px-5 py-2 bg-brown text-white rounded-full text-sm font-semibold hover:bg-brown-dark transition-all"
                                style={{ boxShadow: '0 2px 10px rgba(123,59,42,0.25)' }}
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
