import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { registerUser } from 'src/services/loginHelper'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function SignUpForm({ setOpenSignUp, setMessagem }) {
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [messagemErro, setMessagemErro] = React.useState('')
    const [user, setUser] = React.useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        if (password !== password2) {
            setMessagemErro('As senhas não conferem')
            return
        }
        if (password.length === 0 || password2.length === 0) {
            setMessagemErro('A senha não pode ser vazia')
            return
        }
        if (user.length < 3) {
            setMessagemErro('O usuário deve ter no mínimo 3 caracteres')
            return
        }
        registerUser(user, password)
            .then((res) => {
                setMessagem('Usuário cadastrado com sucesso, faça login para continuar!')
                setOpenSignUp(false)
            })
            .catch((err) => {
                alert('Erro ao cadastrar usuário')
            })
            .finally(() => {
                setMessagemErro('')
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Cadastre sua conta
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='user'
                                    label='Usuário'
                                    name='username'
                                    autoComplete='username'
                                    onChange={(e) => {
                                        setUser(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Senha'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Confirme a senha'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    onChange={(e) => {
                                        setPassword2(e.target.value)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {messagemErro && <p style={{ color: 'red' }}>{messagemErro}</p>}
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Cadastrar
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link
                                    onClick={() => {
                                        setOpenSignUp(false)
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    variant='body2'
                                >
                                    Já tem conta? Entrar
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
