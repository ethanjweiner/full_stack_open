import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Matches from './components/Matches';

function App() {
  const [countries, setCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const matches = countries.filter(({ name }) =>
    name.common.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <Filter filter={nameFilter} onChange={setNameFilter} />
      <Matches matches={matches} onShow={setNameFilter} />
    </div>
  );
}

export default App;
