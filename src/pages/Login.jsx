import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            setError('Please fill in all fields.')
            return
        }
        setError('')
        setLoading(true)
        try {
            await login(form.email, form.password)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') handleSubmit()
    }

    return (
        <div className="min-h-screen bg-cream flex">

            {/* LEFT — Cafe image panel */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop"
                    alt="Cafe"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/80 via-cafe-black/30 to-transparent" />

                {/* Bottom text */}
                <div className="absolute bottom-12 left-10 right-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {/* Logo badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                <span className="text-white font-bold text-[8px] text-center leading-tight font-serif">
                                    CAFE<br />MONO
                                </span>
                            </div>
                            <span className="text-white font-serif font-bold text-lg">CafeMono</span>
                        </div>

                        <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-3">
                            The best coffee<br />
                            <span className="text-cafe-gold italic">starts here</span>
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            Sign in to place your order, track your drinks,
                            and earn loyalty points with every cup.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* RIGHT — Form panel */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-sm"
                >

                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-8 md:hidden">
                        <div className="w-10 h-10 rounded-full border-2 border-brown flex items-center justify-center">
                            <span className="text-brown font-bold text-[8px] text-center leading-tight font-serif">
                                CAFE<br />MONO
                            </span>
                        </div>
                        <span className="font-serif font-bold text-xl text-cafe-black">CafeMono</span>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="font-serif text-3xl font-bold text-cafe-black mb-2">
                            Welcome back ☕
                        </h1>
                        <p className="text-cafe-black/50 text-sm">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 mb-5 text-sm font-medium"
                        >
                            ❌ {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <div className="flex flex-col gap-4">

                        {/* Email */}
                        <div>
                            <label className="text-xs font-semibold text-cafe-black mb-1.5 block uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onKeyDown={handleKey}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-2xl bg-cream-light border border-cream-dark text-sm focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-semibold text-cafe-black uppercase tracking-wider">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onKeyDown={handleKey}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-2xl bg-cream-light border border-cream-dark text-sm focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cafe-black/40 hover:text-brown transition-colors text-xs font-semibold"
                                >
                                    {showPass ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3.5 bg-brown text-white rounded-2xl font-bold text-sm hover:bg-brown-dark transition-all disabled:opacity-50 mt-1"
                            style={{ boxShadow: '0 4px 20px rgba(123,59,42,0.35)' }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In →'
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 h-px bg-cream-dark" />
                            <span className="text-cafe-black/30 text-xs">or</span>
                            <div className="flex-1 h-px bg-cream-dark" />
                        </div>

                        {/* Register link */}
                        <div
                            className="w-full py-3.5 rounded-2xl border-2 border-cream-dark text-center cursor-pointer hover:border-brown transition-colors"
                            style={{ boxShadow: '0 2px 8px rgba(123,59,42,0.06)' }}
                        >
                            <Link to="/register" className="text-cafe-black text-sm font-semibold hover:text-brown transition-colors">
                                Create new account
                            </Link>
                        </div>

                    </div>

                    {/* Footer note */}
                    <p className="text-center text-xs text-cafe-black/30 mt-8 leading-relaxed">
                        By signing in, you agree to our{' '}
                        <span className="text-brown cursor-pointer hover:underline">Terms</span>
                        {' '}and{' '}
                        <span className="text-brown cursor-pointer hover:underline">Privacy Policy</span>
                    </p>

                </motion.div>
            </div>

        </div>
    )
}