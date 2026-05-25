import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi', // ключ в redux store

  tagTypes: ['Contact'], // теги нужны для автоматического обновления cache после mutation (по ним мы будем инвалидировать записи то есть обновлять данные после удаления или добавления)

  baseQuery: fetchBaseQuery({
    // базовый URL для всех запросов
    baseUrl: 'https://65e95c314bb72f0a9c513d32.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contact'], // помечаем cache тегом Contact чтобы mutations потом смогли инвалидировать этот cache
    }),

    addContact: builder.mutation({
      query: newContact => ({
        url: `/contacts`,
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'], // после добавления контакта
      // RTK Query автоматически сделает refetch
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'], // обновляем cache после удаления
    }),

    toggleFavorite: builder.mutation({
      query: contact => {
        const { id, isFavorite } = contact;
        return {
          url: `/contacts/${id}`,
          method: 'PUT',
          body: {
            ...contact,
            isFavorite: !isFavorite,
          },
        };
      },
      invalidatesTags: ['Contact'], // обновляем список после изменения favorite
    }),
  }),
});

// RTK Query автоматически генерирует hooks на основе endpoints
// для builder.query добавится префикс 'use' и постфикс "Query"
// для builder.mutation добавится префикс 'use' и постфикс "Mutation"

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useToggleFavoriteMutation,
} = contactsApi;
