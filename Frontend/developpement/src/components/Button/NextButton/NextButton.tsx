import '../../../styles/global/btnStyle.css';
import '../style/buttonContainerStyle.css';

import {useNavigate} from 'react-router-dom';

interface interfaceProps {
    type?: "submit" | "button",
    nav?: number,
    styleClassName: string,
    mainClassName: string,
    text?: string,
    onClick?: () => void,
}


export default function NextButton({nav, type, styleClassName, mainClassName, text, onClick} : interfaceProps) {
  const navigate = useNavigate();
  
    const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (nav) navigate(nav);
  };

  return (
    <div className='buttonContainerStyle'>
      <button type={type} className={`button ${styleClassName} ${mainClassName}`} onClick={handleClick}>
      {text} 
      </button>
    </div>

  );
}
