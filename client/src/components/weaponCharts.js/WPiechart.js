import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "../../screens/Wepscreen.css";
const WPiechart = () => {
  const selected = useParams();
  const [reqdata, setReqData] = useState({});
  const [data, setData] = useState({ labels: [], datasets: [] });

  const [loaded, setLoaded] = useState(false);
  //Load Data, we are using a function to pass in the API data + the index that is chosen from the select handler.

  const loadData = (res, chosen) => {
    const data = {
      labels: ["Accuracy Percentage", "Miss Percentage"],
      datasets: [
        {
          label: `Accuracy`,
          data: [
            res.data[chosen].stats.shotsAccuracy.displayValue,
            100 - res.data[chosen].stats.shotsAccuracy.displayValue,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };
    return data;
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4040/profile/${selected.platform}/${selected.id}/weapon`
      )
      .then((res) => {
        if (loaded === false) {
          //Pie Graph
          //Set Default Data
          const chosenData = loadData(res, 0);

          setLoaded(true);
          // We are saving the API data in reqdata.
          setReqData(res);
          //Set Default State
          setData(chosenData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    // reqdata is the API data that we save in our local storage
    // The select dropdown refers to this instead of calling the API repeatedly.
    const data = {
      labels: ["Shooting Accuracy Percentage", "Miss Percentage"],
      datasets: [
        {
          label: `Accuracy`,
          data: [
            reqdata.data[e.target.value].stats.shotsAccuracy.displayValue,
            100 - reqdata.data[e.target.value].stats.shotsAccuracy.displayValue,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };

    setData(data);
  };

  return (
    <div className="third">
      <div className="chart">
        <select onChange={handleChange}>
          <option value="0">AK47</option>
          <option value="13">M4A1</option>
          <option value="2">AWP</option>
          <option value="4">Deagle</option>
          <option value="25">SSG08</option>
          <option value="10">Glock</option>
          <option value="11">P2000</option>
          <option value="20">P250</option>
          <option value="27">FIVESEVEN</option>
          <option value="7">TEC9</option>
          <option value="5">Dualies</option>
          <option value="14">MAC10</option>
          <option value="17">MP9</option>
          <option value="3">PP19</option>
          <option value="21">P90</option>
          <option value="24">SG556</option>
          <option value="1">AUG</option>
          <option value="6">FAMAS</option>
          <option value="9">GALIL</option>
          <option value="23">SCAR-20</option>
          <option value="22">SAWED-OFF</option>
          <option value="19">NOVA</option>
          <option value="15">MAG-7</option>
          <option value="29">XM1014</option>
        </select>
        <Pie
          redraw
          data={data}
          width={400}
          height={500}
          options={{ maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
};

export default WPiechart;
