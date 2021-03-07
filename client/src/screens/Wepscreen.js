import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Wepscreen.css";
import WPiechart from "../components/weaponCharts.js/WPiechart";
import WBarchart from "../components/weaponCharts.js/WBarchart";
const Wepscreen = () => {
  //UseState over UseReducer, data does not intertwine with each other.
  const selected = useParams();
  //State
  useEffect(() => {
    axios
      .get(
        `http://localhost:4040/profile/${selected.platform}/${selected.id}/weapon`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mainbox">
      <div className="section1">
        <Link to="/">
          <button className="csgobutton23">Search</button>
        </Link>
        <h1>Lifetime Career Weapon Stats</h1>
        <Link to={`/profile/${selected.platform}/${selected.id}`}>
          <button className="csgobutton1">Back to Summary</button>
        </Link>
      </div>
      <div className="lowersection">
        <div className="section2">
          <WBarchart></WBarchart>
        </div>
        <div className="section3">
          <WPiechart></WPiechart>
        </div>
      </div>
    </div>
  );
};

export default Wepscreen;
