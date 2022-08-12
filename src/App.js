import React, { useEffect, useState } from 'react';
import app from './App.module.css';
import Header from './components/Header/Headers';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import api from './utils/Api';

function App() {
  const date = new Date();
  const [currentPage, setCurrentPage] = useState(1)
  const [headerImage, setHeaderImage] = useState('');
  const [asteroids, setAsteroids] = useState([]);
  const [isAsteroidPage, setIsAsteroidPage] = useState(true);
  const [fetching, setFetching] = useState(false);

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
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
    
  }

  function handleHeaderButtonClick(boolean) {
    setIsAsteroidPage(boolean)
  }
  return (
    <div className={app.app}>
      <Header image={headerImage} isAsteroidPage={isAsteroidPage} onButtonClick={handleHeaderButtonClick}/>
      <Main asteroids={asteroids} />
      <Footer date={date}/>
    </div>
  );
}

export default App;
