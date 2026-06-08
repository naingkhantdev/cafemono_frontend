import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Order from './pages/Order'
import Login from './pages/Login'
import Register from './pages/Register'

import AdminRoute from './components/AdminRoute'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AdminCategories from './pages/admin/Categories'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public routes (with Navbar + Footer) ── */}
        <Route path="/" element={
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1"><Home /></main>
            <Footer />
          </div>
        } />
        <Route path="/menu" element={
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1"><Menu /></main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1"><About /></main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1"><Contact /></main>
            <Footer />
          </div>
        } />
        <Route path="/order" element={
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1"><Order /></main>
            <Footer />
          </div>
        } />

        {/* ── Auth routes (no Navbar/Footer) ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Admin routes (AdminLayout only, no public Navbar/Footer) ── */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout><Dashboard /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <AdminLayout><AdminOrders /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminLayout><AdminProducts /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/categories" element={
          <AdminRoute>
            <AdminLayout><AdminCategories /></AdminLayout>
          </AdminRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}