import React from "react";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Date = {
    day: days[props.date.getDay()],
    hour: props.date.getHours(),
    minutes: props.date.getMinutes(),
  };
  if (Date.minutes < 10) {
    Date.minutes = `0${Date.minutes}`;
  }
  if (props.Day) {
    return <div>{Date.day}</div>;
  } else {
    return (
      <div>
        {Date.day} {Date.hour}:{Date.minutes}
      </div>
    );
  }
}
