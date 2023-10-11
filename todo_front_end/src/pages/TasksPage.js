import { filter } from 'lodash'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
// @mui
import {
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    IconButton,
    MenuItem,
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material'
// components
import Iconify from '../components/iconify'
import Label from '../components/label'
// sections
import { TasksListHead, TasksListToolbar } from '../sections/@dashboard/tasks'
// mock
import ModalAddEditTasks from 'src/components/tasks/modais/ModalAddEditTasks'
import ModalDeleteTasks from 'src/components/tasks/modais/ModalDeleteTasks'
import { useGetTasks } from 'src/hooks/tasks/useGetTasks'
import { usePatchTasks } from 'src/hooks/tasks/usePatchTasks'

const TABLE_HEAD = [
    { id: 'id', label: 'Número', align: 'center' },
    { id: 'title', label: 'Título', align: 'center' },
    { id: 'description', label: 'Descrição', align: 'center' },
    { id: 'status', label: 'Status', align: 'center', helpText: 'Clique para mudar o status' },
    { id: '' },
]

export default function TasksPage() {
    const [open, setOpen] = useState(null)
    const [page, setPage] = useState(0)
    const [selected, setSelected] = useState([])
    const [filterName, setFilterName] = useState('')
    const [abrirModalAddEditTasks, setOpenModalAddEditTasks] = useState(false)
    const [openModalDeleteTasks, setOpenModalDeleteTasks] = useState(false)
    const [idTask, setIdTask] = useState(null)
    const [taskBody, setTaskBody] = useState(null)
    const [tasksData, setTasksData] = useState([])
    const [viewTask, setViewTask] = useState(false)

    const { getTasks, tasks = [], loadingTasks, erroTasks } = useGetTasks()
    const { patchEditTask } = usePatchTasks()
    const handleOpenMenuTasks = (event) => {
        setOpen(event.currentTarget)
    }

    React.useEffect(() => {
        getTasks()
    }, [])

    React.useEffect(() => {
        setTasksData(tasks)
    }, [tasks])

    React.useEffect(() => {
        // filtra as tarefas pelo titulo
        const filteredTasks = filter(tasks, (task) => {
            let taskLower = task?.title?.toLowerCase()
            let filterLower = filterName?.toLowerCase()
            return taskLower.includes(filterLower)
        })
        setTasksData(filteredTasks)
    }, [filterName])

    const handleCloseMenu = () => {
        setOpen(null)
    }

    const handleFilterByName = (event) => {
        setPage(0)
        setFilterName(event.target.value)
    }

    const handleFecharModalAddEditTasks = () => {
        setOpenModalAddEditTasks(false)
        setTaskBody(null)
        setIdTask(null)
        setOpen(null)
        setViewTask(false)
    }

    const handleCloseModalDeleteTasks = () => {
        setOpenModalDeleteTasks(false)
        setIdTask(null)
        setOpen(null)
    }

    const handleDeleteTasks = () => {
        setOpenModalDeleteTasks(true)
    }

    const handleEditTasks = () => {
        setOpenModalAddEditTasks(true)
    }

    const handleViewTasks = () => {
        setOpenModalAddEditTasks(true)
        setViewTask(true)
    }
    const handleStatusTasks = (id, task) => {
        const body = {
            ...task,
            done: task?.done === false ? true : false,
        }
        patchEditTask(body, id)
            .then(() => {
                getTasks()
            })
            .catch(() => {
                alert('Ocorreu um erro ao mudar o status da tarefa.')
            })
    }

    return (
        <>
            <Helmet>
                <title> Tasks | Tarefas App </title>
            </Helmet>

            <Container>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
                    <Typography variant='h4' gutterBottom>
                        Tarefas
                    </Typography>
                </Stack>

                <Card style={{ borderRadius: '10px' }}>
                    <Button
                        variant='contained'
                        startIcon={<Iconify icon='eva:plus-fill' />}
                        sx={{ mt: 3, ml: 3 }}
                        onClick={() => setOpenModalAddEditTasks(true)}
                    >
                        Nova Tarefa
                    </Button>
                    <TasksListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />
                    <TableContainer sx={{ maxHeight: 440, overflowY: 'scroll' }}>
                        <Table>
                            <TasksListHead
                                headLabel={TABLE_HEAD}
                                rowCount={tasks.length}
                                numSelected={selected.length}
                            />
                            <TableBody>
                                {!loadingTasks &&
                                    tasks &&
                                    tasksData.map((task) => {
                                        return (
                                            <TableRow hover key={task?.id} tabIndex={-1}>
                                                <TableCell component='th' scope='row' padding='10px' align='center'>
                                                    <Typography variant='subtitle2' noWrap>
                                                        {task?.id}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align='center'>{task?.title}</TableCell>

                                                <TableCell
                                                    align='center'
                                                    style={{
                                                        maxWidth: '200px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {task?.description}
                                                </TableCell>

                                                <TableCell align='center'>
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            backgroundColor: 'transparent',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleStatusTasks(task?.id, task)}
                                                    >
                                                        <Label
                                                            color={(task?.done === false && 'error') || 'success'}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {(task?.done === false && 'Pendente') || 'Concluída'}
                                                        </Label>
                                                    </button>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    <IconButton
                                                        size='large'
                                                        color='inherit'
                                                        onClick={(event) => {
                                                            handleOpenMenuTasks(event)
                                                            setIdTask(task?.id)
                                                            setTaskBody(task)
                                                        }}
                                                    >
                                                        <Iconify icon={'eva:more-vertical-fill'} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>

                            {tasksData.length === 0 && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant='h6' paragraph>
                                                    Não foi possível encontrar a tarefa
                                                </Typography>

                                                <Typography variant='body2'>
                                                    Não foi possível encontrar a tarefa com o nome
                                                    <strong>&quot;{filterName}&quot;</strong>.
                                                    <br />
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                        {
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant='caption' color='error'>
                                    {erroTasks}
                                </Typography>
                            </Box>
                        }
                        {loadingTasks && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color='inherit' size={25} />
                            </Box>
                        )}
                    </TableContainer>
                </Card>
                <ModalAddEditTasks
                    handleFecharModalAddEditTasks={handleFecharModalAddEditTasks}
                    abrirModalAddEditTasks={abrirModalAddEditTasks}
                    tarefa={taskBody}
                    getTasks={getTasks}
                    viewTask={viewTask}
                />
                <ModalDeleteTasks
                    openModalDeleteTasks={openModalDeleteTasks}
                    handleCloseModalDeleteTasks={handleCloseModalDeleteTasks}
                    id={idTask}
                    getTasks={getTasks}
                />
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleViewTasks()}>
                    <Iconify icon={'ic:baseline-view-day'} sx={{ mr: 2 }} />
                    Visualizar
                </MenuItem>
                <MenuItem onClick={() => handleEditTasks()}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Editar
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteTasks()}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Deletar
                </MenuItem>
            </Popover>
        </>
    )
}
