import React from 'react';
import './App.css';
import LaunchList from './components/Functionalities/LaunchList';
import { useDispatch } from 'react-redux';
import { searchList } from './features/LaunchSlice';

const App = () => {
  const dispatch = useDispatch();

  const searchMission = (oEvent) => {
    const { value } = oEvent.target;
    dispatch(searchList({ value }));
  }

  return (
    <div className="App">
      <input type='search' className='search' placeholder='Search...' onKeyUp={searchMission}></input>
      <LaunchList/>
    </div>
  );
}

export default App;
