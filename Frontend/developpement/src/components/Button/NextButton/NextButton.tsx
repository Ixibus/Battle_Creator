import '../../../styles/global/btnStyle.css';
import '../style/buttonContainerStyle.css';

interface interfaceProps {
    type?: "submit",
    styleClassName: string,
    mainClassName: string,
    text?: string
}

export default function NextButton({type, styleClassName, mainClassName, text} : interfaceProps) {
  return (
    <div className='buttonContainerStyle'>
      <button type={type} className={`button ${styleClassName} ${mainClassName}`}>
      {text} 
      </button>
    </div>

  );
}
