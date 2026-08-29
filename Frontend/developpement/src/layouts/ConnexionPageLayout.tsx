import { Outlet } from "react-router-dom";
import "./connexionPageLayout.css";
import ConnexionPageNav from "../components/ConnexionPageNav/ConnexionPageNav";

export default function ConnexionPageLayout() {

  return (
    // <div className="connexionPageLayoutContainer">
    <main id="page" className="connexionPageLayoutContainer">
      <ConnexionPageNav />
      <Outlet />
    </main>
    // </div>
  );
}
