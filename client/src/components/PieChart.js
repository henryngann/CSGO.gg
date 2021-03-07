import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  const selected = useParams();
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4040/profile/${selected.platform}/${selected.id}`)
      .then((res) => {
        if (loaded === false) {
          //Pie Graph

          const data = {
            labels: [
              "Headshot Percentage",
              "Shot Accuracy Percentage",
              "Win/Loss Percentage",
            ],
            datasets: [
              {
                label: `Life Time Percentages`,
                data: [
                  res.data.segments[0].stats.headshotPct.displayValue.replaceAll(
                    "%",
                    ""
                  ),
                  res.data.segments[0].stats.shotsAccuracy.displayValue.replaceAll(
                    "%",
                    ""
                  ),
                  res.data.segments[0].stats.wlPercentage.displayValue.replaceAll(
                    "%",
                    ""
                  ),
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                ],
              },
            ],
          };
          setLoaded(true);
          setData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="chart">
      <Pie
        data={data}
        width={350}
        height={350}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
};

export default PieChart;
