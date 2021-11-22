import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE= "CREATE";

  const { mode, transition} = useVisualMode(
    props.interview? SHOW : EMPTY
  );

  const { time } = props; 

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

