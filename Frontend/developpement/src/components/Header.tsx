import { NavLink } from "react-router-dom";

import type { typeProps } from '../types/props.d'

export default function Header(props: typeProps) {
    return (
    <nav className={props.isDarkModeState ? "dark" : "light"}>
          <NavLink to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >My Preconf REACT</NavLink>
          <button
            onClick={() => props.setTheme()}
            className={props.isDarkModeState ? "dark" : "light"}
          >
            {props.isDarkModeState ? "☀️" : "🌙"}
          </button>
    </nav>
    )
}