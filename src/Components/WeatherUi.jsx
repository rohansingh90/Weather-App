import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import dateFormat from "dateformat"; 
const WeatherUi = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const apikey = "0ff818759352ffe0f192814cd9b5d88c";

  const fetchWeatherByCity = async () => {
    if (!city) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );
      const data = await response.json();
      setWeather(data);
      

      setCity("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDate =  ()=>{
    let now = new Date();
    return dateFormat(now,"dddd,mmmm,h:MM TT");
  }


const fetchWeatherByLocation = async ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async (postion)=>{
      const {latitude,longitude} = postion.coords;
      try {
        setLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        
      }
    })
  }else{
    alert("Geolocation is not supported by your browser.")
  }
}

  return (
    <div className="flex justify-center ">
      <div className="bg-purple-700 w-[500px]  ">
        <div className="p-8 ">
          <h1 className="text-2xl text-white font-bold text-center ">
            Weather App
          </h1>
          <div className="mt-4 flex items-center">
            <input
            placeholder="Enter the city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="bg-white w-full h-10  p-2 outline-none rounded-l-lg"
            />
            <button onClick={fetchWeatherByCity}>
              <IoIosSearch className="bg-black text-white h-10 w-20 " />{" "}
            </button>
            <button onClick={fetchWeatherByLocation} className="bg-black h-10 w-20 border-l-white text-white"><IoLocationSharp size={25}/> </button>
          </div>

          {/* weather data fetching */}

          {loading ? (
            <p>Loading...</p>
          ) : weather ? (
            <div
              className="flex flex-col text-white gap-3 rounded-lg p-3 bg-gradient-to-r from-blue-500/30 to-rose-500/30 
        backdrop-blur-md mt-6"
            >
              <div className="flex  items-center gap-2 justify-center">
                <IoLocationSharp size={20} />
                <h1 className="text-2xl text-center">
                {weather.name} <span className="text-sm ml-3 mb-2">({weather.sys.country})</span>
                </h1>
              </div>
              <div className="">
                <h1 className="text-center ">{renderDate()}</h1>
                <div className="flex justify-center items-center flex-col">
                <img className="text-center " src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <h1 className="text-center mt-4 text-2xl">{weather.weather[0].description}</h1>
                </div>
                
                <h1 className="text-center mt-6 text-4xl"> {weather.main.temp}°C</h1>
                <h1 className="text-center text-2xl  mt-7">Feels Like {weather.main.feels_like} °C</h1>
              </div>
              <div className="bg-blue-400  flex justify-center items-center h-12 rounded-lg mt-5 font-bold gap-3">
                <FaWind />
                Wind is {weather.wind.speed} km/h
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 flex justify-center mt-5 h-12 items-center rounded-lg">
              <h1 className="text-2xl"> no data show</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherUi;
