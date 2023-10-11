import React from 'react'
import { patchTask } from 'src/services/tasksHelper'

export const usePatchTasks = () => {
    const [loadingEditTasks, setLoadingEditTasks] = React.useState(false)
    const [erroEditTasks, setErroEditTasks] = React.useState()
    const [sucessoEditTask, setSucessoEditTask] = React.useState(false)
    const patchEditTask = async (data, id) => {
        try {
            setSucessoEditTask(false)
            setLoadingEditTasks(true)
            let response = await patchTask(id, data)
            setLoadingEditTasks(false)
            setErroEditTasks()
            setSucessoEditTask(true)
        } catch ({ response }) {
            let msgErro = 'Ocorreu um erro ao editar a tarefa.'
            if (response) {
                if (response.data?.message) {
                    msgErro = response.data.message
                }
            }
            setErroEditTasks(msgErro)
            setLoadingEditTasks(false)
            setSucessoEditTask(false)
        }
    }

    return { patchEditTask, loadingEditTasks, erroEditTasks, sucessoEditTask }
}
