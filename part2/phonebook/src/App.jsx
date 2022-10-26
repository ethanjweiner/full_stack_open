import { useState } from 'react';

const App = () => {
  // State
  const [nameFilter, setNewNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const shownPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(nameFilter.toLowerCase());
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDuplicateName(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    addPerson();
  };

  const isDuplicateName = (name) => {
    return !!persons.find((person) => name === person.name);
  };

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    resetState();
  };

  const resetState = () => {
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={nameFilter} onNewNameFilter={setNewNameFilter} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNewName={setNewName}
        onNewNumber={setNewNumber}
        onSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  );
};

const Filter = ({ name, onNewNameFilter }) => (
  <div>
    filter shown with:{' '}
    <input value={name} onChange={(e) => onNewNameFilter(e.target.value)} />
  </div>
);

const PersonForm = ({
  newName,
  newNumber,
  onNewName,
  onNewNumber,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name:{' '}
      <input value={newName} onChange={(e) => onNewName(e.target.value)} />
    </div>
    <div>
      number:{' '}
      <input value={newNumber} onChange={(e) => onNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons }) =>
  persons.map((person) => <Person key={person.name} person={person} />);

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

export default App;
