const weatherForm = document.querySelector("form");
const serachField = document.querySelector("#location");
const output1 = document.querySelector(".weather");
const output2 = document.querySelector(".output");
weatherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  output1.textContent = "Loading...";
  output2.textContent = "";
  fetch(`http://localhost:5000/weather?location=${serachField.value}`)
    .then((response) => response.json())
    .then(({ data }) => {
      if (data.error) output2.textContent = data.error;
      output1.textContent = data.forecast;
      output2.textContent = data.location;
    });
});
