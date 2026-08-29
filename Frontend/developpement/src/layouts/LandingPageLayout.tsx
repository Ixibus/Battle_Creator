import { Outlet } from "react-router-dom";

import "./landingPageLayout.css";

export default function LandingPageLayout() {
  return (
    <main id="page" className="landingPageLayoutContainer">
      <Outlet />
    </main>
  );
}
