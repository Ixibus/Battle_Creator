import '../../styles/global/inputContainer.css'
import '../../styles/global/inputBorderStyle.css'

type InputType = "text" | "password";

interface InputContainerProps {
  labelName: string;
  htmlFor: string;
  className?: string;
  type: InputType;
}

export default function InputContainer({
  className = "inputContainer",
  labelName,
  htmlFor,
  type,
}: InputContainerProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <input className="inputBorderStyle" type={type} name={htmlFor} id={htmlFor} />
    </div>
  );
}
