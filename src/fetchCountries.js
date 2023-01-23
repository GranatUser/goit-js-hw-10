export default function fetchCountries(url) {
    url = url.trim();
    return fetch(`https://restcountries.com/v3.1/name/${url}?fields=name,capital,population,flags,languages`)
        .then((countries) => {
            if (url.length === 0) {
                throw new Error("405");
            }
            if (!countries.ok) {
                throw new Error(countries.status);
            }
            const info = countries.json()
            return info;
        });
}