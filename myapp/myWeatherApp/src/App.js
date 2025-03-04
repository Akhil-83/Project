import React, { useState,useEffect } from 'react'
import Weathercard from './weathercard';
import "./App.css"

const App = () => {
  // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=pune&APPID=65a43726b577562b33da9a4fc490e33f`;
  // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=65a43726b577562b33da9a4fc490e33f`;
    const [searchValue,setSearchValue]=useState("pune");
    const [tempInfo,setTempInfo]=useState({})

    const getInfo= async()=>{
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&APPID=65a43726b577562b33da9a4fc490e33f`;
    
        const res=await fetch(weatherUrl);
        const data=await res.json();

        const{temp,pressure,humidity}=data.main;
        const{main  :weathermood}=data.weather[0];
        const{name}=data;
        const{country,sunset}=data.sys
        const{speed}=data.wind;

        const myweather={
          temp,
          pressure,
          humidity,
          weathermood,
          name,
          country,
          sunset,
          speed
        };
        setTempInfo(myweather);

      } catch (error) {
        console.log(error);
      }
    }

useEffect(() => {
  getInfo();
}, [])

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input type='search' placeholder='search...' autoFocus id='search' 
          className='searchTerm' 
          value={searchValue} 
          onChange={(e)=>setSearchValue(e.target.value)}/>
          <button className='searchButton' type='button' onClick={getInfo}>Search</button>
        </div>
      </div>

      <Weathercard tempInfo={tempInfo} />
    </>
  )
}

export default App
