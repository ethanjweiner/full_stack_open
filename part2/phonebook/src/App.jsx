import { useEffect } from 'react';
import { useState } from 'react';
import personsService from './services/persons';

const App = () => {
  // State
  const [nameFilter, setNewNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [persons, setPersons] = useState([]);

  const shownPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(nameFilter.toLowerCase());
  });

  const findPersonByName = (name) =>
    persons.find((person) => name === person.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingUser = findPersonByName(newName);

    if (existingUser) {
      confirm(
        `${existingUser.name} is already added to phonebook, replace the old number with a new one?`
      );

      await updateNumber(existingUser, newNumber);
    } else {
      await addPerson();
    }

    resetForm();
  };

  const updateNumber = async (person, number) => {
    const newPerson = await personsService.update(person.id, {
      ...person,
      number,
    });
    setPersons(
      persons.map((_person) => (_person.id === person.id ? newPerson : _person))
    );
  };

  const addPerson = async () => {
    const data = {
      name: newName,
      number: newNumber,
    };

    const newPerson = await personsService.add(data);

    setPersons(persons.concat(newPerson));
  };

  const deletePerson = async (id, name) => {
    confirm(`Delete ${name}?`);
    await personsService.remove(id);

    setPersons(persons.filter((person) => person.id !== id));
  };

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  // Load persons on initial component render
  useEffect(() => {
    personsService.getAll().then(setPersons);
  }, []);

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
      <Persons persons={shownPersons} onDelete={deletePerson} />
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

const Persons = ({ persons, onDelete }) =>
  persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      onDelete={() => onDelete(person.id, person.name)}
    />
  ));

const Person = ({ person, onDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={onDelete}>delete</button>
  </div>
);

export default App;
