import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        password: '', password_confirmation: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password) {
            setError('Please fill in all required fields.')
            return
        }
        if (form.password !== form.password_confirmation) {
            setError('Passwords do not match.')
            return
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }
        setError('')
        setLoading(true)
        try {
            await register(form.name, form.email, form.password, form.password_confirmation, form.phone)
            navigate('/')
        } catch (err) {
            const errors = err.response?.data?.errors
            if (errors) {
                const first = Object.values(errors)[0]
                setError(Array.isArray(first) ? first[0] : first)
            } else {
                setError(err.response?.data?.message || 'Registration failed.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cream flex">

            {/* LEFT — image panel */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&auto=format&fit=crop"
                    alt="Cafe"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/85 via-cafe-black/30 to-transparent" />

                <div className="absolute bottom-12 left-10 right-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                <span className="text-white font-bold text-[8px] text-center leading-tight font-serif">
                                    CAFE<br />MONO
                                </span>
                            </div>
                            <span className="text-white font-serif font-bold text-lg">CafeMono</span>
                        </div>

                        <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-3">
                            Join our coffee<br />
                            <span className="text-cafe-gold italic">community</span>
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            Create an account to start ordering, earn loyalty points,
                            and enjoy exclusive member benefits.
                        </p>

                        {/* Perks */}
                        <div className="mt-6 flex flex-col gap-2">
                            {['Free loyalty points on signup', 'Exclusive member discounts', 'Order tracking & history'].map((perk) => (
                                <div key={perk} className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-cafe-gold/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-cafe-gold text-xs">✓</span>
                                    </div>
                                    <span className="text-white/70 text-xs">{perk}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* RIGHT — Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12">
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
                            Create Account ✨
                        </h1>
                        <p className="text-cafe-black/50 text-sm">
                            Join CafeMono and start ordering today
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

                    <div className="flex flex-col gap-3">

                        {/* Name */}
                        <div>
                            <label className="text-xs font-semibold text-cafe-black mb-1.5 block uppercase tracking-wider">
                                Full Name <span className="text-brown">*</span>
                            </label>
                            <input
                                type="text" name="name" value={form.name} onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full px-4 py-3 rounded-2xl bg-cream-light border border-cream-dark text-sm focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs font-semibold text-cafe-black mb-1.5 block uppercase tracking-wider">
                                Email Address <span className="text-brown">*</span>
                            </label>
                            <input
                                type="email" name="email" value={form.email} onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-2xl bg-cream-light border border-cream-dark text-sm focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-xs font-semibold text-cafe-black mb-1.5 block uppercase tracking-wider">
                                Phone Number
                            </label>
                            <input
                                type="text" name="phone" value={form.phone} onChange={handleChange}
                                placeholder="081 234 5678"
                                className="w-full px-4 py-3 rounded-2xl bg-cream-light border border-cream-dark text-sm focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-semibold text-cafe-black mb-1.5 block uppercase tracking-wider">
                                Password <span className="text-brown">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password" value={form.password} onChange={handleChange}
                                    placeholder="Min. 8 characters"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="text-xs font-semibold text-cafe-black mb-1.5 block uppercase tracking-wider">
                                Confirm Password <span className="text-brown">*</span>
                            </label>
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                placeholder="Repeat password"
                                className="w-full px-4 py-3 rounded-2xl bg-cream-light border border-cream-dark text-sm focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/10 transition-all"
                            />
                        </div>

                        {/* Password strength indicator */}
                        {form.password.length > 0 && (
                            <div className="flex gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 h-1 rounded-full transition-all duration-300"
                                        style={{
                                            background: form.password.length > i * 2
                                                ? form.password.length >= 8 ? '#7B3B2A' : '#E8C99A'
                                                : '#F5E6C8'
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3.5 bg-brown text-white rounded-2xl font-bold text-sm hover:bg-brown-dark transition-all disabled:opacity-50 mt-2"
                            style={{ boxShadow: '0 4px 20px rgba(123,59,42,0.35)' }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account →'
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-cream-dark" />
                            <span className="text-cafe-black/30 text-xs">or</span>
                            <div className="flex-1 h-px bg-cream-dark" />
                        </div>

                        {/* Login link */}
                        <div
                            className="w-full py-3.5 rounded-2xl border-2 border-cream-dark text-center hover:border-brown transition-colors cursor-pointer"
                            style={{ boxShadow: '0 2px 8px rgba(123,59,42,0.06)' }}
                        >
                            <Link to="/login" className="text-cafe-black text-sm font-semibold hover:text-brown transition-colors">
                                Already have an account? Sign in
                            </Link>
                        </div>

                    </div>

                    <p className="text-center text-xs text-cafe-black/30 mt-6 leading-relaxed">
                        By creating an account, you agree to our{' '}
                        <span className="text-brown cursor-pointer hover:underline">Terms</span>
                        {' '}and{' '}
                        <span className="text-brown cursor-pointer hover:underline">Privacy Policy</span>
                    </p>

                </motion.div>
            </div>

        </div>
    )
}