import React from "react";
import ReactApexChart from "react-apexcharts";

export default function Humidity(props) {

  const graphHumidity = ({
    series: [{
      name: 'Humedad realtiva ambiental (%)',
      data: props.data.map((x) => x.humidity.toFixed(1))
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
        "#0F6CA6"
      ]
    }
  })




  return (
    <div>
      <ReactApexChart options={graphHumidity.options} series={graphHumidity.series} type="area" height={350} />
    </div>
  );
}