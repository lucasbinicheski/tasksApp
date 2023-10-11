import React from 'react'
import { getTask } from 'src/services/tasksHelper'

export const useGetTasks = () => {
    const [tasks, setTasks] = React.useState([])
    const [loadingTasks, setLoadingTasks] = React.useState(false)
    const [erroTasks, setErroTasks] = React.useState()
    const getTasks = async () => {
        try {
            setLoadingTasks(true)
            let response = await getTask()
            setTasks(response.data)
            setLoadingTasks(false)
            setErroTasks()
        } catch ({ response }) {
            let msgErro = 'Ocorreu um erro ao carregar as tarefas.'
            if (response) {
                if (response.data?.message) {
                    msgErro = response.data.message
                }
            }
            setTasks()
            setErroTasks(msgErro)
            setLoadingTasks(false)
        }
    }

    return { getTasks, tasks, loadingTasks, erroTasks }
}
