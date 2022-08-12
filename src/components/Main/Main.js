import React, {useState, useEffect} from "react";
import main from './Main.module.css';
import app from '../../App.module.css';
import Asteroids from "../Asteroids/Asteroids";

function Main({asteroids, isAsteroidPage}) {
  const [isDistanceKilometers, setIsDistanceKilometers] = useState(true);
  const [isPotentiallyHazardous, setIsPotentiallyHazardous] = useState(false)
  const [arrAsteroid, setArrAsteroid] = useState(asteroids);
  const [asteroidDestroy, setAsteroidDestroy] = useState([]);
  const [arrAsteroidDestroy, setArrAsteroidDestroy] = useState(asteroidDestroy)

  useEffect(() => {
    if(isPotentiallyHazardous) {
      setArrAsteroid(asteroids.filter((item) => (item.is_potentially_hazardous_asteroid === true)))
      setArrAsteroidDestroy(asteroidDestroy.filter((item) => (item.is_potentially_hazardous_asteroid === true)))
    }
    else {
      setArrAsteroid(asteroids)
      setArrAsteroidDestroy(asteroidDestroy)
    }
    
  }, [isPotentiallyHazardous, asteroids, asteroidDestroy])

  function handleDistanceKilometersClick() {
    setIsDistanceKilometers(true);
  }

  function handleDistanceLunarClick() {
    setIsDistanceKilometers(false);
  }

  function handleDangerousClick() {
    setIsPotentiallyHazardous(!isPotentiallyHazardous);
  }

  function handleAddAsteroidDestroy(asteroid) {
    setAsteroidDestroy([asteroid, ...asteroidDestroy])
  }

  function handleRemoveAsteroidDestroy(asteroid) {
    setAsteroidDestroy((asteroidDestroy) => {
      return asteroidDestroy.filter(item => item !== asteroid);
    })
  }

  return(
    <div className={main.content}>
      <section className={main.flights}>
        <div className={`${app.flex} ${app.flex_column}`}>
          <h2 className={main.title}>{isAsteroidPage ? "Ближайшие подлёты" : "Ваш заказ"}</h2>
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
          {isAsteroidPage 
          ? (arrAsteroid.map((item) => (
              <Asteroids 
              key={item.id}
              data={item}
              isDistanceKilometers={isDistanceKilometers}
              onAddClick={handleAddAsteroidDestroy}
              onRemoveClick={handleRemoveAsteroidDestroy}
              />)
              ))
          : (arrAsteroidDestroy.map((item) => (
              <Asteroids 
              key={item.id}
              data={item}
              isDistanceKilometers={isDistanceKilometers}
              onAddClick={handleAddAsteroidDestroy}
              onRemoveClick={handleRemoveAsteroidDestroy}
              />)
            ))
          }
        </ul>
        
        {!isAsteroidPage && (
          <button type="button" className={main.button_submit}>Отправить заказ</button>
        )}
      </section>
    </div>
  )
}

export default Main;