import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

let countriesEl = [];

const input = document.getElementById("search-box");
const ul = document.querySelector(".country-list");
input.addEventListener("input", debounce((event) => {

    fetchCountries(event.target.value)
        .then((countries) => {

            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                countriesEl = [];
            }

            if (countries.length <= 10 && countries.length >= 2) {
                countriesEl = countries.map((country) => {
                    return `<li class="country-list__item">
            <img width="30" height="30" src=${country.flags.svg}>
            ${country.name.official}
          </li>`
                }).join("");
            }

            if (countries.length === 1) {
                countriesEl = countries.map((country) => {
                    return `<li><p class="country-list__official-name"> <img width="30" height="30" src=${country.flags.svg}>
            <b> ${country.name.official}</b></p> 
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages).join(", ")}</p> 
            </li>`
                }).join("");
            }

            ul.innerHTML = countriesEl;

        })
        .catch(error => {
            if (error.message === "404")
                Notiflix.Notify.failure("Oops, there is no country with that name");
            ul.innerHTML = "";
            if (error.message === "405") {
                ul.innerHTML = "";
            }
        });

}, DEBOUNCE_DELAY));



