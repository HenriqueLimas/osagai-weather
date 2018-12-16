const weatherApiBaseURL = '//api.openweathermap.org/data/2.5/'
const apiKey = 'ff94e64ccdf47f76d92a0140e49b47b9'

export function getForecast(city) {
  return fetch(`${weatherApiBaseURL}/forecast?cnt=8&units=metric&q=${city}&APPID=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const days = data.list.map(day => ({
        temperature: Math.trunc(day.main.temp),
        temperatureMax: Math.trunc(day.main.temp_max),
        temperatureMin: Math.trunc(day.main.temp_min),
        weather: {
          icon: day.weather[0].main.toLowerCase(),
          description: day.weather[0].description,
        },
        precipitation: {
          snow: day.snow && Math.trunc(day.snow['3h']),
          rain: day.rain && Math.trunc(day.rain['3h']),
        },
        humidity: day.main.humidity,
        wind: Math.round(day.wind.speed * 3.6)
      }))

      return {
        today: days[0],
        future: days.slice(1)
      }
    })
}