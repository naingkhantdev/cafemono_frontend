import { useState, useEffect } from 'react'
import api from '../api/axios'

export function useOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchOrders = () => {
        setLoading(true)
        api.get('/orders')
            .then((res) => setOrders(res.data.data || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchOrders() }, [])

    return { orders, loading, error, refetch: fetchOrders }
}