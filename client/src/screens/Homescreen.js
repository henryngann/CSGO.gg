import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Homescreen.css";
const Homescreen = () => {
  const [platform, setPlatform] = useState("");
  const [steamid, setSteamId] = useState("");
  // http://localhost:3000/profile/steam/76561198008049283 // test
  const searchChange = (e) => {
    setSteamId(e.target.value);
  };
  const handlePlatform = (e) => {
    setPlatform(e.target.value);
  };

  const handleSubmit = (e) => {};
  return (
    <div className="mainbox">
      <div className="logo">
        <img
          src="https://britishesports.b-cdn.net/wp-content/uploads/2019/01/csgo-300x130.png"
          alt="logo"
          width="300"
          height="130"
        />
      </div>
      <div className="titlehome">
        <h1>Search a player!</h1>
      </div>
      <div className="searchbar">
        <form>
          <label htmlFor="platform">Platform:</label>
          <input
            type="text"
            id="platform"
            name="platform"
            onChange={(e) => handlePlatform(e)}
          />
          <label htmlFor="steamid">SteamID</label>
          <input
            type="text"
            id="steamid"
            name="steamid"
            onChange={(e) => searchChange(e)}
          />
          <Link to={`/profile/${platform}/${steamid}`}>
            <input type="submit" value="Submit" onSubmit={handleSubmit} />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Homescreen;
