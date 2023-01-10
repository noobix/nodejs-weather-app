const request = require("request");

function getGeoCode(city, callback) {
  const geourl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    city
  )}.json?access_token=pk.eyJ1Ijoibm9vYml4IiwiYSI6ImNsY2dyamp0YzB3M2Uzcm4weGZkaTB1MHIifQ.znGMfIdYK0tnCb9Phu3YOw&limit=1`;
  request({ uri: geourl, json: true }, (error, response) => {
    if (error) {
      callback("Cannot connect to server", undefined);
    }
    if (response?.body?.features?.length === 0) {
      callback("No data available", undefined);
    }
    if (response?.body?.features.length > 0) {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
}
module.exports = getGeoCode;
