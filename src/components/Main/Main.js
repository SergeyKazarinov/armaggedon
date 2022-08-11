import React from "react";
import main from './Main.module.css';
import app from '../../App.module.css';
import Asteroids from "../Asteroids/Asteroids";

function Main() {
  return(
    <div className={main.content}>
      <section className={main.flights}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h2 className={main.title}>Ближайшие подлёты</h2>
          <div className={main.subtitle}>
            <p className={main.distance}>
              Отображать расстояние: 
              <div>
                <button className={`${main.button} ${main.active}`}>
                  в километрах
                </button> 
                &#8194;|&#8194;
                <button className={main.button}>
                  в лунных орбитах
                </button>
              </div>
            </p>
            <div className={main.checkbox_container}>
              <input type="checkbox" className={main.checkbox} id="dangerous" />
              <label className={main.checkbox__description} for="dangerous">Показать только опасные</label>
            </div>
          </div>
        </div>
      </section>

      <section className={main.asteroids}>
        <ul className={main.list}>
          <Asteroids />
          <Asteroids />
          <Asteroids />
          <Asteroids />
          <Asteroids />
          <Asteroids />

        </ul>

      </section>
    </div>
  )
}

export default Main;