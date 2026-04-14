import { Outlet } from 'react-router-dom'
import useThemeStore from '../store/useThemeStore'

import Header from '../components/Header'

export default function Layout() {
  // Store du thème, on récupère l'état et l'action
  const isDarkModeState = useThemeStore((state) => state.isDarkMode);
  const setTheme = useThemeStore((state) => state.toggleDarkMode);

  return (
        <div id="page" className={ isDarkModeState ? "dark" : "light" }>
            <Header
            key = "header"
            isDarkModeState = { isDarkModeState }
            setTheme = { setTheme }
            />
            <main>
                <Outlet />
            </main>
        </div>
  )
}