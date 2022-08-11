import React from "react";
import asteroids from './Asteroids.module.css';
import app from '../../App.module.css';
import image from '../../images/potentially_hazardous_asteroid.png'

function Asteroids() {
  return(
    <li className={`${app.flex} ${app.flex_column} ${asteroids.item}`}>
        <h3 className={asteroids.date}>12 сентября 2021</h3>
        <div className={`${app.flex} ${asteroids.data}`}>
          <img className={`${asteroids.image}`} src={image} alt="Не опасный астеройд"/>
          <div className={`${app.flex} ${app.flex_column} ${asteroids.description}`}>
            <h4 className={`${asteroids.description} ${asteroids.title}`}>Астероид 2021 FQ</h4>
            <span className={asteroids.diameter}>&#8709; 85м</span>
            <span className={asteroids.distance}>&#8596;7 400 135 км</span>
            <span className={asteroids.status}>Не опасен</span>
          </div>
        </div>
        <button type="button" className={asteroids.button}>УНИЧТОЖИТЬ</button>
    </li>
  )
}

export default Asteroids;