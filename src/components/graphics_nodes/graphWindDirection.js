import React from "react";
import ReactApexChart from "react-apexcharts";

export default function WindDirection(props) {

  const graphWindDirection = ({
    series: [{
      name: 'Direccion del viento',
      data: props.data.map((x) => x.windDirection.toFixed(1))
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
        "#3FBF48"
      ]
    }
  })




  return (
    <div>
      <ReactApexChart options={graphWindDirection.options} series={graphWindDirection.series} type="area" height={350} />
    </div>
  );
}