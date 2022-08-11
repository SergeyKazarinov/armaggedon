import React from "react";
import header from './Header.module.css';
import app from '../../App.module.css'
import headerImage from '../../images/headerBackground.jpg'

function Header() {
  return(
    <header className={header.header}>
      <div className={app.flex}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h1 className={header.title}>ARMAGGEDON V2</h1>
          <p className={header.subtitle}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</p>
        </div>
        <nav className={app.flex}>
          <ul className={`${app.flex} ${header.nav}`}>
            <li className={header.item}>Астероиды</li>
            <li className={header.item}>Заказ</li>
          </ul>
        </nav>
      </div>
      <img className={header.image} src={headerImage} alr="Картинка дня" />
    </header>
  )
}

export default Header;