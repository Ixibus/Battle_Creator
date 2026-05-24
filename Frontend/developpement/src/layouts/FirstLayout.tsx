import { Outlet } from "react-router-dom";
import useThemeStore from "../store/useThemeStore";

import "./FirstLayout.css";

export default function OnboardingLayout() {
  // Store du thème, on récupère l'état et l'action
  const isDarkModeState = useThemeStore((state) => state.isDarkMode);
  const setTheme = useThemeStore((state) => state.toggleDarkMode);

  return (
    <main id="page" className="firstLayoutContainer">
      <Outlet />
    </main>
  );
}
