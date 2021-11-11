import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";


export default function Appointment(props) {

  const { time, interview } = props; 

  return (
    (props.interview ? 
      <div> 
        <Header time={time}/> 
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer} 
        /> 
      </div> : 
      <div>
        <Header 
          time={time}
        /> 
        <Empty/>
      </div>)
  );

};

    // (time ? <article className="appointment">Appointment at {time}</article> : <article className="appointment">No Appointment</article>)
