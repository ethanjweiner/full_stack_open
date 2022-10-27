import Weather from './Weather';

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common}></img>
      <Weather capital={country.capital[0]} />
    </div>
  );
};

export default Country;
