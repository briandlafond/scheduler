import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Form from "components/Appointment/Form";
// import Status from "components/Appointment/Status";
// import Confirm from "components/Appointment/Confirm";
// import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE= "CREATE";

  const { mode, transition, back} = useVisualMode(
    props.interview? SHOW : EMPTY
  );

  const { time, interview } = props; 

  return (
      <div> 
        <Header time={time}/> 
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={[]}
          />
          )}
      </div>
  );

};

    // (time ? <article className="appointment">Appointment at {time}</article> : <article className="appointment">No Appointment</article>)
