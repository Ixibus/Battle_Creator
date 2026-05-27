import '../../styles/global/inputContainerStyle.css'
import '../../styles/global/inputLabelStyle.css'
import '../../styles/global/inputItemStyle.css'
import type { ChangeEventHandler } from 'react';

type InputType = "text" | "password" | "email";

export enum InputLabelStyle {
  style1 = "inputLabelStyle",
  style2 = "inputLabelStyle2",
  style3 = "inputLabelStyle3",
}

export enum InputItemStyle {
  style1 = "inputItemStyle",
  style2 = "inputItemStyle2",
  style3 = "inputItemStyle3",
}

interface InputContainerProps {
  inputLabelStyle: InputLabelStyle;
  labelName: string;
  inputItemStyle: InputItemStyle;
  htmlFor: string;
  className?: string;
  value?: string,
  type: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function InputContainer({
  className = "inputContainerStyle",
  inputLabelStyle,
  labelName,
  inputItemStyle,
  htmlFor,
  value,
  type,
  onChange
}: InputContainerProps) {
  return (
    <div className={className}>
      <label className={inputLabelStyle} htmlFor={htmlFor}>{labelName}</label>
      <input className={inputItemStyle} value={value} type={type} name={htmlFor} id={htmlFor} onChange={onChange} />
    </div>
  );
}
