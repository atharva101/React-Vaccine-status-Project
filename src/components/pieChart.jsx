import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const options = {
    labels: ["Vaccinated", "Not Vaccinated"],
    datasets: [
      {
        label: "My First Dataset",
        data: data,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,

      },
    ],
    height: "418",
    maintainAspectRatio: false
  };
 
  return (
    <div style={{ height: "100px" }}>
      <Pie data={options} style={{ height: "200px" }} />
    </div>
  );
};

export default PieChart;
