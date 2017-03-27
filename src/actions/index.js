import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_SENSORDATA, FETCH_SENSORDETAILS } from './types';

const ROOT_URL = 'http://localhost:3000';
const sensorurl = `${ROOT_URL}/realtimedata`;
const sensordetailsurl = `${ROOT_URL}/sensordetails`;

export function fetchSensorDetails(){
  return function(dispatch){
    console.log('Entered topology!');

    axios.get(sensordetailsurl)
    .then(response =>{
      var result = response;
      dispatch({
        type: FETCH_SENSORDETAILS,
        payload: response.data
      });
    });
  }
}

//Fecth the sensor data by using protected route
export function fetchSensordata(){
  return function(dispatch){
    console.log('Entered fetch!');

    axios.get(sensorurl)
    .then(response =>{
      var result = response;
      //var datares = [1,2,3,4];
      console.log("Response: " + result.data.rows[0].doc.data.temperature);
      dispatch({
        type: FETCH_SENSORDATA,
        payload: response.data
      });
    });
  }
}

//Fetch the message by using protected route
export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(response=>{
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  }
}

//Post the data to Sign up user
export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email,password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/Home');
    })
    .catch(response => dispatch(autheError(response.data.error)));
  }
}

export function signoutUser(){
  //Delete token from localStorage
  localStorage.removeItem('token');

    //Set authetication flag = false
  return { type: UNAUTH_USER };
}

//Post the data and sign in user by returning the token
export function signinUser({ email, password }){
  return function(dispatch){


      //Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password})
    .then(response => {

      //If request is good...
      //-update state to indicate user is authenticated
      //- Save JWT
      //-redirect to the route '/feature'
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token',response.data.token);
      browserHistory.push('/Home');
    })
    .catch(() => {
      //If request is bad
      //show error
      dispatch(authError('Bad Login Info'));
    });
  }


 function authError(error){
  return{
    type: AUTH_ERROR,
    payload: error
  };
}
}
