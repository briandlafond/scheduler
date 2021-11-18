import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {

  // const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map( appointment => {
    return(
      <Appointment 
        key={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
      />
    );
  });

  const api = "http://localhost:8001/api"

  useEffect(() => {
    const getDays = axios.get(`${api}/days`);
    const getAppointments = axios.get(`${api}/appointments`);
    const getInterviewers = axios.get(`${api}/interviewers`);

    Promise.all([
      getDays,
      getAppointments,
      getInterviewers
    ])
    .then((res) => {
      setState(prev => ({...prev, getDays:res[0], getAppointments:res[1], getInterviewers:res[2]}))
    })
  }, []); 


  return (
    <main className="layout">
      <section className="sidebar">
        <img 
          className="sidebar--centered" 
          src="images/logo.png" 
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            // setDay={setDay}
          />
        </nav>
        <img 
          className="sidebar__lhl sidebar--centered" 
          src="images/lhl.png" 
          alt="Lighthouse Labs" 
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );

};
