import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../api/axios'

const statusColors = {
    pending: { bg: '#FEF3C7', text: '#92400E' },
    confirmed: { bg: '#DBEAFE', text: '#1E40AF' },
    preparing: { bg: '#EDE9FE', text: '#5B21B6' },
    ready: { bg: '#D1FAE5', text: '#065F46' },
    completed: { bg: '#F0FDF4', text: '#166534' },
    cancelled: { bg: '#FEE2E2', text: '#991B1B' },
}

export default function Dashboard() {
    const [stats, setStats] = useState({ orders: 0, products: 0, categories: 0, revenue: 0 })
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get('/orders'),
            api.get('/products'),
            api.get('/categories'),
        ])
            .then(([ordRes, prodRes, catRes]) => {
                const allOrders = ordRes.data?.data || []
                const allProds = prodRes.data?.data || []
                const allCats = catRes.data?.data || []

                const revenue = allOrders
                    .filter((o) => o.status === 'completed')
                    .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)

                setStats({
                    orders: allOrders.length,
                    products: allProds.length,
                    categories: allCats.length,
                    revenue: revenue.toFixed(0),
                })
                setOrders(allOrders.slice(0, 8))
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const statCards = [
        { label: 'Total Orders', value: stats.orders, icon: '🧾', color: '#7B3B2A', bg: '#FDF6EC' },
        { label: 'Total Products', value: stats.products, icon: '☕', color: '#1E40AF', bg: '#EFF6FF' },
        { label: 'Categories', value: stats.categories, icon: '📂', color: '#065F46', bg: '#F0FDF4' },
        { label: 'Revenue (฿)', value: `฿${stats.revenue}`, icon: '💰', color: '#92400E', bg: '#FFFBEB' },
    ]

    return (
        <div>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                {statCards.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -3, boxShadow: '0 8px 25px rgba(0,0,0,0.10)' }}
                        className="bg-white rounded-2xl p-5 cursor-default transition-shadow"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                            style={{ background: s.bg }}
                        >
                            {s.icon}
                        </div>
                        <div className="font-serif text-2xl font-bold text-cafe-black">{s.value}</div>
                        <div className="text-gray-400 text-xs mt-1">{s.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders */}
            <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="font-serif font-bold text-cafe-black text-lg">Recent Orders</h2>
                    <Link
                        to="/admin/orders"
                        className="text-brown text-xs font-semibold hover:underline"
                    >
                        View all →
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <div
                            className="w-8 h-8 rounded-full mx-auto animate-spin"
                            style={{ border: '3px solid #E8C99A', borderTopColor: '#7B3B2A' }}
                        />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <div className="text-4xl mb-3">🧾</div>
                        <p className="text-sm">No orders yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    {['Order #', 'Customer', 'Type', 'Total', 'Status', 'Date'].map((h) => (
                                        <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((order) => {
                                    const sc = statusColors[order.status] || { bg: '#F3F4F6', text: '#374151' }
                                    return (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-mono font-semibold text-cafe-black">
                                                {order.order_number}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {order.user?.name || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                                                {order.type?.replace('_', ' ')}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-brown">
                                                ฿{order.total_amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                                                    style={{ background: sc.bg, color: sc.text }}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-400">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}