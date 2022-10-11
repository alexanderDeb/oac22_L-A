import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BatteryPer(props) {

  const graphBattery = ({
    series: [{
      name: 'Bateria del sensor(%)',
      data: props.data.map((x) => x.batteryPer.toFixed(1))
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
      <ReactApexChart options={graphBattery.options} series={graphBattery.series} type="area" height={350} />
    </div>
  );
}