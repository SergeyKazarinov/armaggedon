import React from "react";
import header from './Header.module.css';
import app from '../App/App.module.css'

function Header({image, isAsteroidPage, onButtonClick}) {
  function handleButtonAsteroidClick() {
    onButtonClick(true);
  }

  function handleButtonOrderClick() {
    onButtonClick(false);
  }

  return(
    <header className={header.header}>
      <div className={header.flex_container}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h1 className={header.title}>ARMAGGEDON V2</h1>
          <p className={header.subtitle}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</p>
        </div>
        <nav className={app.flex}>
          <ul className={`${app.flex} ${header.nav}`}>
            <li><button type="button" className={`${header.button} ${isAsteroidPage && header.active}`} onClick={handleButtonAsteroidClick}>Астероиды</button></li>
            <li><button type="button" className={`${header.button} ${!isAsteroidPage && header.active}`} onClick={handleButtonOrderClick}>Заказ</button></li>
          </ul>
        </nav>
      </div>
      <img className={header.image} src={image} alr="Картинка дня" />
    </header>
  )
}

export default Header;