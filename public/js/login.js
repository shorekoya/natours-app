/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (
  name,
  email,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response) {
      showAlert('error', err.response.data.message);
    } else {
      console.log(err.message);
    }
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response) {
      showAlert('error', err.response.data.message);
    } else {
      console.log(err.message);
    }
  }
};

export const logout = async () => {
  try {
    const baseURL =
      window.location.hostname === 'localhost'
        ? 'http://127.0.0.1:8000'
        : 'https://natours-r3qu.onrender.com';

    const res = await axios({
      method: 'GET',
      url: `${baseURL}/api/v1/users/logout`,
    });

    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
