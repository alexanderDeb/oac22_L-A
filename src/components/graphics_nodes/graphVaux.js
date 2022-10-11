import React from "react";
import ReactApexChart from "react-apexcharts";

export default function Vaux(props) {

  const graphVaux = ({
    series: [{
      name: 'Voltaje de alimentacion auxiliar (V)',
      data: props.data.map((x) => x.vaux.toFixed(1))
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
      <ReactApexChart options={graphVaux.options} series={graphVaux.series} type="area" height={350} />
    </div>
  );
}