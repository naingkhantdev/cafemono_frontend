import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { FadeLeft, FadeRight } from '../components/ui/AnimatedSection'

const fallbackProducts = [
    { id: 1, name: 'Caramel Latte', base_price: 120, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800' },
    { id: 2, name: 'Espresso', base_price: 90, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800' },
    { id: 3, name: 'Cappuccino', base_price: 110, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800' },
]

export default function Order() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [products, setProducts] = useState(fallbackProducts)
    const [form, setForm] = useState({
        name: '', phone: '', product_id: '', extra: '', type: 'dine_in',
    })
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setForm((prev) => ({ ...prev, name: user.name || '', phone: user.phone || '' }))
        }
    }, [user])

    useEffect(() => {
        api.get('/products')
            .then((res) => {
                const data = res.data?.data
                if (data?.length > 0) setProducts(data)
            })
            .catch(() => { })
    }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const selectedProduct = products.find((p) => p.id === parseInt(form.product_id))

    const handleSubmit = async () => {
        if (!form.name || !form.phone || !form.product_id) {
            setError('All fields are essential for your experience.')
            return
        }
        if (!user) {
            setError('Please join our membership to place an order.')
            setTimeout(() => navigate('/login'), 2000)
            return
        }

        setError('')
        setLoading(true)

        try {
            await api.post('/orders', {
                type: form.type,
                notes: `${form.extra ? form.extra + ' | ' : ''}Customer: ${form.name} | Phone: ${form.phone}`,
                items: [{
                    product_id: parseInt(form.product_id),
                    quantity: 1,
                    unit_price: selectedProduct?.base_price || 100,
                }],
            })
            setSuccess(true)
            setForm((prev) => ({ ...prev, product_id: '', extra: '', type: 'dine_in' }))
            setTimeout(() => setSuccess(false), 6000)
        } catch (err) {
            setError(err.response?.data?.message || 'The concierge is busy. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white min-h-screen overflow-hidden flex flex-col md:flex-row">

            {/* LEFT: LIVE VISUALIZER */}
            <section className="md:w-1/2 relative min-h-[40vh] md:min-h-screen bg-cafe-black flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-grain opacity-20" />

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={form.product_id || 'placeholder'}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full max-w-lg aspect-square"
                    >
                        <div className="absolute inset-0 bg-cafe-gold/10 rounded-full blur-3xl animate-pulse" />
                        <img 
                            src={selectedProduct?.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000'} 
                            alt="Selection" 
                            className="w-full h-full object-cover rounded-[80px] shadow-warm-2xl border-4 border-white/10"
                        />

                        {selectedProduct && (
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[40px] shadow-warm-xl"
                            >
                                <p className="text-cafe-gold font-bold tracking-widest uppercase text-[10px] mb-2 text-center">Selected Item</p>
                                <h2 className="text-white font-serif text-3xl font-bold">{selectedProduct.name}</h2>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="absolute top-12 left-12 z-20">
                    <FadeLeft>
                        <span className="text-cafe-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-2 block">Concierge</span>
                        <h1 className="text-white font-serif text-4xl font-bold">The Ordering <br />Experience</h1>
                    </FadeLeft>
                </div>
            </section>

            {/* RIGHT: PREMIUM FORM */}
            <section className="md:w-1/2 bg-cream flex items-center justify-center p-8 md:p-20 relative">
                <FadeRight className="w-full max-w-md">
                    <div className="mb-12">
                        <h2 className="font-serif text-4xl font-bold text-cafe-black mb-4 uppercase tracking-tighter">Your Details</h2>
                        <div className="w-16 h-0.5 bg-cafe-gold" />
                    </div>

                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0 }}
                                className="bg-cafe-black text-cafe-gold p-6 rounded-3xl mb-8 flex items-center gap-4 shadow-warm-xl border border-cafe-gold/30"
                            >
                                <span className="text-2xl">✨</span>
                                <div>
                                    <p className="font-bold text-sm">Experience Confirmed</p>
                                    <p className="text-[10px] uppercase tracking-widest opacity-70">We are preparing your ritual.</p>
                                </div>
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6 ml-1"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-10">
                        {/* ORDER TYPE GESTURE */}
                        <div className="flex gap-4 p-1 bg-white/50 backdrop-blur-sm rounded-full shadow-inner border border-cafe-black/5">
                            {['dine_in', 'takeaway', 'delivery'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setForm({ ...form, type: t })}
                                    className={`flex-1 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                                        form.type === t ? 'bg-cafe-black text-cafe-gold shadow-warm' : 'text-cafe-black/40 hover:text-cafe-black'
                                    }`}
                                >
                                    {t.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Guest Name</label>
                                <input
                                    type="text" name="name" value={form.name} onChange={handleChange}
                                    className="w-full px-1 py-3 bg-transparent border-b-2 border-cafe-black/10 focus:border-cafe-gold outline-none transition-all font-medium text-cafe-black"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Selection</label>
                                <select
                                    name="product_id" value={form.product_id} onChange={handleChange}
                                    className="w-full px-1 py-3 bg-transparent border-b-2 border-cafe-black/10 focus:border-cafe-gold outline-none transition-all font-medium text-cafe-black appearance-none cursor-pointer"
                                >
                                    <option value="">Select from Gallery...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name} — ฿{p.base_price}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-black/40 ml-1">Special Ritual Notes</label>
                                <textarea
                                    name="extra" value={form.extra} onChange={handleChange}
                                    rows={2}
                                    className="w-full px-1 py-3 bg-transparent border-b-2 border-cafe-black/10 focus:border-cafe-gold outline-none transition-all font-medium text-cafe-black resize-none"
                                    placeholder="Any personal requests?"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-6 bg-cafe-black text-cream rounded-[24px] font-serif text-xl font-bold shadow-warm-xl relative overflow-hidden group"
                        >
                            <span className="relative z-10">{loading ? 'Processing...' : 'Confirm Selection'}</span>
                            <div className="absolute inset-0 bg-cafe-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </motion.button>

                        {!user && (
                            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-cafe-black/30">
                                Membership Required for Acquisition
                            </p>
                        )}
                    </div>
                </FadeRight>
            </section>

        </div>
    )
}