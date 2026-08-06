// import '../../styles/global/colors.css'
import "../../styles/global/inputContainerStyle.css";
import "../../styles/global/textAreaStyle.css";

import type { ChangeEventHandler, FocusEventHandler } from "react";

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
  className?: string;
  htmlFor: string;
  areaLabelStyle: AreaLabelStyle;
  labelName: string;
  areaTextStyle: AreaTextStyle;
  cols: number;
  rows: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  hasError?: boolean;
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
  onChange,
  onBlur,
  hasError
}: AreaContainerProps) {
  return (
    <div className={className}>
      <label className={areaLabelStyle} htmlFor={htmlFor}>
        {labelName}
      </label>
      <textarea
        className={`${areaTextStyle} ${hasError ? "inputError" : ""}`}
        name={htmlFor}
        id={htmlFor}
        cols={cols}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
