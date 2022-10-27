const Filter = ({ filter, onChange }) => {
  return (
    <div>
      find countries{' '}
      <input value={filter} onChange={(e) => onChange(e.target.value)}></input>
    </div>
  );
};

export default Filter;
