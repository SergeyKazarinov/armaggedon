import React, {useState} from "react";
import asteroids from './Asteroids.module.css';
import app from '../../App.module.css';
import dangerousImage from '../../images/potentially_hazardous_asteroid.png'
import indangerousImage from '../../images/potentially_inhazardous_asteroid.png'

function Asteroids({ date, isDistanceKilometers}) {
  const yearDataAsteroid = date.close_approach_data[0].close_approach_date.slice(0, 4);
  const monthDataAsteroid = date.close_approach_data[0].close_approach_date.slice(5, 7);
  const dayDataAsteroid = date.close_approach_data[0].close_approach_date.slice(8);
  const isPotentiallyHazardousAsteroid = date.is_potentially_hazardous_asteroid;

  let monthNameDataAsteroid;
  switch(monthDataAsteroid) {
    case '01': 
      monthNameDataAsteroid = 'Января';
      break;
    case '02': 
      monthNameDataAsteroid = 'Февраля';
      break;
    case '03': 
      monthNameDataAsteroid = 'Марта';
      break;
    case '04': 
      monthNameDataAsteroid = 'Апреля';
      break;
    case '05': 
      monthNameDataAsteroid = 'Мая';
      break;
    case '06': 
      monthNameDataAsteroid = 'Июня';
      break;
    case '07': 
      monthNameDataAsteroid = 'Июля';
      break;
    case '08': 
      monthNameDataAsteroid = 'Августа';
      break;
    case '09': 
      monthNameDataAsteroid = 'Сентября';
      break;
    case '10': 
      monthNameDataAsteroid = 'Октября';
      break;
    case '11': 
      monthNameDataAsteroid = 'Ноября';
      break;
    case '12': 
      monthNameDataAsteroid = 'Декабря';
      break;
  }



const asteroidName = date.name.slice(date.name.indexOf('(') + 1, -1);

  return(
    <li className={`${app.flex} ${app.flex_column} ${asteroids.item}`}>
        <h3 className={asteroids.date}>{dayDataAsteroid} {monthNameDataAsteroid} {yearDataAsteroid}</h3>
        <div className={`${app.flex} ${asteroids.data}`}>
          <img className={`${asteroids.image}`} src={isPotentiallyHazardousAsteroid ? dangerousImage : indangerousImage} alt={isPotentiallyHazardousAsteroid ? "Опасный астероид" : "Не опасный астероид"}/>
          <div className={`${app.flex} ${app.flex_column} ${asteroids.description}`}>
            <h4 className={`${asteroids.description} ${asteroids.title}`}>Астероид {asteroidName}</h4>
            <span className={asteroids.diameter}>&#8709; {`${Math.floor(date.estimated_diameter.meters.estimated_diameter_max)} м`}</span>
            <span className={asteroids.distance}>
              &#8596; {`${isDistanceKilometers 
                ? Math.floor(date.close_approach_data[0].miss_distance.kilometers) + " км" 
                : Math.floor(date.close_approach_data[0].miss_distance.lunar) + " лунных орбит"}`}
            </span>
            <span className={asteroids.status}>{isPotentiallyHazardousAsteroid ? "Опасен" : "Не опасен"}</span>
          </div>
        </div>
        <button type="button" className={asteroids.button}>УНИЧТОЖИТЬ</button>
    </li>
  )
}

export default Asteroids;