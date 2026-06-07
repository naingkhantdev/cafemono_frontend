import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../assets/cafe_mono.png'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

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
            setError(
                err.response?.data?.message ||
                'Invalid credentials. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <img src={Logo} alt="CafeMono Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-cafe-black">Welcome back</h1>
                    <p className="text-cafe-black/60 text-sm mt-2">
                        Sign in to your account to continue
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

                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Email Address
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

                        <div>
                            <label className="text-sm font-medium text-cafe-black mb-1 block">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 bg-brown text-white rounded-xl font-semibold hover:bg-brown-dark transition-all disabled:opacity-50 mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                    </div>

                    <p className="text-center text-sm text-cafe-black/60 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brown font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}