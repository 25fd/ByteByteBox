const BASE_URL = 'http://localhost:8080/api';

const api = {
  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  },
  login: async (userData) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  },
  uploadFile: async (fileData) => {
    const response = await fetch(`${BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: fileData,
    });
    const data = await response.json();
    return data;
  },
};

export default api;
