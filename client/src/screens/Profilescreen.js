import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./Profilescreen.css";
//Components
import Wepscreen from "../screens/Wepscreen";
import PieChart from "../components/PieChart";
import DoughnutChart from "../components/DoughnutChart.js";
import BarChart from "../components/BarChart";
//Test http://localhost:3000/profile/steam/76561198008049283
const Profilescreen = () => {
  //UseState over UseReducer, data does not intertwine with each other.
  const selected = useParams();
  //State
  const [loaded, setLoaded] = useState(false);
  //Header Bar
  const [profilepic, setProfilePic] = useState("");
  const [profileUser, setProfileUser] = useState("");
  const [timePlayed, setTimePlayed] = useState("");
  const [wlPercentage, setwlPercentage] = useState("");
  //Top Bar
  const [wins, setWins] = useState("");
  const [ties, setTies] = useState("");
  const [moneyEarned, setMoneyEarned] = useState("");
  const [damage, setDamage] = useState("");
  //Second Bar
  const [kd, setKD] = useState("");
  const [bombsdefused, setBombsDefused] = useState("");
  const [bombsplanted, setBombsPlanted] = useState("");
  const [dominations, setDominations] = useState("");
  const [revenge, setRevenge] = useState("");
  const [hostageResc, setHostageResc] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4040/profile/${selected.platform}/${selected.id}`)
      .then((res) => {
        if (loaded === false) {
          setProfilePic(res.data.platformInfo.avatarUrl);
          setProfileUser(res.data.platformInfo.platformUserHandle);
          setTimePlayed(res.data.segments[0].stats.timePlayed.displayValue);
          setwlPercentage(res.data.segments[0].stats.wlPercentage.displayValue);
          setWins(res.data.segments[0].stats.wins.displayValue);
          setTies(res.data.segments[0].stats.ties.displayValue);
          setMoneyEarned(res.data.segments[0].stats.moneyEarned.displayValue);
          setKD(res.data.segments[0].stats.kd.displayValue);
          setBombsDefused(res.data.segments[0].stats.bombsDefused.displayValue);
          setBombsPlanted(res.data.segments[0].stats.bombsPlanted.displayValue);
          setDominations(res.data.segments[0].stats.dominations.displayValue);
          setRevenge(
            res.data.segments[0].stats.dominationRevenges.displayValue
          );
          setHostageResc(
            res.data.segments[0].stats.hostagesRescued.displayValue
          );
          setDamage(res.data.segments[0].stats.damage.displayValue);
          setLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loaded === "false") {
    return loaded;
  } else {
    return (
      <div className="mainbox">
        <div className="top">
          <div className="first2">
            <img
              src={profilepic}
              style={{ borderRadius: "15px" }}
              alt="Profile Picture"
              width="100px"
              height="100px"
            />
            <Link to="/">
              <button className="csgobutton1">Search</button>
            </Link>
          </div>
          <h2>
            <span style={{ color: "white" }}>{profileUser}</span>
          </h2>
          <div className="btnwin">
            <h1 className="WinPercentage">
              Win Percentage:{" "}
              <span style={{ color: "green" }}>{wlPercentage} </span>
            </h1>
            <div className="csgobutton2">
              <Link to={`/profile/${selected.platform}/${selected.id}/weapon`}>
                <button className="csgobutton2">Weapon Graphs</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="career">
          <h2>
            Time Played: <span style={{ color: "black" }}>{timePlayed}</span>
          </h2>
          <h2>
            Total Damage Done: <span style={{ color: "red" }}>-{damage}</span>
          </h2>
          <h2>
            Wins: <span style={{ color: "green" }}>{wins}</span>
          </h2>
          <h2>
            Ties: <span style={{ color: "yellow" }}>{ties}</span>
          </h2>
          <h2>
            Money Earned: <span style={{ color: "green" }}>${moneyEarned}</span>
          </h2>
        </div>

        <div className="careerdata">
          <p>
            KD: <span style={{ color: "magenta" }}>{kd}</span>
          </p>
          <p>
            Bombs Defused: <span style={{ color: "blue" }}>{bombsdefused}</span>
          </p>
          <p>
            Bombs Planted: <span style={{ color: "blue" }}>{bombsplanted}</span>
          </p>
          <p>
            Dominations: <span style={{ color: "crimson" }}>{dominations}</span>
          </p>
          <p>
            Revenges: <span style={{ color: "crimson" }}>{revenge}</span>
          </p>
          <p>
            Hostages Rescued:{" "}
            <span style={{ color: "magenta" }}>{hostageResc}</span>
          </p>
        </div>

        <div className="main">
          <PieChart></PieChart>
          <DoughnutChart></DoughnutChart>
          <BarChart></BarChart>
        </div>
      </div>
    );
  }
};

export default Profilescreen;
