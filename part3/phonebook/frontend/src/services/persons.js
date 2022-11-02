// Persons API

import axios from 'axios';

const API_BASE_URL = '/api/persons';

const getAll = () => axios.get(API_BASE_URL).then(({ data }) => data);

const add = (newPerson) =>
  axios.post(API_BASE_URL, newPerson).then(({ data }) => data);

const remove = (id) => axios.delete(`${API_BASE_URL}/${id}`);

const update = (id, newPerson) =>
  axios.put(`${API_BASE_URL}/${id}`, newPerson).then(({ data }) => data);

export default {
  getAll,
  add,
  remove,
  update,
};
