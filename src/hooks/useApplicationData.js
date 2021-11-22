import {React, useEffect} from "react";
import "components/Application.scss";
import axios from "axios";

import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {

const interviewers = getInterviewersForDay(state, state.day);

const appointments = getAppointmentsForDay(state, state.day).map(
  appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  }
);

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
  });
}, [])

}