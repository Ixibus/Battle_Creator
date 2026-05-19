import "./iconeStyle.css";

import checked from "../../assets/icones/checked.svg";

type propType = {srcIcone : string}

export default function Icone({srcIcone}: propType) {
  return <img src={srcIcone} className="iconeStyle"></img>;
}
