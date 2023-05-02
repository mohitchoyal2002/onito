import { Link, Outlet } from "react-router-dom"
import logo from '../assets/logo.png'
import headerCSS from '../style/header.module.css'
// import { useEffect } from "react";

const Header = () => {
  return (
    <div className={headerCSS.main}>
      <div className={headerCSS.fix}>
      <div className={headerCSS.header}>
          <Link to='/'><img src={logo} alt="" className={headerCSS.logo} /></Link>
      </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default Header