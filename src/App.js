import React, { useEffect, useState } from 'react';
import app from './App.module.css';
import Header from './components/Header/Headers';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import api from './utils/Api';

function App() {
  const date = new Date();
  const [headerImage, setHeaderImage] = useState('');

  useEffect(() => {
    api.getApodImage()
      .then((res) => {
        setHeaderImage(res.url)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div className={app.app}>
      <Header image={headerImage}/>
      <Main />
      <Footer date={date}/>
    </div>
  );
}

export default App;
