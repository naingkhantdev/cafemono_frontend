import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../api/axios'

const emptyForm = {
    name: '', category_id: '', base_price: '',
    description: '', is_featured: 0, is_available: 1,
    calories: '', image: '',
}

export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editing, setEditing] = useState(null)
    const [saving, setSaving] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const fetchAll = () => {
        setLoading(true)
        Promise.all([api.get('/products'), api.get('/categories')])
            .then(([pRes, cRes]) => {
                setProducts(pRes.data?.data || [])
                setCategories(cRes.data?.data || [])
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchAll() }, [])

    const handleChange = (e) => {
        const val = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value
        setForm({ ...form, [e.target.name]: val })
    }

    const openAdd = () => {
        setEditing(null)
        setForm(emptyForm)
        setShowForm(true)
    }

    const openEdit = (product) => {
        setEditing(product.id)
        setForm({
            name: product.name,
            category_id: product.category_id,
            base_price: product.base_price,
            description: product.description || '',
            is_featured: product.is_featured,
            is_available: product.is_available,
            calories: product.calories || '',
            image: product.image || '',
        })
        setShowForm(true)
    }

    const handleSave = async () => {
        if (!form.name || !form.category_id || !form.base_price) {
            alert('Name, category, and price are required.')
            return
        }
        setSaving(true)
        try {
            if (editing) {
                await api.put(`/products/${editing}`, form)
            } else {
                await api.post('/products', form)
            }
            setShowForm(false)
            fetchAll()
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save product.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return
        setDeleteId(id)
        try {
            await api.delete(`/products/${id}`)
            setProducts((prev) => prev.filter((p) => p.id !== id))
        } catch {
            alert('Failed to delete.')
        } finally {
            setDeleteId(null)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{products.length} products total</p>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openAdd}
                    className="px-5 py-2.5 bg-brown text-white rounded-xl text-sm font-semibold hover:bg-brown-dark transition-all"
                    style={{ boxShadow: '0 4px 15px rgba(123,59,42,0.3)' }}
                >
                    + Add Product
                </motion.button>
            </div>

            {/* Products Table */}
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
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    {['Image', 'Name', 'Category', 'Price', 'Featured', 'Available', 'Actions'].map((h) => (
                                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <img
                                                src={product.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100'}
                                                alt={product.name}
                                                className="w-12 h-12 rounded-xl object-cover"
                                            />
                                        </td>
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-cafe-black text-sm">{product.name}</p>
                                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{product.description}</p>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-gray-500">
                                            {product.category?.name || '—'}
                                        </td>
                                        <td className="px-5 py-3 text-sm font-bold text-brown">
                                            ฿{product.base_price}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${product.is_featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-400'}`}>
                                                {product.is_featured ? '⭐ Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${product.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                                                {product.is_available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEdit(product)}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deleteId === product.id}
                                                    className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                                                >
                                                    {deleteId === product.id ? '...' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                        onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}
                        >
                            <h2 className="font-serif text-xl font-bold text-cafe-black mb-6">
                                {editing ? 'Edit Product' : 'Add New Product'}
                            </h2>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Product Name *</label>
                                    <input
                                        name="name" value={form.name} onChange={handleChange}
                                        placeholder="e.g. Caramel Latte"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Category *</label>
                                    <select
                                        name="category_id" value={form.category_id} onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Price (฿) *</label>
                                        <input
                                            type="number" name="base_price" value={form.base_price} onChange={handleChange}
                                            placeholder="120"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Calories</label>
                                        <input
                                            type="number" name="calories" value={form.calories} onChange={handleChange}
                                            placeholder="220"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
                                    <textarea
                                        name="description" value={form.description} onChange={handleChange}
                                        rows={3} placeholder="Short description..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Image URL</label>
                                    <input
                                        name="image" value={form.image} onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                    />
                                </div>

                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox" name="is_featured"
                                            checked={form.is_featured === 1}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-brown"
                                        />
                                        <span className="text-sm text-gray-600 font-medium">Featured</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox" name="is_available"
                                            checked={form.is_available === 1}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-brown"
                                        />
                                        <span className="text-sm text-gray-600 font-medium">Available</span>
                                    </label>
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-semibold hover:border-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-brown text-white text-sm font-semibold hover:bg-brown-dark transition-all disabled:opacity-50"
                                        style={{ boxShadow: '0 4px 15px rgba(123,59,42,0.3)' }}
                                    >
                                        {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Product'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}