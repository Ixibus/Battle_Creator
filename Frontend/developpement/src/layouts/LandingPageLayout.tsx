import { Outlet } from "react-router-dom";
import useThemeStore from "../store/useThemeStore";

import "./landingPageLayout.css";

export default function LandingPageLayout() {
  // Store du thème, on récupère l'état et l'action
  const isDarkModeState = useThemeStore((state) => state.isDarkMode);
  const setTheme = useThemeStore((state) => state.toggleDarkMode);

  return (
    <main id="page" className="landingPageLayoutContainer">
      <Outlet />
    </main>
  );
}
