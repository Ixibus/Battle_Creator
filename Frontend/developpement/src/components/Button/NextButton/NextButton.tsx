import '../../../styles/global/btnStyle.css';
import './nextButtonStyle.css'

interface interfaceProps {
    type?: "submit",
    styleClassName: string,
    mainClassName: string,
    text?: string
}

export default function NextButton({type, styleClassName, mainClassName, text} : interfaceProps) {
  return (
    <div className='nextButtonContainerStyle'>
      <button type={type} className={`button ${styleClassName} ${mainClassName}`}>
      {text} 
      </button>
    </div>

  );
}
