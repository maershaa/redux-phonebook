import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://65e95c314bb72f0a9c513d32.mockapi.io/contacts';

const getContacts = createAsyncThunk('contacts/getContacts', async () => {
  const getContactsOptions = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  };

  const response = await fetch(BASE_URL, getContactsOptions);
  return response.json();
});

const addContact = createAsyncThunk('contacts/addContact', async data => {
  const postOptions = {
    method: 'POST', // или 'PUT'
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
  };

  const response = await fetch(BASE_URL, postOptions);
  return response.json();
});

const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
  const deleteOptions = {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  };

  const response = await fetch(`${BASE_URL}/${id}`, deleteOptions);
  return response.json();
});

// const toggleFavorite = createAsyncThunk(
//   'contacts/toggleFavorite',
//   async ({ id, isFavorite }) => {
//     console.log('🚀 ~ id:', id);
//     const toggleFavoriteOptions = {
//       method: 'PATCH',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ isFavorite: !isFavorite }),
//     };

//     const response = await fetch(`${BASE_URL}/${id}`, toggleFavoriteOptions);
//     return response.json();
//   }
// );

export {
  getContacts,
  addContact,
  deleteContact,
  // toggleFavorite
};
