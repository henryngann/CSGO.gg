const express = require("express");
const axios = require("axios");
const app = express();
var cors = require("cors");
const PORT = 4040;
//API KEY 4f4dbfbe-8464-455a-a452-e19b640a292e
//Middleware
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

async function fetchData(platform, id) {
  const config = {
    method: "get",
    url: `https://public-api.tracker.gg/v2/csgo/standard/profile/${platform}/${id}`,
    headers: {
      "TRN-Api-Key": "4f4dbfbe-8464-455a-a452-e19b640a292e",
    },
  };
  let response = await axios(config);
  return response.data.data;
}

async function fetchSegment(platform, id) {
  const config = {
    method: "get",
    url: `https://public-api.tracker.gg/v2/csgo/standard/profile/${platform}/${id}/segments/weapon`,
    headers: {
      "TRN-Api-Key": "4f4dbfbe-8464-455a-a452-e19b640a292e",
    },
  };
  let response = await axios(config);
  return response.data.data;
}

//Homepage Route
app.get("/", (req, res) => {
  console.log("homepage route hit");
  res.send("hello world.");
});

//Profile Route
//Test http://localhost:4040/profile/steam/76561198110461760
app.get("/profile/:platform/:id", async (req, res) => {
  let data = await fetchData(req.params.platform, req.params.id);
  console.log("Profile Route Hit");
  res.send(data);
});

app.get("/profile/:platform/:id/weapon", async (req, res) => {
  let data = await fetchSegment(req.params.platform, req.params.id);
  console.log("Segment Route Hit");
  res.send(data);
});
