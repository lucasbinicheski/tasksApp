import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { usePatchTasks } from 'src/hooks/tasks/usePatchTasks'
import { usePostTasks } from 'src/hooks/tasks/usePostTasks'
import { tasksValidationSchema } from 'src/utils/validators/tasks'
import ModalComTitulo from '../../ModalComTitulo/index'

const ModalAddEditTasks = ({
    handleFecharModalAddEditTasks,
    abrirModalAddEditTasks,
    tarefa = {},
    getTasks,
    viewTask,
}) => {
    const { postAddTask, loadingAddTasks, erroAddTasks, sucessoAddTask } = usePostTasks()
    const { patchEditTask, loadingEditTasks, erroEditTasks, sucessoEditTask } = usePatchTasks()
    const disabled = viewTask ? true : false

    const handleSubmitTasks = async (data) => {
        {
            tarefa ? await patchEditTask(data, tarefa.id) : await postAddTask(data)
        }
    }

    React.useEffect(() => {
        if (sucessoAddTask || sucessoEditTask) {
            handleFecharModalAddEditTasks()
            getTasks()
        }
    }, [sucessoAddTask, sucessoEditTask])

    return (
        <ModalComTitulo
            open={abrirModalAddEditTasks}
            onClose={handleFecharModalAddEditTasks}
            titulo={viewTask ? 'Visualizar Tarefa' : tarefa ? 'Editar Tarefa' : 'Adicionar Tarefa'}
        >
            <Formik
                initialValues={{
                    title: tarefa?.title || '',
                    description: tarefa?.description || '',
                    done: tarefa?.done || false,
                }}
                onSubmit={handleSubmitTasks}
                validationSchema={tasksValidationSchema}
            >
                {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid spacing={2} container={true}>
                                <Grid item={true} xs={7}>
                                    <Typography variant='subtitle1'>Título</Typography>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        onChange={(e) => {
                                            //permite no maximo 120 caracteres
                                            if (values.title.length < 120) {
                                                setFieldValue('title', e.target.value)
                                            }
                                        }}
                                        name='title'
                                        value={values.title}
                                        disabled={disabled}
                                    />
                                    {errors.title && (
                                        <Typography variant='caption' color='error'>
                                            {errors.title}
                                        </Typography>
                                    )}
                                </Grid>
                                {tarefa && (
                                    <Grid item={true} xs={4} style={{ marginLeft: 12 }}>
                                        <Typography variant='subtitle1'>Status</Typography>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(e) => {
                                                            if (e.target.checked) setFieldValue('done', true)
                                                            else setFieldValue('done', false)
                                                        }}
                                                        checked={values.done == true}
                                                        color='primary'
                                                        size='small'
                                                        disabled={disabled}
                                                    />
                                                }
                                                label='Concluída'
                                            />
                                        </Box>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(e) => {
                                                            if (e.target.checked) setFieldValue('done', false)
                                                            else setFieldValue('done', true)
                                                        }}
                                                        checked={values.done == false}
                                                        color='primary'
                                                        size='small'
                                                        disabled={disabled}
                                                    />
                                                }
                                                label='Pendente'
                                            />
                                        </Box>
                                    </Grid>
                                )}
                                <Grid item={true} xs={12}>
                                    <Typography variant='subtitle1'>Descrição</Typography>
                                    <TextField
                                        variant='outlined'
                                        multiline
                                        rows={4}
                                        fullWidth
                                        onChange={handleChange}
                                        name='description'
                                        value={values.description}
                                        disabled={disabled}
                                    />
                                    {errors.description && (
                                        <Typography variant='caption' color='error'>
                                            {errors.description}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>

                            {erroAddTasks && (
                                <Box display='flex' justifyContent='center' alignItems='center' gridGap={10} mt={3}>
                                    <Typography variant='subtitle2' color='error'>
                                        {erroAddTasks}
                                    </Typography>
                                </Box>
                            )}
                            {erroEditTasks && (
                                <Box display='flex' justifyContent='center' alignItems='center' gridGap={10} mt={3}>
                                    <Typography variant='subtitle2' color='error'>
                                        {erroEditTasks}
                                    </Typography>
                                </Box>
                            )}
                            <Box display='flex' justifyContent='center' alignItems='center' gridGap={10} mt={3}>
                                {!disabled && (
                                    <Button type='submit' color='primary' variant='contained' size='small'>
                                        {loadingAddTasks || loadingEditTasks
                                            ? 'Carregando...'
                                            : tarefa
                                            ? 'Editar'
                                            : 'Adicionar'}
                                    </Button>
                                )}
                                <Button
                                    style={{ textTransform: 'capitalize', marginLeft: 6, backgroundColor: '#4B4B4B' }}
                                    type='button'
                                    variant='contained'
                                    onClick={handleFecharModalAddEditTasks}
                                    size='small'
                                >
                                    Fechar
                                </Button>
                            </Box>
                        </form>
                    )
                }}
            </Formik>
        </ModalComTitulo>
    )
}

export default ModalAddEditTasks
