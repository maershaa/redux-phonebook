import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // contacts: [
  //   {
  //     id: 'id-1',
  //     name: 'Rosie ',
  //     surname: 'Simpson',
  //     gender: 'female',
  //     phoneNumber: '459-12-56',
  //     isFavorite: false,
  //   },
  //   {
  //     id: 'id-2',
  //     name: 'Hermione ',
  //     surname: 'Kline',
  //     gender: 'female',
  //     phoneNumber: '443-89-12',
  //     isFavorite: true,
  //   },
  //   {
  //     id: 'id-3',
  //     name: 'Eden ',
  //     gender: 'male',
  //     surname: 'Clements',
  //     phoneNumber: '645-17-79',
  //     isFavorite: false,
  //   },
  //   {
  //     id: 'id-4',
  //     name: 'Annie ',
  //     surname: 'Copeland',
  //     phoneNumber: '227-91-26',
  //     isFavorite: false,
  //   },
  // ],
  contacts: JSON.parse(localStorage.getItem('contactsList')) || [],
  // filter: { value: '' },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      // action === newContact
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      // action === idToDelete
      state.contacts = state.contacts.filter(el => el.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      // action === idToToggle
      const contactToToggle = state.contacts.find(
        contact => contact.id === action.payload
      );
      if (contactToToggle) {
        contactToToggle.isFavorite = !contactToToggle.isFavorite;
      }
    },
  },
});

export const { addContact, deleteContact, toggleFavorite } =
  contactsSlice.actions;

export default contactsSlice.reducer;
