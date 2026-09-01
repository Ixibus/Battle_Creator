import Icone, { StyleType } from "../Icones/Icone";
import "./connexionPageNav.css";

import Logout from "../../assets/icones/logout.svg?react";
import { useNavigate } from "react-router-dom";


export default function ConnexionPageNav() {
  
  const navigate = useNavigate();
  function goingBackToLandingPage(){
    navigate("/");
  }

  return (
    <div className="connexionPageNavContainerStyle">
      <div className="connexionPageNavLogoutContainer" onClick={() => goingBackToLandingPage()}>
        <p className="connexionPageNavLogoutText">Retour</p>
        <Icone SrcIcone={Logout} styleType={StyleType.style5} />
      </div>
    </div>
  );
}
