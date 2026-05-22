import { Outlet } from 'react-router-dom'
import useThemeStore from '../store/useThemeStore'

import './layout.css'
import './onboardingLayout.css'


export default function OnboardingLayout() {
  // Store du thème, on récupère l'état et l'action
  const isDarkModeState = useThemeStore((state) => state.isDarkMode);
  const setTheme = useThemeStore((state) => state.toggleDarkMode);

  return (
        <div id="page" className='onboardingLayoutContainer'>
            <p>tets</p>
            <main className='onboardingLayoutMainContainer'>
                <Outlet />
            </main>
        </div>
  )
}