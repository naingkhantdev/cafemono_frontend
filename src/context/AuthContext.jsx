import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // On app load, check if token exists and fetch user
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.get('/me')
                .then((res) => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('token')
                    setUser(null)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const login = async (email, password) => {
        const res = await api.post('/login', { email, password })
        localStorage.setItem('token', res.data.token)
        setUser(res.data.user)
        return res.data
    }

    const register = async (name, email, password, password_confirmation, phone) => {
        const res = await api.post('/register', {
            name,
            email,
            password,
            password_confirmation,
            phone,
        })
        localStorage.setItem('token', res.data.token)
        setUser(res.data.user)
        return res.data
    }

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch (_) { }
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}