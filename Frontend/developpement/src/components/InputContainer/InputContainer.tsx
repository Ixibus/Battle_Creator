import '../../styles/global/inputContainerStyle.css'
import '../../styles/global/inputLabelStyle.css'
import '../../styles/global/inputItemStyle.css'
import type { ChangeEventHandler } from 'react';

type InputType = "text" | "password" | "email";

interface InputContainerProps {
  labelName: string;
  htmlFor: string;
  className?: string;
  value?: string,
  type: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function InputContainer({
  className = "inputContainerStyle",
  labelName,
  htmlFor,
  value,
  type,
  onChange
}: InputContainerProps) {
  return (
    <div className={className}>
      <label className="inputLabelStyle" htmlFor={htmlFor}>{labelName}</label>
      <input className="inputItemStyle" value={value} type={type} name={htmlFor} id={htmlFor} onChange={onChange} />
    </div>
  );
}
