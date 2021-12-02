import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button.js"
import InterviewerList from "../InterviewerList.js"


export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");

  const reset = function() {
    setStudent("")
    setInterviewer(null)
    return;
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }

  const validate = function() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            name="name"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          className="appointment__card-left" 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button 
            className="appointment__card-right" 
            confirm onClick={validate}
          >Save
          </Button>
          <Button 
            className="appointment__card-right" 
            danger 
            onClick={cancel}
          >Cancel
          </Button>
        </section>
      </section>
    </main>
  )
};