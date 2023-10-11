import React from 'react'
import { postTask } from 'src/services/tasksHelper'

export const usePostTasks = () => {
    const [loadingAddTasks, setLoadingAddTasks] = React.useState(false)
    const [erroAddTasks, setErroAddTasks] = React.useState()
    const [sucessoAddTask, setSucessoAddTask] = React.useState(false)
    const postAddTask = async (data) => {
        try {
            setSucessoAddTask(false)
            setLoadingAddTasks(true)
            let response = await postTask(data)
            setLoadingAddTasks(false)
            setErroAddTasks()
            setSucessoAddTask(true)
        } catch ({ response }) {
            let msgErro = 'Ocorreu um erro ao adicionar a tarefa.'
            if (response) {
                if (response.data?.message) {
                    msgErro = response.data.message
                }
            }
            setErroAddTasks(msgErro)
            setLoadingAddTasks(false)
            setSucessoAddTask(false)
        }
    }

    return { postAddTask, loadingAddTasks, erroAddTasks, sucessoAddTask }
}
