import '../../../styles/global/btnStyle.css';
import '../style/buttonContainerStyle.css';

import {useNavigate} from 'react-router-dom';

interface interfaceProps {
    id?: string,
    type?: "submit" | "button" | "reset",
    nav?: string | number,
    styleClassName: string,
    mainClassName: string,
    text?: string,
    disabled?: boolean,
    ariaBusy?: boolean,
    ariaLabel?: string,
    onClick?: () => void,
}


export default function NextButton({id, nav, type, styleClassName, mainClassName, text, disabled, ariaBusy, ariaLabel, onClick} : interfaceProps) {
  const navigate = useNavigate();
  
    const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (typeof nav === 'number') {
      navigate(nav);
    } else if (typeof nav === 'string') {
      navigate(nav);
    }
  };

  return (
    <div className='buttonContainerStyle'>
      <button id={id} type={type} className={`button ${styleClassName} ${mainClassName}`} onClick={handleClick} aria-busy={ariaBusy} aria-label={ariaLabel} disabled={disabled} >
      {text} 
      </button>
    </div>

  );
}
