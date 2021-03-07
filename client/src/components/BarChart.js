import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
const BarChart = () => {
  const selected = useParams();
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4040/profile/${selected.platform}/${selected.id}`)
      .then((res) => {
        if (loaded === false) {
          //Bar Graph

          const data = {
            labels: ["Headshots", "Kills", "Shots Hit", "Shots Fired"],
            datasets: [
              {
                label: `All-time total shooting stats`,
                data: [
                  res.data.segments[0].stats.headshots.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.kills.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.shotsHit.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                  res.data.segments[0].stats.shotsFired.displayValue.replaceAll(
                    ",",
                    ""
                  ),
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
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

  if (loaded === false) {
    return loaded;
  } else {
    return (
      <div className="chart">
        {data && (
          <Bar
            redraw
            data={data}
            width={350}
            height={350}
            options={{
              maintainAspectRatio: true,
            }}
          />
        )}
      </div>
    );
  }
};

export default BarChart;
