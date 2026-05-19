import "./iconeStyle.css";

type propType = {srcIcone : string}

export default function Icone({srcIcone}: propType) {
  return <img src={srcIcone} className="iconeStyle"/>;
}
