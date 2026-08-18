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
  style9 = "iconeStyle9",
}


interface PropType {
  SrcIcone: React.FC<React.SVGProps<SVGSVGElement>>;
  styleType?: StyleType | string;
  onClick?: (() => void);
}




export default function Icone({ SrcIcone, styleType, onClick }: PropType) {
  return <SrcIcone className={styleType} onClick={onClick}/>;
}