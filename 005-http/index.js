import * as config from "./config.js";
import http from "http";
import readline from "readline";
import { isNumberObject } from "util/types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function handleCity(input) {
  const exit = parseInt(input);

  if (!isNaN(exit)) {
    rl.close();
    return;
  }

  const url = `${config.weatherStackUrl}?access_key=${config.weatherStackApiKey}&query=${input}`;
  http
    .get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Error: ${res.statusCode}, ${res.statusMessage}`);
        rl.question("\nInput city: ", handleCity);
        return;
      }
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const weatherData = JSON.parse(data);
          console.log("\nLocation:");
          console.log(weatherData.location);
          console.log("\nCurrent weather:");
          console.log(weatherData.current);
        } catch (err) {
          console.error("Error parsing weather data:", err.message);
        }
        rl.question("\nInput city: ", handleCity);
      });
    })
    .on("error", (err) => {
      console.error("Error http get:", err.message);
      rl.question("\nInput city: ", handleCity);
    });
}

rl.question("\nInput city: ", handleCity);

rl.on("close", () => {
  console.log("Weather forecast is finished)");
});
