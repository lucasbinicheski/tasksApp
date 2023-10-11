import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useStyles, Titulo } from './styles'

export default function ModalComTitulo({ titulo = '', children, open, onClose, mostrarTitulo = true, ...rest }) {
    const classes = useStyles()

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box className={classes.box} {...rest}>
                {mostrarTitulo && (
                    <Box className={classes.titulo}>
                        <Titulo>{titulo}</Titulo>
                    </Box>
                )}
                <Box className={classes.conteudo}>{children}</Box>
            </Box>
        </Modal>
    )
}
