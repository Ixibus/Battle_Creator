import '../../../styles/global/btnStyle.css';
import '../style/buttonContainerStyle.css';

import {useNavigate} from 'react-router-dom';

interface interfaceProps {
    type?: "submit" | "button",
    nav?: string,
    styleClassName: string,
    mainClassName: string,
    text?: string
}


export default function NextButton({nav, type, styleClassName, mainClassName, text} : interfaceProps) {
  const navigate = useNavigate();
  
    const handleClick = () => {
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
