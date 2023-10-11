import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
// components
import { loginToken } from 'src/services/loginHelper'
import Iconify from '../../../components/iconify'
import { useAuth } from '../../../hooks/useAuth'

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [erro, setErro] = useState('')
    const { doLogin } = useAuth()

    const handleClick = async () => {
        try {
            setErro('')

            const loginTokenResponse = await loginToken(loginValue, passwordValue)
            if (loginTokenResponse?.data?.access_token) {
                await doLogin(loginTokenResponse?.data?.access_token)
                navigate('/dashboard/tasks', { replace: true })
            }
        } catch ({ response }) {
            let msgErro = 'Não foi possível se conectar com o servidor'
            if (typeof response?.data?.message == 'string') {
                msgErro = response?.data?.message
            }
            setErro(msgErro)
        } finally {
        }
    }

    return (
        <>
            <Stack spacing={3}>
                <TextField
                    name='user'
                    label='Usuário'
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                />

                <TextField
                    name='password'
                    label='Senha'
                    type={showPassword ? 'text' : 'password'}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <LoadingButton
                sx={{ my: 2 }}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                onClick={handleClick}
            >
                Entrar
            </LoadingButton>
        </>
    )
}
