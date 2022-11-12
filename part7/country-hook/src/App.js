import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  // Updates whenever name updates
  useEffect(() => {
    async function fetchCountry() {
      const response = await axios.get(
        `${BASE_URL}/name/${name}?fullText=true`
      );

      if (response.status === 200) {
        return response.data[0];
      } else {
        console.log('Could not fetch country.');
      }
    }

    fetchCountry()
      .then(setCountry)
      .catch((err) => console.log(err.message));
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');

  // Hook into the `useCountry` state pattern -> country fetching & state is
  // available within `App`
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
