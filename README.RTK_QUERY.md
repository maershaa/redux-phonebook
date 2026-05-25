````md
# React + Redux Toolkit Phonebook

Учебное SPA-приложение для управления контактами с авторизацией, фильтрацией и
работой с API через RTK Query.

## Возможности проекта

- добавление контактов;
- удаление контактов;
- добавление в избранное;
- поиск контактов;
- авторизация пользователя;
- работа с server state через RTK Query;
- автоматическое обновление данных после mutation-запросов.

---

# Технологии

- React
- Redux Toolkit
- RTK Query
- React Redux
- React Router
- React Toastify
- MockAPI

---

# Что такое RTK Query

RTK Query — это инструмент из экосистемы Redux Toolkit для работы с серверными
данными.

Он позволяет:

- выполнять запросы к API;
- кэшировать данные;
- автоматически обновлять данные;
- хранить loading/error state;
- генерировать React hooks;
- избавляться от большого количества boilerplate-кода.

RTK Query заменяет:

- createAsyncThunk;
- ручные axios-запросы;
- extraReducers для async logic;
- ручное хранение loading/error/entities.

---

# Как RTK Query реализован в проекте

В проекте создан API slice через `createApi`.

Файл:

```txt
redux/services/contactsApi.js
```

---

## Создание API slice

```js
export const contactsApi = createApi({
  reducerPath: 'contactsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://65e95c314bb72f0a9c513d32.mockapi.io',
  }),

  tagTypes: ['Contact'],

  endpoints: builder => ({
    ...
  }),
});
```

---

# reducerPath

```js
reducerPath: 'contactsApi';
```

Уникальный ключ в Redux store, под которым RTK Query хранит:

- cache;
- loading state;
- error state;
- данные запросов.

---

# baseQuery

```js
baseQuery: fetchBaseQuery({
  baseUrl: 'https://65e95c314bb72f0a9c513d32.mockapi.io',
});
```

Базовый URL для всех HTTP-запросов.

`fetchBaseQuery` — встроенный lightweight-аналог axios внутри RTK Query.

---

# endpoints

Endpoints описывают запросы к серверу.

В проекте используются:

- query — получение данных;
- mutation — изменение данных.

---

# Query

```js
getContacts: builder.query({
  query: () => '/contacts',
  providesTags: ['Contact'],
});
```

`builder.query` используется для GET-запросов.

RTK Query автоматически:

- отправляет запрос;
- сохраняет данные в cache;
- хранит loading/error state.

---

# Mutation

## Добавление контакта

```js
addContact: builder.mutation({
  query: newContact => ({
    url: '/contacts',
    method: 'POST',
    body: newContact,
  }),

  invalidatesTags: ['Contact'],
});
```

## Удаление контакта

```js
deleteContact: builder.mutation({
  query: id => ({
    url: `/contacts/${id}`,
    method: 'DELETE',
  }),

  invalidatesTags: ['Contact'],
});
```

## Избранное

```js
toggleFavorite: builder.mutation({
  query: contact => ({
    url: `/contacts/${contact.id}`,
    method: 'PUT',
    body: {
      ...contact,
      isFavorite: !contact.isFavorite,
    },
  }),

  invalidatesTags: ['Contact'],
});
```

---

# invalidatesTags и providesTags

RTK Query использует систему тегов для обновления cache.

## providesTags

```js
providesTags: ['Contact'];
```

Помечает cache тегом `Contact`.

---

## invalidatesTags

```js
invalidatesTags: ['Contact'];
```

После mutation RTK Query:

1. инвалидирует cache;
2. автоматически делает повторный GET-запрос;
3. обновляет UI.

---

# Автоматически сгенерированные hooks

RTK Query автоматически создает hooks на основе endpoints.

```js
export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useToggleFavoriteMutation,
} = contactsApi;
```

## Правила генерации

### builder.query

Добавляет:

- префикс `use`
- постфикс `Query`

Пример:

```js
getContacts
↓
useGetContactsQuery
```

---

### builder.mutation

Добавляет:

- префикс `use`
- постфикс `Mutation`

Пример:

```js
addContact
↓
useAddContactMutation
```

---

# Подключение RTK Query в store

```js
export default configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
```

---

# middleware

RTK Query middleware отвечает за:

- cache management;
- invalidation;
- polling;
- refetch;
- async lifecycle.

---

# Пример использования query hook

```js
const { data: contacts = [] } = useGetContactsQuery();
```

RTK Query автоматически предоставляет:

- data;
- isLoading;
- error;
- refetch;
- status.

---

# Пример использования mutation hook

```js
const [addContact] = useAddContactMutation();

addContact(newContact);
```

Mutation hooks возвращают функцию для выполнения запроса.

---

# Преимущества RTK Query

По сравнению с createAsyncThunk:

- меньше boilerplate;
- не нужны extraReducers;
- не нужно хранить loading/error вручную;
- встроенный cache;
- автоматический refetch;
- cleaner architecture;
- меньше Redux-кода.

---

# Структура проекта

```txt
src/
│
├── redux/
│   ├── services/
│   │   └── contactsApi.js
│   │
│   ├── authSlice.js
│   ├── filterSlice.js
│   ├── selectors.js
│   └── store.js
│
├── pages/
├── components/
└── assets/
```

---

# Запуск проекта

## Установка зависимостей

```bash
npm install
```

---

## Запуск dev server

```bash
npm run dev
```
````
