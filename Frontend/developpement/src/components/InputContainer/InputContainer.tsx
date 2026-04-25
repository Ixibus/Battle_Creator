import '../../styles/global/inputContainer.css'
import '../../styles/global/inputBorderStyle.css'
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
  className = "inputContainer",
  labelName,
  htmlFor,
  value,
  type,
  onChange
}: InputContainerProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <input className="inputBorderStyle" value={value} type={type} name={htmlFor} id={htmlFor} onChange={onChange} />
    </div>
  );
}
