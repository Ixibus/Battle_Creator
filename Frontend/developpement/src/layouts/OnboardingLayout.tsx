import { Outlet } from 'react-router-dom';
import './onboardingLayout.css';
import OnboardingProgressionBar from '../components/OnboardingProgressionBar/OnboardingProgressionBar';

export default function OnboardingLayout() {
  return (
    <main id="page" className='onboardingLayoutContainer' aria-label="Parcours de création">
      <OnboardingProgressionBar />
      <Outlet />
    </main>
  );
}