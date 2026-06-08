import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { useState } from 'react'

const navItems = [
    { label: 'Dashboard', to: '/admin', icon: '📊' },
    { label: 'Orders', to: '/admin/orders', icon: '🧾' },
    { label: 'Products', to: '/admin/products', icon: '☕' },
    { label: 'Categories', to: '/admin/categories', icon: '📂' },
]

export default function AdminLayout({ children }) {
    const { pathname } = useLocation()
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <motion.aside
                animate={{ width: collapsed ? 72 : 240 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-cafe-black flex flex-col fixed top-0 left-0 bottom-0 z-40 overflow-hidden"
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
                    <div className="w-9 h-9 rounded-full border-2 border-brown flex items-center justify-center flex-shrink-0">
                        <span className="text-brown font-bold text-[7px] text-center leading-tight font-serif">
                            CAFE<br />MONO
                        </span>
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-serif font-bold text-white text-base whitespace-nowrap"
                        >
                            Admin Panel
                        </motion.span>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = pathname === item.to ||
                            (item.to !== '/admin' && pathname.startsWith(item.to))
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                                style={{
                                    background: active ? '#7B3B2A' : 'transparent',
                                    color: active ? 'white' : 'rgba(255,255,255,0.5)',
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) e.currentTarget.style.background = 'transparent'
                                }}
                            >
                                <span className="text-lg flex-shrink-0">{item.icon}</span>
                                {!collapsed && (
                                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* User + collapse */}
                <div className="border-t border-white/10 p-3 flex flex-col gap-2">
                    {!collapsed && (
                        <div className="px-2 py-2">
                            <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
                            <p className="text-white/40 text-xs truncate">{user?.role}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/06 transition-all w-full"
                    >
                        <span className="text-lg flex-shrink-0">🚪</span>
                        {!collapsed && <span className="text-sm">Logout</span>}
                    </button>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/30 hover:text-white transition-all w-full"
                    >
                        <span className="text-sm flex-shrink-0">{collapsed ? '→' : '←'}</span>
                        {!collapsed && <span className="text-xs">Collapse</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main content */}
            <main
                className="flex-1 transition-all duration-300"
                style={{ marginLeft: collapsed ? 72 : 240 }}
            >
                {/* Top bar */}
                <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30"
                    style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
                >
                    <div>
                        <h1 className="font-serif text-xl font-bold text-cafe-black">
                            {navItems.find((n) =>
                                n.to === pathname ||
                                (n.to !== '/admin' && pathname.startsWith(n.to))
                            )?.label || 'Dashboard'}
                        </h1>
                        <p className="text-gray-400 text-xs mt-0.5">CafeMono Admin Panel</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="text-xs text-brown font-semibold hover:underline"
                        >
                            ← View Site
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-brown flex items-center justify-center text-white text-xs font-bold">
                            {user?.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="p-8">{children}</div>
            </main>
        </div>
    )
}