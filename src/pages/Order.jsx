import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const products = [
    { id: 1, name: 'Caramel Latte', price: 120 },
    { id: 2, name: 'Espresso', price: 90 },
    { id: 3, name: 'Cappuccino', price: 110 },
    { id: 4, name: 'Cold Brew', price: 130 },
    { id: 5, name: 'Matcha Latte', price: 125 },
    { id: 6, name: 'Iced Mocha', price: 130 },
    { id: 7, name: 'Butter Croissant', price: 85 },
    { id: 8, name: 'Club Sandwich', price: 180 },
]

export default function Order() {
    const [form, setForm] = useState({
        name: '', phone: '', order: '', extra: '',
    })
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = () => {
        if (!form.name || !form.phone || !form.order) {
            setError('Please fill in all required fields.')
            return
        }
        setError('')
        setSuccess(true)
        setForm({ name: '', phone: '', order: '', extra: '' })
        setTimeout(() => setSuccess(false), 5000)
    }

    return (
        <div className="bg-cream min-h-screen">
            <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Left — Heading */}
                    <div className="md:w-2/5">
                        <p className="text-brown text-xs font-semibold uppercase tracking-widest mb-2">
                            Order your coffee
                        </p>
                        <h1 className="font-serif text-4xl font-bold text-cafe-black leading-tight mb-3">
                            MAKE YOUR<br />ORDER FROM<br />HERE
                        </h1>
                        <p className="text-cafe-black/50 text-sm leading-relaxed">
                            Pick your favourite item, tell us how you'd like it, and we'll
                            prepare it fresh for you right away.
                        </p>
                    </div>

                    {/* Right — Form */}
                    <div
                        className="md:w-3/5 bg-cream-light rounded-3xl p-6 w-full"
                        style={{ boxShadow: '0 2px 20px rgba(123,59,42,0.10)' }}
                    >
                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-4 text-sm font-medium"
                                >
                                    ✅ Order placed! We'll prepare it right away.
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm font-medium"
                                >
                                    ❌ {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-col gap-3">

                            {/* Name & Phone */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-xs font-medium text-cafe-black mb-1 block">Your Name</label>
                                    <input
                                        type="text" name="name" value={form.name} onChange={handleChange}
                                        placeholder="Enter name"
                                        className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-medium text-cafe-black mb-1 block">Phone Number</label>
                                    <input
                                        type="text" name="phone" value={form.phone} onChange={handleChange}
                                        placeholder="Enter phone"
                                        className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Order dropdown */}
                            <div>
                                <label className="text-xs font-medium text-cafe-black mb-1 block">Order</label>
                                <select
                                    name="order" value={form.order} onChange={handleChange}
                                    className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors appearance-none"
                                >
                                    <option value="">Select item...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.name}>
                                            {p.name} — ฿{p.price}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Extra need */}
                            <div>
                                <label className="text-xs font-medium text-cafe-black mb-1 block">Extra need</label>
                                <textarea
                                    name="extra" value={form.extra} onChange={handleChange}
                                    rows={4} placeholder="Enter here (e.g. less sugar, oat milk...)"
                                    className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                className="w-full py-3 bg-brown text-white rounded-xl font-semibold text-sm hover:bg-brown-dark transition-all mt-1"
                                style={{ boxShadow: '0 4px 15px rgba(123,59,42,0.3)' }}
                            >
                                Order done
                            </motion.button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}