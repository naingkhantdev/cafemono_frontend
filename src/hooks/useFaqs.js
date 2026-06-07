import { useState, useEffect } from 'react'
import api from '../api/axios'

export function useFaqs() {
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.get('/faqs')
            .then((res) => setFaqs(res.data.data || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { faqs, loading, error }
}