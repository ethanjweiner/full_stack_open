const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (_, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString();
    delete returnedPerson._id;
    delete returnedPerson.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
