import WeatherInfo from "./WeatherInfo"
export default function Country({ country }) {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km²</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={country.flags.png} style={{ maxWidth: "200px" }} />
            <WeatherInfo capital={country.capital[0]} />
        </div>
    )
}