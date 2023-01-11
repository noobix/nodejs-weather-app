const request = require("request");

function getForecast(coords, callback) {
  const { long, lat, location } = coords;
  const weatherurl = `http://api.weatherstack.com/current?access_key=6dbc387c354774e42b4842409beab8cc&query=${long},${lat}&units=m`;
  request({ uri: weatherurl, json: true }, (error, response) => {
    if (error) {
      callback("Cannot connect to server", undefined);
    }
    if (response?.body?.error) {
      callback(response.body.error[2], undefined);
    }
    if (response?.body?.request) {
      callback(undefined, {
        forecast: `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress and there is ${response.body.current.precip} % chance of rain. Humidity is set to ${response.body.current.humidity}`,
        location: location,
      });
    }
  });
}
module.exports = getForecast;
