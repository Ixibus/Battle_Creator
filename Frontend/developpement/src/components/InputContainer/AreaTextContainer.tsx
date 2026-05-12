import '../../styles/global/inputContainerStyle.css'
import '../../styles/global/inputItemStyle.css'
import type { ChangeEventHandler } from 'react';

type InputType = "text" | "password" | "email";

interface AreaContainerProps {
  className?: string;
  value?: string,
  htmlFor: string,
  labelName: string,
  cols: number;
  rows: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>;
}

export default function AreaTextContainer({
  className = "inputContainerStyle",
  value,
  htmlFor,
  labelName,
  cols,
  rows,
  onChange
}: AreaContainerProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <textarea name={htmlFor} id={htmlFor} className="inputItemStyle" cols={cols} rows={rows} onChange={onChange} />
    </div>
  );
}
