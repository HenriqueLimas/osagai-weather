import { define } from "osagai";
import styles from "./styles.css";
import { getForecast } from './api';

function Forecast({ element, update }) {
  const city = element.getAttribute('city')
  element.loadForecast = () => {
    return getForecast(city)
      .then(data => {
        update(() => data)
      })
  }

  return ({ today, future } = {}) => `
    <div class="${today ? styles.card : ''}">
      ${today ? `
      <div class="${styles.location}">${city}</div>
      <div class="${styles.date}" data-dt="0"></div>
      <div class="${styles.description}"></div>
      <div class="${styles.current}">
        <div class="${styles.visual}">
          <div class="${styles.icon} ${styles[today.weather.icon]}"></div>
          <div class="${styles.temperature}">
            <span class="${styles.value}"></span><span class="${styles.scale}">${today.temperature || ''}°C</span>
          </div>
        </div>
        <div class="${styles.description}">
          <div class="${styles.precip}">${today.precipitation.snow || today.precipitation.rain || 0}%</div>
          <div class="${styles.humidity}">${today.humidity}%</div>
          <div class="${styles.wind}">
            <span class="${styles.value}">${today.wind}</span> <span class="${styles.scale}">km/h</span>
          </div>
        </div>
      </div>
      <div class="${styles.future}">
        ${future.map(day => `
          <div class="${styles.oneday}">
            <div class="${styles.date}"></div>
            <div class="${styles.icon} ${styles[day.weather.icon]}"></div>
            <div class="${styles.tempHigh}"><span class="${styles.value}">${day.temperatureMax}</span>°</div>
            <div class="${styles.tempLow}"><span class="${styles.value}">${day.temperatureMin}</span>°</div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  `;
}

define("weather-forecast", Forecast);
