import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../assets/cafe_mono.png'

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        password: '', password_confirmation: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

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
            await register(
                form.name,
                form.email,
                form.password,
                form.password_confirmation,
                form.phone,
            )
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
        <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <img src={Logo} alt="CafeMono Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-cafe-black">Create Account</h1>
                    <p className="text-cafe-black/60 text-sm mt-2">
                        Join CafeMono and start ordering today
                    </p>
                </div>

                {/* Card */}
                <div className="bg-cream-light rounded-2xl p-8 shadow-sm">

                    {error && (
                        <div className="bg-red-100 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
                            ❌ {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Full Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Email Address <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="081 234 5678"
                                className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Password <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Min. 8 characters"
                                className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Confirm Password <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                placeholder="Repeat password"
                                className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 bg-brown text-white rounded-xl font-semibold hover:bg-brown-dark transition-all disabled:opacity-50 mt-2"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                    </div>

                    <p className="text-center text-sm text-cafe-black/60 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brown font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}