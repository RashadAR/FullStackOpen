import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import axios from "axios"
import Country from "./components/Country"

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (filter) {
      axios
        .get(`https://restcountries.com/v3.1/name/${filter}`)
        .then(response => {
          setCountries(response.data)
          setSelectedCountry(null)
        })
        .catch(error => {
          console.error(error)
          setCountries([])
          setSelectedCountry(null)
        })
    } else {
      setCountries([]);
      setSelectedCountry(null)
    }
  }, [filter])


  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }
  return (
    <>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <div>
        {countries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countries.length <= 10 && countries.length > 1 && (
          <ul>
            {countries.map(country => (
              <li key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>Show</button>
              </li>
            ))}
          </ul>
        )}
        {countries.length === 1 && (
          <Country country={countries[0]} />
        )}
        {selectedCountry && (
          <Country country={selectedCountry} />
        )}
      </div>
    </>
  )
}

export default App
