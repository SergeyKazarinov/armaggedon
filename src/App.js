import logo from './logo.svg';
import app from './App.module.css';
import Header from './components/Header/Headers';
import Main from './components/Main/Main';

function App() {

  return (
    <div className={app.app}>
      <Header />
      <Main />

    </div>
  );
}

export default App;
