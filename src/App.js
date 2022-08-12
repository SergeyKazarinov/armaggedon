import React, { useEffect, useState } from 'react';
import app from './App.module.css';
import Header from './components/Header/Headers';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import api from './utils/Api';

function App() {
  const date = new Date();
  const [headerImage, setHeaderImage] = useState('');
  const [res, setResult] = useState({});
  const [asteroids, setAsteroids] = useState([]);
  const [isAsteroidPage, setIsAsteroidPage] = useState(true);
  // console.log(date.toLocaleString());
  // date.setDate(date.getDate() + 1)
  // console.log(`новая дата ${date.toLocaleString()}`);

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
  }, [])

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
