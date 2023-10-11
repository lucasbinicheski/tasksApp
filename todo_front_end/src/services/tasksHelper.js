import { API } from './api'

export const getTask = () => {
    return API.get(`/task`)
}

export const postTask = (body) => {
    return API.post('/task', body)
}

export const patchTask = (id, body) => {
    return API.patch(`/task/${id}`, body)
}

export const deleteTask = async (id) => {
    return API.delete(`/task/${id}`)
}
