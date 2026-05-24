import '../../styles/global/inputContainerStyle.css'
import '../../styles/global/inputLabelStyle.css'
import '../../styles/global/inputItemStyle.css'
import type { ChangeEventHandler } from 'react';

interface InputContainerProps {
  labelName: string;
  htmlFor: string;
  className?: string;
  value?: string,
  onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function DateInputContainer({
  className = "inputContainerStyle",
  labelName,
  htmlFor,
  value,
  onChange
}: InputContainerProps){
  return (
    <div className={className}>
      <label className="inputLabelStyle" htmlFor={htmlFor}>{labelName}</label>
      <input className="inputItemStyle2" type="date" value={value} name={htmlFor} id={htmlFor} onChange={onChange} />
    </div>
  );
}