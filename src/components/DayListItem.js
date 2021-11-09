import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";



export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected
  });

  const formatSpots = function() {

    let spotsRemaining = '';
    
    if (props.spots === 0) {
      spotsRemaining = 'no spots remaining';
    } 
    if (props.spots > 0) {
      spotsRemaining = `${props.spots}${props.spots === 1 ? ' spot ': ' spots '} remaining`;
    }
    return spotsRemaining;
  };

  return (
    <li 
      className = {dayClass} 
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );

};
