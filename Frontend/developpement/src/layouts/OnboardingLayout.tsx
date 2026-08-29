import { Outlet } from 'react-router-dom'
import './onboardingLayout.css'
import OnboardingProgressionBar from '../components/OnboardingProgressionBar/OnboardingProgressionBar';


export default function OnboardingLayout() {

  return (
        <main id="page" className='onboardingLayoutContainer'>
            <OnboardingProgressionBar/>
                <Outlet />
        </main>
  )
}