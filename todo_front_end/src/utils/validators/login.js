import { yup } from './yup'

export const tasksValidationSchema = yup.object().shape({
    title: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
})
