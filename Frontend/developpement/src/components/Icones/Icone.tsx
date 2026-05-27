import "./iconeStyle.css";

export enum StyleType {
  style1 = "iconeStyle",
  style2 = "iconeStyle2",
  style3 = "iconeStyle3",
  style4 = "iconeStyle4",
  style5 = "iconeStyle5",
  style6 = "iconeStyle6",
  style7 = "iconeStyle7",
  style8 = "iconeStyle8",
}

interface PropType {
  SrcIcone: React.FC<React.SVGProps<SVGSVGElement>>;
  styleType?: StyleType;
}

export default function Icone({ SrcIcone, styleType }: PropType) {
  return <SrcIcone className={styleType}/>;
}