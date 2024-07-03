let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = `${country.population}`;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl);
}
let countriesList = [];

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET",
    };

    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            displaySearchResults();
        });
}

function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let country of countriesList) {
        if (country.name.toLowerCase().includes(searchInputEl.value.toLowerCase())) {
            createAndAppendCountry(country);
        }
    }
}
searchInputEl.addEventListener("keyup", displaySearchResults);
getCountries();