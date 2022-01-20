import axios from "axios";

const apiURL = "https://api.football-data.org";
const apiKey = "990e731a6b2c481b81529bd88185a7e3";

const api = axios.create({
  baseURL: apiURL,
  responseType: "json",
  headers: { "X-Auth-Token": apiKey },
});

export default api;
