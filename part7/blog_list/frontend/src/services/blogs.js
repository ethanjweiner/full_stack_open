import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Note: If unauthorized, blog creation fails
const add = async (blogData) => {
  const response = await axios.post(baseUrl, blogData, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const update = async (id, blogData) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogData, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export default { getAll, add, update, setToken };
