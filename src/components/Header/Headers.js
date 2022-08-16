import React from "react";
import { NavLink } from "react-router-dom";
import header from './Header.module.css';
import app from '../App/App.module.css';

function Header({image}) {

  return(
    <header className={header.header}>
      <div className={header.flex_container}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h1 className={header.title}>ARMAGGEDON V2</h1>
          <p className={header.subtitle}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</p>
        </div>
        <nav className={`${app.flex} ${header.nav}`}>
          <NavLink exact to="/" activeClassName={header.active} className={header.button}>Астероиды</NavLink>
          <NavLink to="/order" activeClassName={header.active} className={header.button}>Заказ</NavLink>
        </nav>
      </div>
      <img className={header.image} src={image} alr="Картинка дня" />
    </header>
  )
}

export default Header;