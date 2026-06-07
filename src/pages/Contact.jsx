import { useState } from 'react'
import { motion } from 'framer-motion'

const contactInfo = [
    { icon: '📞', label: 'Phone Number', value: '+66 81 234 5678' },
    { icon: '✉️', label: 'Cafe@gmail.com', value: 'hello@cafemono.com' },
    { icon: '📍', label: 'Add Cafe Location', value: '123 Coffee Lane, Bangkok' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = () => {
        setSent(true)
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSent(false), 4000)
    }

    return (
        <div className="bg-cream min-h-screen">
            <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">

                <h1 className="font-serif text-3xl font-bold text-cafe-black text-center mb-8">
                    Contact Us
                </h1>

                {/* Visit Us Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-cream-light rounded-3xl p-6 mb-5"
                    style={{ boxShadow: '0 2px 12px rgba(123,59,42,0.08)' }}
                >
                    <h2 className="font-serif text-lg font-bold text-cafe-black mb-4">Visit us</h2>
                    <p className="text-cafe-black/60 text-sm leading-relaxed mb-5">
                        Come experience the warmth of CafeMono. We're located in the heart
                        of Bangkok, open daily to serve you the finest brews and bites.
                    </p>

                    {/* Info Icons Row */}
                    <div className="flex justify-around">
                        {contactInfo.map((info) => (
                            <div key={info.label} className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-lg"
                                    style={{ boxShadow: '0 2px 8px rgba(123,59,42,0.1)' }}
                                >
                                    {info.icon}
                                </div>
                                <p className="text-cafe-black text-xs font-semibold text-center max-w-[80px] leading-tight">
                                    {info.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Map Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-3xl overflow-hidden mb-5"
                    style={{ boxShadow: '0 2px 12px rgba(123,59,42,0.08)' }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop"
                        alt="Location map"
                        className="w-full h-48 object-cover"
                    />
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-cream-light rounded-3xl p-6"
                    style={{ boxShadow: '0 2px 12px rgba(123,59,42,0.08)' }}
                >
                    <h2 className="font-serif text-lg font-bold text-cafe-black mb-5">Headline</h2>

                    {sent && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-4 text-sm"
                        >
                            ✅ Message sent! We'll get back to you soon.
                        </motion.div>
                    )}

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs font-medium text-cafe-black mb-1 block">Your Name</label>
                                <input
                                    type="text" name="name" value={form.name} onChange={handleChange}
                                    placeholder="Enter here"
                                    className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-medium text-cafe-black mb-1 block">Email Address</label>
                                <input
                                    type="email" name="email" value={form.email} onChange={handleChange}
                                    placeholder="Enter here"
                                    className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-cafe-black mb-1 block">Phone Number</label>
                            <input
                                type="text" name="phone" value={form.phone} onChange={handleChange}
                                placeholder="Enter here"
                                className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-cafe-black mb-1 block">Message</label>
                            <textarea
                                name="message" value={form.message} onChange={handleChange}
                                rows={4} placeholder="Enter here"
                                className="w-full px-3 py-2.5 rounded-xl bg-cream border border-cream-dark text-sm focus:outline-none focus:border-brown transition-colors resize-none"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            className="w-full py-3 bg-brown text-white rounded-xl font-semibold text-sm hover:bg-brown-dark transition-all"
                            style={{ boxShadow: '0 4px 15px rgba(123,59,42,0.3)' }}
                        >
                            Send a message
                        </motion.button>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}