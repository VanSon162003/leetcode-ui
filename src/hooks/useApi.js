"use client"

import { useState, useEffect, useCallback } from "react"

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const memoizedApiCall = useCallback(apiCall, [apiCall, ...dependencies])

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await memoizedApiCall()

        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "An error occurred")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [memoizedApiCall])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await memoizedApiCall()
      setData(result)
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = async (operation) => {
    try {
      setLoading(true)
      setError(null)
      const result = await operation()
      return result
    } catch (err) {
      setError(err.message || "An error occurred")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, execute }
}
