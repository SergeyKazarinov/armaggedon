import React from "react";
import header from './Header.module.css';
import app from '../../App.module.css'

function Header({image}) {
  return(
    <header className={header.header}>
      <div className={header.flex_container}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h1 className={header.title}>ARMAGGEDON V2</h1>
          <p className={header.subtitle}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</p>
        </div>
        <nav className={app.flex}>
          <ul className={`${app.flex} ${header.nav}`}>
            <li className={`${header.item}`}>Астероиды</li>
            <li className={`${header.item}`}>Заказ</li>
          </ul>
        </nav>
      </div>
      <img className={header.image} src={image} alr="Картинка дня" />
    </header>
  )
}

export default Header;