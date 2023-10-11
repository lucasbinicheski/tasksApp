import { API } from './api'

export const loginToken = (username, password) => {
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)
    return API.post('/auth/login', body)
}

export const registerUser = (username, password) => {
    let body = {
        username,
        password,
    }
    return API.post('/user/register', body)
}
