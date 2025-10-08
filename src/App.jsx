import React, { useEffect, useState } from 'react'
import Style from './app.module.css';
import axios from 'axios';


const App = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selected, setSelected] = useState({ country: "", state: "", city: "" });

  const changeHandler = (e) => {

    setSelected((prev) => {

      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  useEffect(() => {

    async function getCountry() {
      try {
        const response = await axios('https://crio-location-selector.onrender.com/countries');
        setCountry(response.data);
      } catch (e) {
        console.error("Error in country api",e);
      }
    }
    getCountry();

  }, []);
  useEffect(() => {

    async function getState() {
      try {
        const response = await axios(`https://crio-location-selector.onrender.com/country=${selected.country}/states`);
        setState(response.data);
      } catch (e) {
        console.error("Error in state api",e);
      }
    }
    getState();

  }, [selected.country]);
  useEffect(() => {

    async function getState() {
      try {
        const response = await axios(`https://crio-location-selector.onrender.com/country=${selected.country}/state=${selected.state}/cities`);
        setCity(response.data);
      } catch (e) {
        console.error("Error in city api",e);
      }
    }
    getState();

  }, [selected.state]);
  // console.log("selected data",selected);
  // console.log("country data",country);
  // console.log("state date",state);
  // console.log("city data",city);
  return (<>
    <div className={Style.heading}>
    <h1 >Select Location</h1>
    </div>
    <div className={Style.container}>

      <select name='country' onChange={changeHandler}>
      {
          country?.map((name) => { return <option key={name} value={name}>{name}</option> })
      }
      </select>

      <select name='state' onChange={changeHandler} disabled={selected.country===''?true:false}>
        {
          state?.map((name) => { return <option key={name} value={name}>{name}</option> })
        }
      </select>

      <select name='city' onChange={changeHandler} disabled={selected.state===''?true:false}>
        {
          city?.map((name) => { return <option key={name} value={name}>{name}</option> })
        }
      </select>
      
    </div>
    <div className={Style.selected}>
    {selected.city!==''&&<p>{`You selected ${selected.city}, ${selected.state}, ${selected.country}`}</p>}
    </div>
  </>)
}

export default App;