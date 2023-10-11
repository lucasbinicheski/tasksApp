import React from 'react'
import { API } from 'src/services/api'

const AuthContext = React.createContext({})
export default AuthContext

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = React.useState(JSON.parse(localStorage.getItem('access_token')) || '')

    const doLogin = (access_token) => {
        localStorage.setItem('access_token', JSON.stringify(access_token))
        setToken(access_token)
    }

    const signOut = () => {
        setToken('')
        localStorage.clear()
        sessionStorage.clear()
    }

    API.interceptors.request.use(
        (request) => {
            const chave = JSON.parse(localStorage.getItem('access_token')) || ''
            API.defaults.headers['Authorization'] = `Bearer ${chave}`
            return request
        },
        async function (error) {
            return Promise.reject(error)
        }
    )

    //se retornar 401, manda para login
    API.interceptors.response.use(
        (response) => {
            return response
        },
        async function (error) {
            if (error?.response?.status === 401 && error?.response?.data?.error == 'token_expired') {
                signOut()
                window.location.href = '/login'
                return response
            }
            return Promise.reject(error)
        }
    )

    const authContextValue = {
        token,
        doLogin,
        signOut,
    }

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
