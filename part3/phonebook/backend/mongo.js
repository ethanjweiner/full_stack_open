// Persons Database Interactions

const mongoose = require('mongoose');
const { generateId } = require('./helpers');

const args = process.argv;

// Only connect to database if called properly
if (args.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = args[2];
const name = args[3];
const number = args[4];

const DATABASE_URL = `mongodb+srv://fso-phonebook:${password}@cluster0.zvf6epw.mongodb.net/?retryWrites=true&w=majority`;

// Database logic

// Schema & models (note: id is auto-generated)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Helpers
const addPerson = async (name, number) => {
  const person = new Person({ name, number });
  const entry = await person.save();
  console.log(
    `added ${entry.name} number ${entry.number} to phonebook with an id of ${entry._id}`
  );
};

const displayPhonebook = async () => {
  console.log('phonebook:');
  const people = await Person.find({});
  people.forEach(({ name, number }) => {
    console.log(`${name} ${number}`);
  });
};

// Connect to database, perform operations, close connection
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to database');
    if (name && number) {
      return addPerson(name, number);
    } else {
      return displayPhonebook();
    }
  })
  .then(() => {
    console.log('Database operations complete');
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
