import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../api/axios'

const statusColors = {
    pending: { bg: '#FEF3C7', text: '#92400E' },
    confirmed: { bg: '#DBEAFE', text: '#1E40AF' },
    preparing: { bg: '#EDE9FE', text: '#5B21B6' },
    ready: { bg: '#D1FAE5', text: '#065F46' },
    completed: { bg: '#F0FDF4', text: '#166534' },
    cancelled: { bg: '#FEE2E2', text: '#991B1B' },
}

const allStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [updating, setUpdating] = useState(null)
    const [selected, setSelected] = useState(null)

    const fetchOrders = () => {
        setLoading(true)
        api.get('/orders')
            .then((res) => setOrders(res.data?.data || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchOrders() }, [])

    const updateStatus = async (orderId, status) => {
        setUpdating(orderId)
        try {
            await api.put(`/orders/${orderId}`, { status })
            setOrders((prev) =>
                prev.map((o) => o.id === orderId ? { ...o, status } : o)
            )
        } catch (err) {
            alert('Failed to update status')
        } finally {
            setUpdating(null)
        }
    }

    const filtered = filter === 'all'
        ? orders
        : orders.filter((o) => o.status === filter)

    return (
        <div>
            {/* Filter tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {['all', ...allStatuses].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className="px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all"
                        style={{
                            background: filter === s ? '#7B3B2A' : 'white',
                            color: filter === s ? 'white' : '#6B7280',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                        }}
                    >
                        {s === 'all' ? `All (${orders.length})` : s}
                    </button>
                ))}
            </div>

            {/* Orders table */}
            <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
                {loading ? (
                    <div className="text-center py-20">
                        <div
                            className="w-8 h-8 rounded-full mx-auto animate-spin"
                            style={{ border: '3px solid #E8C99A', borderTopColor: '#7B3B2A' }}
                        />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <div className="text-4xl mb-3">🧾</div>
                        <p className="text-sm">No orders found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    {['Order #', 'Customer', 'Items', 'Type', 'Total', 'Status', 'Action', 'Date'].map((h) => (
                                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((order) => {
                                    const sc = statusColors[order.status] || { bg: '#F3F4F6', text: '#374151' }
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-5 py-4 text-sm font-mono font-bold text-cafe-black">
                                                {order.order_number}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                <div>{order.user?.name || '—'}</div>
                                                <div className="text-xs text-gray-400">{order.user?.phone || ''}</div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-500">
                                                {order.items?.length ?? '—'} item(s)
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-500 capitalize">
                                                {order.type?.replace('_', ' ')}
                                            </td>
                                            <td className="px-5 py-4 text-sm font-bold text-brown">
                                                ฿{order.total_amount}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span
                                                    className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                                                    style={{ background: sc.bg, color: sc.text }}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                                    disabled={updating === order.id || order.status === 'completed' || order.status === 'cancelled'}
                                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-brown disabled:opacity-40 cursor-pointer"
                                                >
                                                    {allStatuses.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-5 py-4 text-xs text-gray-400">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                        </motion.tr>
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