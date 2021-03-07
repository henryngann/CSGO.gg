import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const WBarchart = () => {
  const selected = useParams();
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://localhost:4040/profile/${selected.platform}/${selected.id}/weapon`
      )
      .then((res) => {
        if (loaded === false) {
          //Bar Graph

          const data = {
            labels: ["AK47", "M4A1", "Deagle", "AWP", "GLOCK", "P2000"],
            datasets: [
              {
                label: `Total Players Killed`,
                data: [
                  res.data[0].stats.kills.displayValue.replaceAll(",", ""),
                  res.data[13].stats.kills.displayValue.replaceAll(",", ""),
                  res.data[4].stats.kills.displayValue.replaceAll(",", ""),
                  res.data[2].stats.kills.displayValue.replaceAll(",", ""),
                  res.data[10].stats.kills.displayValue.replaceAll(",", ""),
                  res.data[11].stats.kills.displayValue.replaceAll(",", ""),
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
              },
            ],
          };
          setLoaded(true);
          setData(data);
          console.log(data);
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
            width={800}
            height={550}
            options={{
              maintainAspectRatio: true,
            }}
          />
        )}
      </div>
    );
  }
};

export default WBarchart;
