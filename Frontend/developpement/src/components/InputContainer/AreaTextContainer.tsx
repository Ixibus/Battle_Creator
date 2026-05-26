// import '../../styles/global/colors.css'
import '../../styles/global/inputContainerStyle.css'
import '../../styles/global/textAreaStyle.css'

import type { ChangeEventHandler } from 'react';

type InputType = "text" | "password" | "email";


export enum AreaLabelStyle {
  style1 = "inputLabelStyle",
  style2 = "inputLabelStyle2",
  style3 = "inputLabelStyle3",
}

export enum AreaTextStyle {
  style1 = "textAreaStyle",
  style2 = "textAreaStyle2",
  style3 = "textAreaStyle3",
}

interface AreaContainerProps {
  className?: string,
  areaLabelStyle: AreaLabelStyle,
  value?: string,
  areaTextStyle: AreaTextStyle,
  htmlFor: string,
  labelName: string,
  cols: number;
  rows: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>;
}

export default function AreaTextContainer({
  className = "inputContainerStyle",
  areaLabelStyle,
  value,
  areaTextStyle,
  htmlFor,
  labelName,
  cols,
  rows,
  onChange
}: AreaContainerProps) {
  return (
    <div className={className}>
      <label className={areaLabelStyle} htmlFor={htmlFor}>{labelName}</label>
      <textarea name={htmlFor} id={htmlFor} className={areaTextStyle} cols={cols} rows={rows} onChange={onChange} />
    </div>
  );
}
