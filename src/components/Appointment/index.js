import React from "react";
import "components/Appointment/styles.scss";


export default function Appointment(props) {

  const { time } = props; 

  return (
    (time ? <article className="appointment">Appointment at {time}</article> : <article className="appointment">No Appointment</article>)
  );


};