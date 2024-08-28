import { useState } from 'react'
import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACESS_TOKEN } from "../constants"
import { useState, useEffect } from 'react'

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => {
            setIsAuthorized(false)
        })
    }, [])

    if (isAuthorized === null) {
        return <div>Loading... </div>
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    const accessToken = localStorage.getItem(ACESS_TOKEN)
    if (!accessToken) {
        return <Navigate to="/login" />
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute