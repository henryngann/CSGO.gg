import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const selected = useParams();
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4040/profile/${selected.platform}/${selected.id}`)
      .then((res) => {
        if (loaded === false) {
          //Radar

          const data = {
            labels: [
              "Total Wins",
              "Total Losses",
              "Ties",
              "Most Rounds Played",
              "Most Rounds Won",
              "Total Matches Played",
            ],
            datasets: [
              {
                label: `Matches`,
                data: [
                  res.data.segments[0].stats.wins.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.losses.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.ties.displayValue,
                  res.data.segments[0].stats.roundsPlayed.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.roundsWon.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.matchesPlayed.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
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
      <Doughnut
        data={data}
        width={350}
        height={350}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
};

export default DoughnutChart;
