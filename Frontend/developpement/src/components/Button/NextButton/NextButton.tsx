import '../../../styles/global/btnStyle.css';
import '../style/buttonContainerStyle.css';

import {useNavigate} from 'react-router-dom';

interface interfaceProps {
    id?: string,
    type?: "submit" | "button",
    nav?: string | number,
    styleClassName: string,
    mainClassName: string,
    text?: string,
    disabled?: boolean,
    onClick?: () => void,
}


export default function NextButton({id, nav, type, styleClassName, mainClassName, text, disabled, onClick} : interfaceProps) {
  const navigate = useNavigate();
  
    const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (typeof nav === 'number') {
      navigate(nav); // Appel à navigate(delta: number)
    } else if (typeof nav === 'string') {
      navigate(nav); // Appel à navigate(to: string)
    }
  };

  return (
    <div className='buttonContainerStyle'>
      <button id={id} type={type} className={`button ${styleClassName} ${mainClassName}`} onClick={handleClick} disabled={disabled}>
      {text} 
      </button>
    </div>

  );
}
