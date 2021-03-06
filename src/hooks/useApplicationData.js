import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(response => {
      const days = response[0].data
      const appointments = response[1].data
      const interviewers = response[2].data
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers})
    });
  }, [])

  const setDay = function(day) {
    dispatch({ type: SET_DAY, value: day})
  }
  
  const cancelInterview = function(id) {
    const nullAppointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: nullAppointment
    };

    const days = state.days.map((day) => {
      const dayCopy = {...day};
      if (dayCopy.appointments.includes(id)){
        dayCopy.spots ++
        return dayCopy
      } else {
        return dayCopy
      }
    })

    return axios.delete(`api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, days, appointments})
    })
  }

  const bookInterview = function(id, interview) {

    let days = state.days;

    if (!state.appointments[id].interview) {
      days = state.days.map((day) => {
        const dayCopy = {...day};
        if (dayCopy.appointments.includes(id)){
          dayCopy.spots --
          return dayCopy
        } else {
          return dayCopy
        }
      })
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, ...state, appointments, days})
    })
  };

  return { state, setDay, bookInterview, cancelInterview }
  
};