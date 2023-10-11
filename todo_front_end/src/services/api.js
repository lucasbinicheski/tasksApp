import axios from 'axios'

export const API = axios.create({
    baseURL: process.env.REACT_APP_API_HELPER_URL,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
            : '',
    },
})

 