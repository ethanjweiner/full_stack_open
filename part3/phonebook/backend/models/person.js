/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Person name required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'Person phone number required'],
    validate: {
      validator(input) {
        return /^\d{2,3}-\d+$/.test(input);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
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
