import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from './App.module.css';
import Header from '../Header/Headers';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import api from '../../utils/Api';
import AsteroidDescriptionPopup from '../AsteroidDescriptionPopup/AsteroidDescriptionPopup';
import AsteroidList from '../AsteroidList/AsteroidList';
import Order from '../Order/Order'


function App() {
  const date = new Date();
  const [currentPage, setCurrentPage] = useState(1)
  const [headerImage, setHeaderImage] = useState('');
  const [asteroids, setAsteroids] = useState([]);
  const [currentAsteroid, setCurrentAsteroid] = useState(asteroids);
  const [fetching, setFetching] = useState(false);
  const [isOpen, setIsOpen] = useState (false);
  const [selectAsteroid, setSelectAsteroid] = useState({})
  const [isLoader, setIsLoader] = useState(false);
  const [isDistanceKilometers, setIsDistanceKilometers] = useState(true);
  const [isPotentiallyHazardous, setIsPotentiallyHazardous] = useState(false);
  const [order, setOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(order);

  useEffect(() => {
    api.getApodImage()
      .then((res) => {
        setHeaderImage(res.url)
      })
      .catch((err) => {
        console.log(err);
      });
    
      api.getInitialAsteroids(date)
      .then((res) => {
        let arr = [];
        for(let key in res.near_earth_objects) {
          arr = arr.concat(res.near_earth_objects[key]);
        }
        setAsteroids(arr)
        setSelectAsteroid(arr[0])
        setIsLoader(true);
      })
      .catch((err) => {
        console.log(err);
      });

      document.addEventListener('scroll', handleScroll);

      return function() {
        document.removeEventListener('scroll', handleScroll);
      }
  }, [])

  useEffect(() => {
    if(fetching) {
      date.setDate(date.getDate() + currentPage)
      api.getInitialAsteroids(date)
      .then((res) => {
        let arr = [];
        for(let key in res.near_earth_objects) {
          arr = asteroids.concat(res.near_earth_objects[key]);
        }
        setAsteroids(arr)
        setCurrentPage(preState => preState + 1);
        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetching(false);
      });
    }

  }, [fetching])

  useEffect(() => {
    if(isPotentiallyHazardous) {
      setCurrentAsteroid(asteroids.filter((item) => (item.is_potentially_hazardous_asteroid === true)))
      setCurrentOrder(order.filter((item) => (item.is_potentially_hazardous_asteroid === true)))
    }
    else {
      setCurrentAsteroid(asteroids)
      setCurrentOrder(order)
    }
    
  }, [isPotentiallyHazardous, asteroids, order])

  function handleScroll(e) {
    if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)) {
      setFetching(true);
    }
    
  }

  function handleEscClose(e) {
    e.key === "Escape" && closePopup();
  }

  function handleOpenPopup(data) {
    setIsOpen(true);
    setSelectAsteroid(data);
    window.addEventListener('keydown', handleEscClose);
  }

  function closePopup() {
    setIsOpen(false);
    window.removeEventListener('keydown', handleEscClose);
  }

  function handleDistanceKilometersClick() {
    setIsDistanceKilometers(true);
  }

  function handleDistanceLunarClick() {
    setIsDistanceKilometers(false);
  }

  function handleDangerousClick(isChecked) {
    setIsPotentiallyHazardous(isChecked);
  }

  function handleAddAsteroidDestroy(asteroid) {
    setOrder([asteroid, ...order])
  }

  function handleRemoveAsteroidDestroy(asteroid) {
    setOrder((order) => {
      return order.filter(item => item !== asteroid);
    })
  }

  return (
    <BrowserRouter>
      <div className={app.app}>
        <Header image={headerImage} />
        <div className={app.content}>
          <Main
            distanceKilometers={handleDistanceKilometersClick}
            distanceLunar={handleDistanceLunarClick}
            onFilterClick={handleDangerousClick}
          />
          <Switch>
            <Route exact path="/">
              <AsteroidList
                dataList={currentAsteroid}
                orderList={order}
                openPopup={handleOpenPopup}
                isDistanceKilometers={isDistanceKilometers}
                onAddClick={handleAddAsteroidDestroy}
                onRemoveClick={handleRemoveAsteroidDestroy}
              />
            </Route>
            <Route path="/order">
              <h2 className={app.title}>Ваш заказ</h2>
              {order.length === 0 
              ? (<>
                  <p className={app.order}>Ваша корзина пуста, команда им. Брюса Уиллиса не знает, куда лететь.</p>
                  <p className={app.order}>Добавьте астероиды в корзину</p>
                </>)
              : <Order
                dataList={currentOrder}
                openPopup={handleOpenPopup}
                isDistanceKilometers={isDistanceKilometers}
                onAddClick={handleAddAsteroidDestroy}
                onRemoveClick={handleRemoveAsteroidDestroy}
              />}
            </Route>
          </Switch>
        </div>
        
        <Footer date={date}/>

        {isLoader && <AsteroidDescriptionPopup data={selectAsteroid} isOpen={isOpen} onClose={closePopup}/>}
      </div>
    </BrowserRouter>
  );
}

export default App;
