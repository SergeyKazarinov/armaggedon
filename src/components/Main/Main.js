import React, {useState, useEffect} from "react";
import main from './Main.module.css';
import app from '../../App.module.css';
import Asteroids from "../Asteroids/Asteroids";

function Main({asteroids}) {
  const [isDistanceKilometers, setIsDistanceKilometers] = useState(true);
  const [isPotentiallyHazardous, setIsPotentiallyHazardous] = useState(false)
  const [arrAsteroid, setArrAsteroid] = useState(asteroids);

  function handleDistanceKilometersClick() {
    setIsDistanceKilometers(true);
  }

  function handleDistanceLunarClick() {
    setIsDistanceKilometers(false);
  }

  function handleDangerousClick() {
    setIsPotentiallyHazardous(!isPotentiallyHazardous);
  }

  useEffect(() => {
    if(isPotentiallyHazardous) {
      setArrAsteroid(asteroids.filter((item) => (item.is_potentially_hazardous_asteroid === true)))
    }
    else {
      setArrAsteroid(asteroids)
    }
    
  }, [isPotentiallyHazardous, asteroids])

  return(
    <div className={main.content}>
      <section className={main.flights}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h2 className={main.title}>Ближайшие подлёты</h2>
          <div className={main.subtitle}>
            <div className={main.distance}>
              Отображать расстояние:&#8194;
              <span>
                <button className={`${main.button} ${isDistanceKilometers && main.active}`} onClick={handleDistanceKilometersClick}>
                в километрах
                </button> 
                &#8194;|&#8194;
                <button className={`${main.button} ${!isDistanceKilometers && main.active}`} onClick={handleDistanceLunarClick}>
                  в лунных орбитах
                </button>
              </span>
            </div>
            <div className={main.checkbox_container}>
              <input type="checkbox" className={main.checkbox} id="dangerous" onClick={handleDangerousClick}/>
              <label className={main.checkbox__description} htmlFor="dangerous">Показать только опасные</label>
            </div>
          </div>
        </div>
      </section>

      <section className={main.asteroids}>
        <ul className={main.list}>
          {arrAsteroid.map((item) => (
            <Asteroids 
            key={item.id}
            date={item}
            isDistanceKilometers={isDistanceKilometers}
            />)
          )}
        </ul>

      </section>
    </div>
  )
}

export default Main;