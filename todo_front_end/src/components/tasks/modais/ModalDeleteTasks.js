import React from 'react'
import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import { deleteTask } from 'src/services/tasksHelper'
import ModalComTitulo from '../../ModalComTitulo'

const ModalDeleteTasks = (
    //props do modal
    { openModalDeleteTasks, handleCloseModalDeleteTasks, id, tarefa, getTasks }
) => {
    const [loadingDeleteTask, setLoadingDeleteTask] = React.useState(false)
    const [erroDeleteTask, setErroDeleteTask] = React.useState(false)
    const handleClickDelete = async () => {
        {
            setLoadingDeleteTask(true)
            await deleteTask(id)
                .then((response) => {
                    handleCloseModalDeleteTasks()
                    getTasks()
                })
                .catch((error) => {
                    setErroDeleteTask(true)
                })
                .finally(() => {
                    setLoadingDeleteTask(false)
                })
        }
    }

    return (
        <ModalComTitulo open={openModalDeleteTasks} onClose={handleCloseModalDeleteTasks} titulo={'Deletar Tarefa '}>
            <Grid container spacing={4} center style={{ textAlign: 'center' }}>
                <Grid item xs={12} sm={12}>
                    {erroDeleteTask && (
                        <Box padding={2} display='flex' justifyContent='center' alignItems='center'>
                            <Typography variant='body1' color='error'>
                                Ocorreu um erro ao deletar tarefa
                            </Typography>
                        </Box>
                    )}
                    <Typography style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: 5 }}>
                        Tem certeza que deseja deletar Tarefa?
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        onClick={() => handleClickDelete()}
                        size='small'
                        variant='outlined'
                        // color="primary"
                        style={{
                            color: 'white',
                            backgroundColor: 'red',
                            textTransform: 'capitalize',
                            marginRight: '2%',
                        }}
                    >
                        {loadingDeleteTask === true ? <CircularProgress size={20} /> : 'Deletar'}
                    </Button>

                    <Button
                        size='small'
                        variant='contained'
                        style={{ textTransform: 'capitalize', backgroundColor: '#4B4B4B', color: 'white' }}
                        onClick={handleCloseModalDeleteTasks}
                    >
                        Fechar
                    </Button>
                </Grid>
            </Grid>
        </ModalComTitulo>
    )
}

export default ModalDeleteTasks
