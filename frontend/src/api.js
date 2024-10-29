import axios from "axios"
import {ACCESS_TOKEN} from "./constants"


const api = axios.create({
    baseURL: `http://127.0.0.1:8000` ? `http://127.0.0.1:8000`: `/choreo-apis/backend-807648536:8000`,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api