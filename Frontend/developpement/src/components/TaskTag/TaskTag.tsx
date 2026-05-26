import '../../styles/global/btnStyle.css';
import './taskTagStyle.css';

interface interfaceProps {
    btnStyle: string,
    mainClassName: string,
    text: string
}

export default function TaskTag({btnStyle, mainClassName, text} : interfaceProps) {
  return (
    <div className='taskTagContainerStyle'>
      <button className={`button ${btnStyle} ${mainClassName}`}>
      {text} 
      </button>
    </div>
  );
}
