import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const {id, name, spots, value, onChange } = props;

  const days = props.days.map( day => {
    return (
      <DayListItem 
        key={id}
        name={name}
        spots={spots}
        selected={name === value}
        setDay={() => onChange(name)}
      />
    )
  });

  return days;

};