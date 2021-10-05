import React, { useState } from 'react';
import './index.css';
import './App.css'
import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
import { render } from 'react-dom';
import Profile from './components/profile';
import 'react-calendar/dist/Calendar.css'
import Timer from './components/timer';
import Game from './components/game';
import emailjs from "emailjs-com";


function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  const sendEmail = (e) => {
    e.preventDefault();

  emailjs.sendForm('service_gg3vqvw', '', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }; 
  return (
    <div>
      <Calendar className="p-4"
        onChange={onChange}
        value={value}
      />
      <form onSubmit={sendEmail}  className="col-sm-4 mx-auto">
      <input type="submit" className="btn btn-primary mx-auto my-4 text-center" value="Book" />
      </form>
    </div>
  );
}

render(<Game /> , document.getElementById('game'));
render(<Profile />, document.getElementById('pic'));
render(<ReactCalendar /> , document.getElementById('root'));
// render(<Timer />, document.getElementById(''));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
