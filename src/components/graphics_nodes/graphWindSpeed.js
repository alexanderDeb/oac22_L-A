import React from "react";
import ReactApexChart from "react-apexcharts";

export default function WindSpeed(props) {

  const graphWindSpeed = ({
    series: [{
      name: 'Velocidad promedio del aire (mph)',
      data: props.data.map((x) => x.windSpeed.toFixed(1))
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
      <ReactApexChart options={graphWindSpeed.options} series={graphWindSpeed.series} type="area" height={350} />
    </div>
  );
}