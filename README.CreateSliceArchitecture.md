# Todo List — Redux Toolkit: createSlice

Учебный проект Todo List для изучения современной архитектуры Redux Toolkit через `createSlice`.

Проект реализован с использованием:

- configureStore
- createSlice
- reducers
- actions
- Immer
- dispatch
- useSelector
- useDispatch

---

# Технологии

- React
- Redux Toolkit
- React Redux
- Vite
- CSS

---

# Особенности реализации

В проекте используется `createSlice` — самый современный и рекомендуемый способ написания Redux-логики.

`createSlice` автоматически:

- создает reducer
- создает actions
- генерирует action creators
- связывает actions и reducers

Благодаря этому код становится значительно короче и чище по сравнению с классическим Redux.

---

# Структура проекта

```txt
src/
│
├── app/
│   ├── App.jsx
│   └── main.jsx
│
├── assets/
│   └── styles/
│       └── index.css
│
└── redux/
    │
    ├── store.js
    │
    ├── todo/
    │   └── todoSlice.js
    │
    └── filter/
        └── filterSlice.js
```

---

# Как работает Redux в проекте

Redux хранит глобальное состояние приложения в store.

Состояние разделено на 2 части:

```js
state = {
  todos: {
    items: [],
  },

  filter: {
    value: 'all',
  },
};
```

---

# store.js

Файл `store.js` создает Redux store через `configureStore`.

```js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import filterReducer from './filter/filterSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
});
```

---

# createSlice

`createSlice` объединяет:

- initialState
- reducers
- actions

в одном месте.

---

# todoSlice.js

Файл отвечает за:

- добавление задач
- удаление задач
- изменение статуса задачи

---

# Начальное состояние

```js
const initialState = {
  items: [],
};
```

---

# Создание slice

```js
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});
```

---

# name

Поле `name` используется как префикс для action type.

```js
name: 'todos';
```

Например:

```js
addTodo;
```

автоматически создаст action:

```js
{
  type: 'todos/addTodo';
}
```

---

# reducers

Внутри reducers описываются reducer-функции.

```js
reducers: {
  addTodo(state, action) {},
}
```

---

# Добавление задачи

```js
addTodo(state, action) {
  state.items.push({
    id: Date.now(),
    text: action.payload,
    isCompleted: false,
  });
}
```

---

# Удаление задачи

```js
deleteTodo(state, action) {
  state.items = state.items.filter(
    (todo) => todo.id !== action.payload
  );
}
```

---

# Изменение статуса задачи

```js
toggleTodo(state, action) {
  const currentTodo = state.items.find(
    (todo) => todo.id === action.payload
  );

  if (currentTodo) {
    currentTodo.isCompleted = !currentTodo.isCompleted;
  }
}
```

---

# Автоматическое создание actions

`createSlice` автоматически создает actions.

```js
export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
```

---

# Экспорт reducer

```js
export default todoSlice.reducer;
```

---

# Почему reducer экспортируется через .reducer

`todoSlice` — это объект.

Он содержит:

```js
{
  (name, reducer, actions, caseReducers);
}
```

Поэтому для store нужен именно:

```js
todoSlice.reducer;
```

---

# filterSlice.js

Хранит текущий фильтр:

```js
'all';
'active';
'completed';
```

---

# Начальное состояние

```js
const initialState = {
  value: 'all',
};
```

---

# Изменение фильтра

```js
setFilter(state, action) {
  state.value = action.payload;
}
```

---

# Immer

Redux Toolkit использует Immer под капотом.

Благодаря этому можно писать код в стиле мутации state:

```js
state.items.push(newTodo);
```

или:

```js
todo.isCompleted = !todo.isCompleted;
```

Но Immer автоматически создает immutable state.

---

# Подключение Redux к React

В `main.jsx` приложение оборачивается в `Provider`.

```js
import { Provider } from 'react-redux';
import store from '../redux/store';

<Provider store={store}>
  <App />
</Provider>;
```

Provider дает доступ ко всему Redux store внутри приложения.

---

# useSelector

`useSelector` используется для получения данных из store.

```js
const todos = useSelector((state) => state.todos.items);

const filter = useSelector((state) => state.filter.value);
```

---

# useDispatch

`useDispatch` используется для отправки actions.

```js
const dispatch = useDispatch();
```

---

# Dispatch Actions

## Добавление задачи

```js
dispatch(addTodo(todoText));
```

---

## Удаление задачи

```js
dispatch(deleteTodo(todoId));
```

---

## Изменение статуса

```js
dispatch(toggleTodo(todoId));
```

---

## Изменение фильтра

```js
dispatch(setFilter('completed'));
```

---

# useMemo

Для фильтрации задач используется `useMemo`.

```js
const filteredTodos = useMemo(() => {
  if (filter === 'active') {
    return todos.filter((el) => !el.isCompleted);
  }

  if (filter === 'completed') {
    return todos.filter((el) => el.isCompleted);
  }

  return todos;
}, [filter, todos]);
```

`useMemo` предотвращает лишние вычисления при ререндере.

---

# Как работает Redux Flow

## 1. Компонент вызывает dispatch

```js
dispatch(addTodo('Изучить createSlice'));
```

↓

## 2. createSlice автоматически создает action

```js
{
  type: 'todos/addTodo',
  payload: 'Изучить createSlice'
}
```

↓

## 3. Reducer внутри slice обрабатывает action

```js
addTodo(state, action);
```

↓

## 4. Immer создает новый immutable state

↓

## 5. Redux обновляет store

↓

## 6. React автоматически перерисовывает UI

---

# Преимущества createSlice

✅ Минимум boilerplate-кода
✅ Actions и reducers находятся в одном месте
✅ Автоматическое создание actions
✅ Нет switch/case
✅ Упрощенная работа с immutable state
✅ Более читаемый код
✅ Встроенный Immer
✅ Самый современный Redux Toolkit подход

---
