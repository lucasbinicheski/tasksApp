import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// RoutesApp
import RoutesApp from './routes'
// theme
import ThemeProvider from './theme'
import { AuthContextProvider } from './context/AuthContext'
// components

// ----------------------------------------------------------------------

export default function App() {
    return (
        <AuthContextProvider>
            <HelmetProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <RoutesApp />
                    </ThemeProvider>
                </BrowserRouter>
            </HelmetProvider>
        </AuthContextProvider>
    )
}
