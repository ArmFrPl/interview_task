import React, { useEffect, useState } from "react";
import '../styles/MainScreen.css';
import { useDispatch, useSelector } from "react-redux";
import { getByLocationCurrent, getByLocationDaily } from "../actions";
import {
  GET_BY_LOCATION_CURRENT,
  GET_BY_LOCATION_DAILY,
} from "../actions/types";
import { Navbar } from "./Navbar";

export const MainScreen = () => {
  const daily = useSelector(state => state.daily.days.list);
  const current = useSelector(state => state.current.current);
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (current) {
      setCurrentWeather(current);
    }
  }, [current]);

  useEffect(() => {
    if (daily) {
      const groupedDates = groupByDate(daily);
      setDates(groupedDates.slice(0, 5));
      if (groupedDates.length > 0) {
        handleCardClick(groupedDates[0]);
      }
    }
  }, [daily]);

  const fetchWeather = (latitude, longitude) => {
    getByLocationCurrent(latitude, longitude).then(current => {
      dispatch({ type: GET_BY_LOCATION_CURRENT, payload: current.payload });
      setCurrentWeather(current.payload);
    });
    getByLocationDaily(latitude, longitude).then(daily => {
      dispatch({ type: GET_BY_LOCATION_DAILY, payload: daily.payload });
      const groupedDates = groupByDate(daily.payload);
      setDates(groupedDates.slice(0, 5));
      if (groupedDates.length > 0) {
        handleCardClick(groupedDates[0]);
      }
    });
  };

  const convertDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${month}-${day}`;
  };

  const handleCardClick = (day) => {
    setSelectedDate(day);
    setCurrentWeather({
      name: currentWeather.name,
      main: { temp: day.maxTemp },
      weather: [{ main: day.weatherMain, icon: day.icon }]
    });
    const filteredHourlyData = filterHourlyData(day);
    setHourlyData(filteredHourlyData);
  };

  const groupByDate = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      const date = convertDate(entry.dt_txt);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });

    const groupedArray = Object.keys(grouped).map((date) => {
      const dayData = grouped[date];
      const maxTempEntry = dayData.reduce((max, entry) => entry.main.temp > max.main.temp ? entry : max, dayData[0]);
      return {
        date,
        maxTemp: maxTempEntry.main.temp,
        icon: maxTempEntry.weather[0].icon,
        weatherMain: maxTempEntry.weather[0].main,
        data: dayData
      };
    });

    return groupedArray;
  };

  const filterHourlyData = (selectedDate) => {
    return selectedDate.data.filter((entry) => {
      const entryDate = convertDate(entry.dt_txt);
      return entryDate === selectedDate.date;
    });
  };

  const convertTemp = (temp, toUnit) => {
    if (toUnit === 'celsius') {
      return Math.ceil(temp);
    } else {
      return Math.ceil(temp * 9 / 5 + 32);
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    daily ?
      <div className='mainScreen'>
        <Navbar onUnitChange={handleUnitChange} />
        <div className='currentCont'>
          <h2>{currentWeather ? currentWeather.name : current.name}</h2>
          <h1>{currentWeather ? convertTemp(currentWeather.main.temp, unit) + (unit === 'celsius' ? '℃' : '℉') : convertTemp(current.main.temp, unit) + (unit === 'celsius' ? '℃' : '℉')}</h1>
          <img src={`http://openweathermap.org/img/wn/${currentWeather ? currentWeather.weather[0].icon : current.weather[0].icon}@4x.png`} alt="" />
          <h3>{currentWeather ? currentWeather.weather[0].main : current.weather[0].main}</h3>
        </div>
        <div className='daysCont'>
          {dates.map((day, index) => {
            return (
              <div
                key={index}
                className={`weatherCard ${selectedDate && selectedDate.date === day.date ? 'selected' : ''}`}
                onClick={() => handleCardClick(day)}
              >
                <div className="date">{day.date}</div>
                <div className="temperature">{convertTemp(day.maxTemp, unit) + (unit === 'celsius' ? '℃' : '℉')}</div>
                <div className="icon">
                  <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <div className='hourlyCont'>
          {hourlyData.map((hour, index) => {
            return (
              <div className='oneCont' key={index}>
                <div className="date">{hour.dt_txt.split(" ")[1]}</div>
                <div className="temperature">{convertTemp(hour.main.temp, unit) + (unit === 'celsius' ? '℃' : '℉')}</div>
                <div className="icon"><img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="" /></div>
              </div>
            );
          })}
        </div>
      </div> :
      <div>Loading...</div>
  );
};
