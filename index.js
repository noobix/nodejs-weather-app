const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeoCode = require("./src/utils/geoCode");
const getForecast = require("./src/utils/forecast");

const server = express();
server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "./templetes/views"));
hbs.registerPartials(path.join(__dirname, "./templetes/partials"));
server.use(express.static(path.join(__dirname, "./public")));
server.get("/", function (requestObject, responseObject) {
  responseObject.render("index", { title: "Home", data: { name: "Koufie" } });
});
server.get("/about", function (requestObject, responseObject) {
  responseObject.render("about", { title: "About", data: { name: "Ama" } });
});
server.get("/help", function (requestObject, responseObject) {
  responseObject.render("help", { title: "Help", data: { name: "Efua" } });
});
server.get("/weather", function (requestObject, responseObject) {
  if (!requestObject.query.location) {
    return responseObject.json({ error: "Invalid query" });
  }
  getGeoCode(requestObject.query.location, (error, data) => {
    if (error) {
      return responseObject.json({ error: error });
    }
    if (data) {
      getForecast(
        { long: data.longitude, lat: data.latitude, location: data.location },
        (error, data) => {
          if (error) {
            return responseObject.json({ error: error });
          }
          responseObject.json({
            data: data,
          });
        }
      );
    }
  });
});
server.get("/products", function (requestObject, responseObject) {
  console.log(requestObject.query.search);
  if (!requestObject.query.search) {
    return responseObject.json({ error: "Invalid query" });
  }
  responseObject.send({ products: [] });
});
server.get("/help/*", function (requestObject, responseObject) {
  responseObject.render("help", {
    title: "Help",
    data: { name: "Help context not found" },
  });
});
server.get("*", function (requestObject, responseObject) {
  responseObject.render("not_found", {
    title: "Not Found",
    data: { name: "Page not Found" },
  });
});
const PORT = 5000;
server.listen(PORT, function () {
  console.log("Server engaged on port " + PORT);
});
