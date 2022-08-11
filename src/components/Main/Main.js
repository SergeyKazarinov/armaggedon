import React from "react";
import main from './Main.module.css';
import app from '../../App.module.css';

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
              <button className={main.checkbox} type="checkbox" id="dangerous" />
              <label className={main.checkbox__description} for="dangerous">Показать только опасные</label>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Main;