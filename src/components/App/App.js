import React, { useEffect, useState } from 'react';
import app from './App.module.css';
import Header from '../Header/Headers';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import api from '../../utils/Api';
import AsteroidDescriptionPopup from '../AsteroidDescriptionPopup/AsteroidDescriptionPopup';

function App() {
  const date = new Date();
  const [currentPage, setCurrentPage] = useState(1)
  const [headerImage, setHeaderImage] = useState('');
  const [asteroids, setAsteroids] = useState([]);
  const [isAsteroidPage, setIsAsteroidPage] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [isOpen, setIsOpen] = useState (false);
  const [selectAsteroid, setSelectAsteroid] = useState({})
  const [isLoader, setIsLoader] = useState(false);

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

  function handleScroll(e) {
    if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && isAsteroidPage) {
      setFetching(true);
    }
    
  }

  function handleHeaderButtonClick(boolean) {
    setIsAsteroidPage(boolean)
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

  return (
    <div className={app.app}>
      <Header image={headerImage} isAsteroidPage={isAsteroidPage} onButtonClick={handleHeaderButtonClick}/>
      <Main asteroids={asteroids} isAsteroidPage={isAsteroidPage} openPopup={handleOpenPopup}/>
      <Footer date={date}/>
      {isLoader && <AsteroidDescriptionPopup data={selectAsteroid} isOpen={isOpen} onClose={closePopup}/>}
    </div>
  );
}

export default App;
