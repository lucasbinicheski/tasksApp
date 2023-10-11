import * as React from 'react'
import { Helmet } from 'react-helmet-async'
// @mui
import { Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
// hooks
import useResponsive from '../hooks/useResponsive'
// components
import Logo from '../components/logo'
// sections
import { SignUpForm } from 'src/sections/auth/signup'
import { LoginForm } from '../sections/auth/login'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}))

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}))

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function LoginPage() {
    const mdUp = useResponsive('up', 'md')
    const [openSignUp, setOpenSignUp] = React.useState(false)
    const [messagem, setMessagem] = React.useState('')
    return (
        <>
            <Helmet>
                <title> Login | Tarefas App </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
                            Olá, Bem-vindo de volta
                        </Typography>
                        <img src='/assets/illustrations/illustration_login.png' alt='login' />
                    </StyledSection>
                )}

                <Container maxWidth='sm'>
                    <StyledContent>
                        <Typography variant='h4' gutterBottom>
                            Tarefas App
                        </Typography>

                        {!openSignUp ? (
                            <>
                                <Typography variant='body2' sx={{ mb: 3 }}>
                                    Não tem uma conta? &nbsp;
                                    <Link
                                        variant='subtitle2'
                                        onClick={() => setOpenSignUp(true)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Registre-se
                                    </Link>
                                </Typography>
                                {messagem && (
                                    <Typography variant='body2' style={{ color: 'green' }} sx={{ mb: 2 }}>
                                        {messagem}
                                    </Typography>
                                )}
                                <LoginForm />
                            </>
                        ) : (
                            <SignUpForm setOpenSignUp={setOpenSignUp} setMessagem={setMessagem} />
                        )}
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    )
}
