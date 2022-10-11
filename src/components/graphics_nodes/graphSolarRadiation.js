import React from "react";
import ReactApexChart from "react-apexcharts";

export default function SolarRadiation(props) {

  const graphSolarRadiation = ({
    series: [{
      name: 'Radiacion solar(W/m2)',
      data: props.data.map((x) => x.solarRadiation.toFixed(1))
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: props.data.map((x) => x.timestamp)
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      colors:[
        "#05AFF2"
      ]
    }
  })




  return (
    <div>
      <ReactApexChart options={graphSolarRadiation.options} series={graphSolarRadiation.series} type="area" height={350} />
    </div>
  );
}