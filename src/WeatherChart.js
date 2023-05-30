import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import React, { useContext } from "react";
import CityContext from "./CityData";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

function WeatherChart() {
  const { WeatherData } = useContext(CityContext);
  function toDay(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }
  if (WeatherData.ready) {
    const Weekdays = [];
    const Weekdays_Tempreture = [];
    const Weekdays_Wind_Speed = [];
    const Weekdays_Humidity = [];
    //console.log(WeatherData.daily);
    for (const [i, Day] of WeatherData.daily.entries()) {
      Weekdays.push(toDay(new Date(Day.time * 1000)));
      Weekdays_Tempreture.push(Day.temperature.day);
      Weekdays_Wind_Speed.push(Day.wind.speed);
      Weekdays_Humidity.push(Day.temperature.humidity);
    }
    const lineChartData = {
      labels: Weekdays,
      datasets: [
        {
          data: Weekdays_Tempreture,
          label: "Tempreture",
          borderColor: "#c71212",
          fill: true,
          lineTension: 0.5,
        },
        {
          data: Weekdays_Wind_Speed,
          label: "Wind Speed",
          borderColor: "#98FF98",
          fill: true,
          lineTension: 0.5,
        },
        {
          data: Weekdays_Humidity,
          label: "Humidity (%)",
          borderColor: "#6fa8dc",
          fill: true,
          lineTension: 0.5,
        },
      ],
    };

    return (
      <Line
        className="Weather_Chart card card-body Selected align-items-stretch"
        type="line"
        width={160}
        height={60}
        options={{
          title: {
            display: true,
            text: "COVID-19 Cases of Last 6 Months",
            fontSize: 20,
          },
          legend: {
            display: true, //Is the legend shown?
            position: "top", //Position of the legend.
          },
        }}
        data={lineChartData}
      />
    );
  }
}
export default WeatherChart;
