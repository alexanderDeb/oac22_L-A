import React from "react";
import ReactApexChart from "react-apexcharts";

export default function Temperature(props) {

  const graphTemperature = ({
    series: [{
      name: 'Temperatura ambiente(°C)',
      data: props.data.map((x) => x.temperature.toFixed(2))
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
    }
  })




  return (
    <div>
      <ReactApexChart options={graphTemperature.options} series={graphTemperature.series} type="area" height={350} />
    </div>
  );
}