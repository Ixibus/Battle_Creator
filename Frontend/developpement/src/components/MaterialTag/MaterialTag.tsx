import '../../styles/global/btnStyle.css';
import './materialTagStyle.css';

interface interfaceProps {
    btnStyle: string,
    mainClassName: string,
    text: string
}

export default function MaterialTag({btnStyle, mainClassName, text} : interfaceProps) {
  return (
    <div className='materialTagContainerStyle'>
      <button className={`button ${btnStyle} ${mainClassName}`}>
      {text} 
      </button>
    </div>

  );
}
