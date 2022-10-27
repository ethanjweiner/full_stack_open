import Country from './Country';

const Matches = ({ matches, onShow }) => {
  switch (true) {
    case matches.length > 10:
      return <div>Too many matches, specify another filter</div>;
    case matches.length === 0:
      return <div>No matches</div>;
    case matches.length === 1:
      return <Country country={matches[0]} />;
    default:
      return <Countries countries={matches} onShow={onShow} />;
  }
};

const Countries = ({ countries, onShow }) => {
  return countries.map(({ name }) => (
    <div key={name.common}>
      {name.common}
      <button onClick={() => onShow(name.common)}>show</button>
    </div>
  ));
};

export default Matches;
