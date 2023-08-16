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
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const response = await fetch(`${BASE_URL}/file/upload`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `Bearer ${token}`,
      },
      body: fileData,
    });
    const data = await response.json();
    return data;
  },
  getUserFilesApi: async (fileData) => {
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const response = await fetch(`${BASE_URL}/file/user-files`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },

  shareFileApi: async (fileId, email, read, write) => {
    const shareData = {
      email,
      read,
      write,
    };
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const response = await fetch(`${BASE_URL}/file/share/${fileId}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shareData),
    });
    const data = await response.json();
    return data;
  },

  deleteFileApi: async (fileId) => {
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const response = await fetch(`${BASE_URL}/file/delete/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
};

export default api;
