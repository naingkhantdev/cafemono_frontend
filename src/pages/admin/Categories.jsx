import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../api/axios'

const emptyForm = { name: '', description: '', display_order: 0, is_active: 1 }

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editing, setEditing] = useState(null)
    const [saving, setSaving] = useState(false)

    const fetchCategories = () => {
        setLoading(true)
        api.get('/categories')
            .then((res) => setCategories(res.data?.data || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchCategories() }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const openAdd = () => {
        setEditing(null)
        setForm(emptyForm)
        setShowForm(true)
    }

    const openEdit = (cat) => {
        setEditing(cat.id)
        setForm({
            name: cat.name,
            description: cat.description || '',
            display_order: cat.display_order,
            is_active: cat.is_active,
        })
        setShowForm(true)
    }

    const handleSave = async () => {
        if (!form.name) { alert('Name is required.'); return }
        setSaving(true)
        try {
            if (editing) {
                await api.put(`/categories/${editing}`, form)
            } else {
                await api.post('/categories', form)
            }
            setShowForm(false)
            fetchCategories()
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category?')) return
        try {
            await api.delete(`/categories/${id}`)
            setCategories((prev) => prev.filter((c) => c.id !== id))
        } catch {
            alert('Failed to delete.')
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{categories.length} categories total</p>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openAdd}
                    className="px-5 py-2.5 bg-brown text-white rounded-xl text-sm font-semibold hover:bg-brown-dark transition-all"
                    style={{ boxShadow: '0 4px 15px rgba(123,59,42,0.3)' }}
                >
                    + Add Category
                </motion.button>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div
                        className="w-8 h-8 rounded-full mx-auto animate-spin"
                        style={{ border: '3px solid #E8C99A', borderTopColor: '#7B3B2A' }}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(0,0,0,0.10)' }}
                            className="bg-white rounded-2xl p-5 cursor-default transition-shadow"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        >
                            <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-xl mb-3">
                                ☕
                            </div>
                            <h3 className="font-serif font-bold text-cafe-black text-base mb-1">{cat.name}</h3>
                            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{cat.description || 'No description'}</p>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${cat.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                    {cat.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-gray-300 text-xs">#{cat.display_order}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(cat)}
                                    className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="flex-1 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
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
                            className="bg-white rounded-3xl p-7 w-full max-w-md"
                            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}
                        >
                            <h2 className="font-serif text-xl font-bold text-cafe-black mb-6">
                                {editing ? 'Edit Category' : 'Add Category'}
                            </h2>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Name *</label>
                                    <input
                                        name="name" value={form.name} onChange={handleChange}
                                        placeholder="e.g. Hot Coffee"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
                                    <textarea
                                        name="description" value={form.description} onChange={handleChange}
                                        rows={3} placeholder="Short description..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Display Order</label>
                                        <input
                                            type="number" name="display_order" value={form.display_order} onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Status</label>
                                        <select
                                            name="is_active" value={form.is_active} onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brown transition-colors"
                                        >
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                    </div>
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
                                        {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Category'}
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