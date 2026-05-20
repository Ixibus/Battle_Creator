import "./iconeStyle.css";

export enum StyleType {
  style1 = "iconeStyle",
  style2 = "iconeStyle2",
  style3 = "iconeStyle3",
}

interface PropType {
  srcIcone: string;
  styleType: StyleType;
}

export default function Icone({ srcIcone, styleType }: PropType) {
  return <img src={srcIcone} className={styleType} />;
}