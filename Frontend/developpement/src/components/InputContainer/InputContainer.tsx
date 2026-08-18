import '../../styles/global/inputContainerStyle.css'
import '../../styles/global/inputLabelStyle.css'
import '../../styles/global/inputItemStyle.css'
import type { ChangeEventHandler, FocusEvent } from 'react';

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
  value?: string;
  type: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  hasAutoComplete?: boolean;
}

export default function InputContainer({
  className = "inputContainerStyle",
  inputLabelStyle,
  labelName,
  inputItemStyle,
  htmlFor,
  value,
  type,
  onChange,
  onBlur,
  hasError = false,
  hasAutoComplete = true
}: InputContainerProps) {
  return (
    <div className={className}>
      <label className={inputLabelStyle} htmlFor={htmlFor}>{labelName}</label>
      <input
        className={`${inputItemStyle} ${hasError ? "inputError" : ""}`}
        value={value}
        type={type}
        name={htmlFor}
        id={htmlFor}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={hasAutoComplete ? "new-password" : undefined}
      />
    </div>
  );
}