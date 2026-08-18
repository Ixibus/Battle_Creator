import { Outlet } from "react-router-dom";
import useThemeStore from "../store/useThemeStore";

import "./connexionPageLayout.css";
import ConnexionPageNav from "../components/ConnexionPageNav/ConnexionPageNav";

export default function ConnexionPageLayout() {
  // Store du thème, on récupère l'état et l'action
  const isDarkModeState = useThemeStore((state) => state.isDarkMode);
  const setTheme = useThemeStore((state) => state.toggleDarkMode);

  return (
    // <div className="connexionPageLayoutContainer">
    <main id="page" className="connexionPageLayoutContainer">
      <ConnexionPageNav />
      <Outlet />
    </main>
    // </div>
  );
}
