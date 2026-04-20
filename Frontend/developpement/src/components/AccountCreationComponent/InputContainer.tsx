import './inputContainer.css'


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
      <input className="inputStyle" type={type} name={htmlFor} id={htmlFor} />
    </div>
  );
}
