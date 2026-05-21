import { createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  addContact,
  deleteContact,
  toggleFavorite,
} from '@/redux/operations';

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
  // contacts:
  // JSON.parse(localStorage.getItem('contactsList')) ||
  // [],
  isLoading: false,
  error: null,
  entities: [], // «entities» означает «уникальные элементы с идентификатором», что как раз и описывает наши объекты c контактами.
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // getContacts
      .addCase(getContacts.pending, handlePending)
      .addCase(getContacts.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getContacts.rejected, handleRejected)
      //addContact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.entities.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, handleRejected)
      //deleteContact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.entities = state.entities.filter(
          el => el.id !== action.payload.id
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, handleRejected)
      //toggleFavorite
      .addCase(toggleFavorite.pending, handlePending)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.entities.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index !== -1) {
          // перезаписываем старый контакт новым объектом от сервера
          state.entities[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, handleRejected);
  },
});

export default contactsSlice.reducer;
