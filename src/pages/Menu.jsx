import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
    {
        name: 'Coffee',
        items: [
            { name: 'Latte', price: '฿120', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
            { name: 'Espresso', price: '฿90', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop' },
            { name: 'Cappuccino', price: '฿110', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop' },
            { name: 'Flat White', price: '฿115', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop' },
            { name: 'Americano', price: '฿85', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop' },
            { name: 'Caramel Latte', price: '฿125', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop' },
        ],
    },
    {
        name: 'Drinks',
        items: [
            { name: 'Matcha', price: '฿125', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop' },
            { name: 'Iced Mocha', price: '฿130', image: 'https://images.unsplash.com/photo-1548122850-eb5f2c4ca29c?w=400&auto=format&fit=crop' },
            { name: 'Iced Chai Latte', price: '฿120', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop' },
            { name: 'Cold Brew', price: '฿130', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&auto=format&fit=crop' },
            { name: 'Lemonade', price: '฿95', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&auto=format&fit=crop' },
            { name: 'Thai Tea', price: '฿85', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop' },
        ],
    },
    {
        name: 'Snacks',
        items: [
            { name: 'Burger', price: '฿180', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop' },
            { name: 'Sandwich', price: '฿150', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop' },
            { name: 'Fried Chicken', price: '฿160', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop' },
            { name: 'Croissant', price: '฿85', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop' },
            { name: 'Waffle', price: '฿120', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&auto=format&fit=crop' },
            { name: 'Toast', price: '฿75', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&auto=format&fit=crop' },
        ],
    },
]

const ITEMS_PER_PAGE = 3

export default function Menu() {
    const [pages, setPages] = useState({ Coffee: 0, Drinks: 0, Snacks: 0 })
    const featuredCount = categories.reduce((sum, category) => sum + category.items.length, 0)

    const nextPage = (cat, total) => {
        const maxPage = Math.ceil(total / ITEMS_PER_PAGE) - 1
        setPages((p) => ({ ...p, [cat]: Math.min(p[cat] + 1, maxPage) }))
    }

    const prevPage = (cat) => {
        setPages((p) => ({ ...p, [cat]: Math.max(p[cat] - 1, 0) }))
    }

    return (
        <div className="bg-cream min-h-screen">
            <section className="relative overflow-hidden px-6 pt-32 pb-16">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(circle at 20% 15%, rgba(123,59,42,0.18), transparent 30%), radial-gradient(circle at 85% 10%, rgba(232,201,154,0.45), transparent 32%)',
                    }}
                />
                <div className="relative max-w-6xl mx-auto">
                    <div className="rounded-3xl bg-cafe-black px-8 py-10 md:px-12 md:py-14 text-cream shadow-warm-lg">
                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-cafe-gold font-semibold mb-4">
                            Signature Collection
                        </p>
                        <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                            Crafted Menu, Luxury Cafe Experience
                        </h1>
                        <p className="mt-5 text-cream/80 max-w-2xl">
                            Discover handcrafted coffee, elevated drinks, and gourmet snacks designed for moments that feel special.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                to="/order"
                                className="px-6 py-3 rounded-full bg-cafe-gold text-cafe-black text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                            >
                                Start Ordering
                            </Link>
                            <span className="px-6 py-3 rounded-full border border-cream/25 text-xs font-semibold uppercase tracking-widest">
                                {categories.length} categories - {featuredCount} items
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 pb-20">

                {categories.map((cat) => {
                    const page = pages[cat.name]
                    const maxPage = Math.ceil(cat.items.length / ITEMS_PER_PAGE) - 1
                    const visible = cat.items.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)

                    return (
                        <section key={cat.name} className="mb-14">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.25em] text-brown/70 font-semibold">Category</p>
                                    <h2 className="font-serif text-3xl text-cafe-black">{cat.name}</h2>
                                </div>
                                <Link to="/order" className="text-brown text-xs font-semibold hover:underline">
                                    View all &gt;
                                </Link>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={page}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                                >
                                    {visible.map((item) => (
                                        <motion.div
                                            key={item.name}
                                            whileHover={{ y: -6, boxShadow: '0 18px 42px rgba(123,59,42,0.18)' }}
                                            className="bg-cream-light rounded-3xl overflow-hidden cursor-pointer border border-brown/10"
                                            style={{ boxShadow: '0 6px 20px rgba(123,59,42,0.10)' }}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-44 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/25 via-transparent to-transparent" />
                                            </div>
                                            <div className="p-5">
                                                <p className="font-semibold text-cafe-black text-lg">{item.name}</p>
                                                <p className="text-brown text-lg font-bold mt-1">{item.price}</p>
                                                <Link
                                                    to="/order"
                                                    className="inline-flex mt-4 text-[11px] uppercase tracking-[0.2em] font-bold text-brown hover:text-brown-dark transition-colors"
                                                >
                                                    Add to order
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-center gap-2 mt-4">
                                <button
                                    onClick={() => prevPage(cat.name)}
                                    disabled={page === 0}
                                    className="text-brown disabled:opacity-30 text-xs px-2"
                                >
                                    ‹
                                </button>
                                {Array.from({ length: maxPage + 1 }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPages((p) => ({ ...p, [cat.name]: i }))}
                                        className="rounded-full transition-all"
                                        style={{
                                            width: page === i ? 20 : 8,
                                            height: 8,
                                            background: page === i ? '#7B3B2A' : '#E8C99A',
                                        }}
                                    />
                                ))}
                                <button
                                    onClick={() => nextPage(cat.name, cat.items.length)}
                                    disabled={page === maxPage}
                                    className="text-brown disabled:opacity-30 text-xs px-2"
                                >
                                    ›
                                </button>
                            </div>

                        </section>
                    )
                })}
            </div>
        </div>
    )
}