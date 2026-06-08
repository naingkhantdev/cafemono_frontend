import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div
                    className="w-8 h-8 rounded-full animate-spin"
                    style={{ border: '3px solid #E8C99A', borderTopColor: '#7B3B2A' }}
                />
            </div>
        )
    }

    if (!user) return <Navigate to="/login" replace />
    if (user.role !== 'admin' && user.role !== 'staff') {
        return <Navigate to="/" replace />
    }

    return children
}