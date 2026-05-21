export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectContacts = state => state.contacts.entities;

export const selectFilter = state => state.filter.value;
