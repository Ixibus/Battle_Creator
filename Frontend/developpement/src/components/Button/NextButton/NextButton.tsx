import '../../../styles/global/btnStyle.css';

interface interfaceProps {
    type?: "submit",
    styleClassName: string,
    mainClassName: string,
    text: string
}

export default function NextButton({type, styleClassName, mainClassName, text} : interfaceProps) {
  return (
    <button type={type} className={`button ${styleClassName} ${mainClassName}`}>
      {text} 
    </button>
  );
}
