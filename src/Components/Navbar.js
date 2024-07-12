import React, { useState } from "react";
import '../styles/Navbar.css';
import { getCity, getCurrent, getDaily } from "../actions";
import { GET_CITY, GET_CURRENT, GET_DAILY } from "../actions/types";
import { useDispatch } from "react-redux";

export const Navbar = ({ onUnitChange }) => {
  const dispatch = useDispatch();
  const [searchedCity, setSearchedCity] = useState('');

  const handleChange = (event) => {
    setSearchedCity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getCity(searchedCity).then(city => { dispatch({ type: GET_CITY, payload: city.payload }) });
    getCurrent(searchedCity).then(current => {
      if (current.payload) {
        dispatch({ type: GET_CURRENT, payload: current.payload });
        getDaily(searchedCity).then(daily => { dispatch({ type: GET_DAILY, payload: daily.payload }) });
      }
    }).catch(error => {
      alert('City not found. Please enter a valid city.');
    });
    getDaily(searchedCity).then(daily => { dispatch({ type: GET_DAILY, payload: daily.payload }) });
  }

  const handleUnitChange = (event) => {
    onUnitChange(event.target.value);
  }

  return (
    <div className='Navbar'>
      <div className='NavbarCont'>
        <div></div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter City" onChange={handleChange} value={searchedCity} />
            <button type="submit">Search City</button>
          </form>
        </div>
        <div className="RadioCont">
          <input id="cel" name="degree" value="celsius" type="radio" defaultChecked onChange={handleUnitChange} />
          <label htmlFor="cel">&#8451;</label>
          <input id="far" name="degree" value="fahrenheit" type="radio" onChange={handleUnitChange} />
          <label htmlFor="far">&#8457;</label>
        </div>
      </div>
    </div>
  )
}
