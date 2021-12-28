import axios from "axios";
import fetch from "node-fetch";

axios
  .get("https://a3510377.github.io/AntiMosquito/")
  .then((res) => res.data)
  .then((data) => console.log(data));
