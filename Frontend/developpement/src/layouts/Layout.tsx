import { Outlet } from 'react-router-dom'
import useThemeStore from '../store/useThemeStore'

import './Layout.css'

import Header from '../components/Header'

export default function Layout() {
  // Store du thème, on récupère l'état et l'action
  const isDarkModeState = useThemeStore((state) => state.isDarkMode);
  const setTheme = useThemeStore((state) => state.toggleDarkMode);

  return (
        <div id="page" className='layoutContainer { isDarkModeState ? "dark" : "light"}'>
            <Header
            key = "header"
            isDarkModeState = { isDarkModeState }
            setTheme = { setTheme }
            />
            <main className='mainContainer'>
                <Outlet />
            </main>
        </div>
  )
}