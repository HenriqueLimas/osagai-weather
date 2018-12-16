import { define } from "osagai";
import styles from "./styles.css";

import "./loader/weather-loader";
import "./forecast/weather-forecast";

function App({ queryAll, update }) {
  const initialData = {
    state: "loading",
    visibleCards: {},
    selectedCities: [],
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };

  queryAll("weather-forecast").then(forecasts => {
    update((data = {}) => {
      data.state = "loading";
      return data;
    });

    return Promise.all(
      Array.from(forecasts).map(forecast => forecast.loadForecast())
    )
      .then(() => {
        update((data = {}) => {
          data.state = "idle";
          return data;
        });
      })
      .catch(() => {
        update(data => {
          data.state = "error";
          return data;
        });
      });
  });

  return (data = initialData) => {
    return `
      <div>
        <main class="${styles.main}">
          <weather-forecast city="berlin"></weather-forecast>
        </main>

        ${data.state === "loading" ? "<weather-loader></weather-loader>" : ""}
        ${
          data.state === "error"
            ? `<h3 class=${styles.error}>Ooops, it seems you are offline</h3>`
            : ""
        }
      </div>
    `;
  };
}

define("weather-app", App);
