import React from 'react';
import './App.css';
import LaunchList from './components/Functionalities/LaunchList';

const App = () => {
  return (
    <div className="App">
      <input type='search' className='search' placeholder='Search...'></input>
      <LaunchList/>
    </div>
  );
}

export default App;
