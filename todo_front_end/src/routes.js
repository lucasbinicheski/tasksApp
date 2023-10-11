import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import DashboardLayout from './layouts/dashboard'
import SimpleLayout from './layouts/simple'
//
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import Page404 from './pages/Page404'
import SignUp from './sections/auth/signup/SignUpForm'
import TasksPage from './pages/TasksPage'

// ----------------------------------------------------------------------

export default function Router() {
    const { token } = useAuth()
    const isLogged = token ? true : false
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                //rotas privadas
                { path: 'tasks', element: isLogged ? <TasksPage /> : <Navigate to='/login' replace /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to='/dashboard/app/tasks' />, index: true },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to='/404' /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to='/404' replace />,
        },
    ])

    return routes
}
