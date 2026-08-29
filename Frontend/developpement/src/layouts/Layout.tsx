import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'

import './layout.css'


export default function Layout() {

  return (
        <div id="page" className='layoutContainer { isDarkModeState ? "dark" : "light"}'>
            <Nav/>
            <main className='mainContainer'>
                <Outlet />
            </main>
        </div>
  )
}