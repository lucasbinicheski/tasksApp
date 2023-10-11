import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

export const Titulo = styled.h3`
    color: #255a95;
    padding-left: 19px;
    font-size: 20px;
    font-family: Cabin, Roboto, Arial, sans-serif;

    @media (max-width: 490px) {
        font-size: 18px;
    }
`

export const useStyles = makeStyles({
    box: {
        width: '100%',
        maxWidth: '704px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        boxShadow: 24,
        borderRadius: 8,
        border: '0px solid white',
        overflow: 'hidden',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    titulo: {
        backgroundColor: '#E6E6F2',
    },
    conteudo: {
        padding: '19px',
    },
})
