import "../../styles/global/inputContainerStyle.css";
import "../../styles/global/inputLabelStyle.css";
import "../../styles/global/inputItemStyle.css";

import type {
  ChangeEventHandler,
  FocusEventHandler,
} from "react";

interface DateInputContainerProps {
  labelName: string;
  htmlFor: string;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  hasError?: boolean;
}

export default function DateInputContainer({
  className = "inputContainerStyle",
  labelName,
  htmlFor,
  value = "",
  onChange,
  onBlur,
  hasError = false,
}: DateInputContainerProps) {
  return (
    <div className={className}>
      <label className="inputLabelStyle" htmlFor={htmlFor}>
        {labelName}
      </label>

      <input
        className={`inputItemStyle2 ${hasError ? "inputError" : ""}`}
        type="date"
        value={value}
        name={htmlFor}
        id={htmlFor}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}