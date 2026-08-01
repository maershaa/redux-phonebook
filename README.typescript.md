# 🚀 Миграция React + Vite проекта с JavaScript на TypeScript

> Не нужно переписывать весь проект за один день. JavaScript и TypeScript могут
> спокойно жить вместе, пока ты постепенно переносишь файлы.

---

# Базовые типы в TypeScript

> TypeScript умеет выводить (infer) типы автоматически, поэтому примитивные типы
> часто можно не указывать явно.

## Примитивные типы

```ts
let name: string = 'Иван';
let age: number = 25;
let isOnline: boolean = true;
let emptyValue: null = null;
let notDefined: undefined = undefined;
```

---

# Сложные типы

## Object

> Для объектов лучше явно описывать их структуру, а не использовать `object` или
> `{}`. Тип `object` говорит только «это не примитив», но ничего не знает о
> полях внутри — поэтому TypeScript не сможет подсказать автодополнение или
> найти опечатку в названии свойства.

```ts
const obj: object = {};
const emptyObj: {} = {};

let user: {
  name: string;
  age?: number; // age — необязательное свойство
} = {
  name: 'Tom',
  age: 30,
};
```

---

## Array

### Массив строк

```ts
let arrString: string[] = ['a', 'b', 'c'];
```

### Массив разных типов

```ts
let mixed: (number | string)[] = [1, 'two'];
```

### Массив объектов

```ts
type User = {
  name: string;
  age: number;
};

let users: User[] = [
  { name: 'Tom', age: 30 },
  { name: 'Jack', age: 25 },
  { name: 'Alice', age: 32 },
];
```

---

# Union Type (`|`)

Позволяет указать, что значение может иметь **один из нескольких типов**.

```ts
let mixedType: string | number | boolean;

mixedType = 'hello'; // ✅
mixedType = 42; // ✅
mixedType = true; // ✅
```

Используется, когда заранее известно несколько допустимых вариантов, например
статус запроса: `'loading' | 'success' | 'error'`.

---

# Intersection Type (`&`)

Объединяет несколько типов в один — значение должно соответствовать **всем**
типам сразу.

```ts
type Employee = {
  name: string;
  id: number;
};

type Manager = {
  employees: Employee[];
};

type CEO = Employee & Manager;

const boss: CEO = {
  name: 'Anna',
  id: 1,
  employees: [{ name: 'Tom', id: 2 }],
};
```

Теперь `CEO` обязан содержать свойства обоих типов.

---

# Tuple (Кортеж)

Кортеж — это массив с **фиксированным количеством элементов**, где заранее
известен тип каждого элемента.

```ts
let tupleType: [string, boolean];

tupleType = ['hello', true]; // ✅ OK
tupleType = [true, 'hello']; // ❌ Неверный порядок типов
tupleType = ['hello', true, true]; // ❌ Лишний элемент
```

Подходит для хранения фиксированных наборов данных, например:

- координаты (`[x, y]`)
- дата (`[день, месяц, год]`)
- ответ API (`[data, error]`)

---

# Специальные типы

## `any`

Полностью отключает проверку типов — TypeScript перестаёт следить за переменной
вообще.

```ts
let value: any = 'Hello';

value = 10;
value = true;
```

Использовать рекомендуется только в крайних случаях (например, при временной
заглушке во время миграции), так как `any` убивает весь смысл TypeScript.

---

## `unknown`

Похож на `any`, но безопаснее: значение можно присвоить чему угодно, но
**использовать его нельзя**, пока не проверишь тип.

```ts
let value: unknown = 'Hello';

// ❌ Ошибка: Type 'unknown' is not assignable to type 'string'
let text: string = value;
```

Перед использованием необходимо сузить (narrow) тип:

```ts
if (typeof value === 'string') {
  let text: string = value; // ✅ здесь TS уже знает, что это string
}
```

**Правило:** если не уверен, какой тип придёт извне (например, ответ API) —
используй `unknown`, а не `any`.

---

# Enum

`enum` — это набор именованных констант.

### Строковый enum

```ts
enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Banned = 'BANNED',
}

let status: UserStatus = UserStatus.Active;
```

### Числовой enum

```ts
enum HttpCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
}

const respond = (status: HttpCodes) => {
  // ...
};

respond(HttpCodes.OK);
```

> 💡 В современных React-проектах enum часто заменяют на union-тип из строк
> (`type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED'`) — это проще и не
> добавляет лишнего кода в сборку.

---

# Типизация функций

## Типизация параметров

```ts
const sum = (a: number, b: number) => {
  return a + b;
};
```

## Типизация возвращаемого значения

```ts
const sum = (a: number, b: number): number => {
  return a + b;
};
```

TypeScript обычно сам выводит тип возврата, но явно указывать его полезно — так
функция не сможет случайно начать возвращать что-то другое.

## Пример с массивом объектов

```ts
type User = {
  id: number;
  name: string;
};

const getUserNames = (users: User[]): string[] => {
  return users.map(user => user.name);
};
```

Здесь:

- `users: User[]` — функция принимает массив пользователей;
- `: string[]` — возвращает массив строк.

## `void`

`void` используется для обозначения того, что функция **ничего не возвращает**.
Обычно применяется для колбэков и обработчиков событий.

```ts
const logMessage = (message: string): void => {
  console.log(message);
};

const doSomething = (callback: () => void) => {
  callback();
};

doSomething(() => {
  console.log('Callback function!');
});
```

## `never`

`never` — тип функции, которая **никогда не завершается нормально**: либо всегда
выбрасывает ошибку, либо уходит в бесконечный цикл.

```ts
// Функция, которая всегда выбрасывает ошибку
const throwError = (message: string): never => {
  throw new Error(message);
};

// Функция с бесконечным циклом
const infiniteLoop = (): never => {
  while (true) {}
};
```

Отличие от `void`: `void` — функция завершилась, просто ничего не вернула.
`never` — функция вообще не может завершиться штатно.

---

# Кратко про `type` и `interface`

Оба используются для описания структуры данных.

## Type

Чаще используется для:

- Union (`|`)
- Intersection (`&`)
- алиасов примитивов
- кортежей

```ts
type User = {
  name: string;
  age: number;
};
```

## Interface

Чаще используют для описания объектов, пропсов React-компонентов и классов.

```ts
interface User {
  name: string;
  age: number;
}
```

### Что выбрать?

Для большинства React-проектов оба варианта подходят.

Общее правило:

- `interface` — описание объектов и пропсов;
- `type` — всё остальное (Union, Intersection, Tuple и т.д.).

---

# Type Guards

Type Guards в TypeScript — это инструменты, которые помогают TypeScript понять,
с каким именно типом мы работаем внутри `if`, когда переменная описана через
Union Type.

Основные инструменты:

- `typeof` — проверка примитивного типа
- `in` — проверка наличия свойства в объекте
- `instanceof` — проверка, является ли объект экземпляром класса
- User-Defined Type Guards — собственные функции-проверки

### `typeof`

```ts
const printId = (id: string | number) => {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()); // тут TS знает, что id — string
  } else {
    console.log(id.toFixed(2)); // тут TS знает, что id — number
  }
};
```

### `in`

```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

const makeSound = (animal: Cat | Dog) => {
  if ('meow' in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
};
```

### `instanceof`

Работает с классами: проверяет, был ли объект создан этим классом.

```ts
class ApiError extends Error {}

const handleError = (error: Error) => {
  if (error instanceof ApiError) {
    console.log('Это ошибка API');
  }
};
```

### User-Defined Type Guards

Свои функции-проверки, которые возвращают специальный тип `arg is Type`. Это
полезно, когда обычной проверки `typeof`/`in` недостаточно.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

const isFish = (pet: Fish | Bird): pet is Fish => {
  return (pet as Fish).swim !== undefined;
};

const move = (pet: Fish | Bird) => {
  if (isFish(pet)) {
    pet.swim(); // TS точно знает, что это Fish
  } else {
    pet.fly();
  }
};
```

---

# Работа с HTML-элементами

При работе с DOM в TypeScript часто нужно указать конкретный тип элемента —
`document.getElementById` возвращает `HTMLElement | null`, который не знает про
`.value` или другие специфичные свойства инпута.

```ts
const input = document.getElementById('inputEmail') as HTMLInputElement;
```

Есть и другой синтаксис приведения типа — через угловые скобки:

```ts
const input = <HTMLInputElement>document.getElementById('inputEmail');
```

⚠️ Второй вариант **не подходит для `.tsx` файлов**, потому что TypeScript
путает его с JSX-разметкой. В React-проектах всегда используй `as`.

---

# Index Properties (индексные сигнатуры)

Позволяют описать объект, у которого заранее неизвестны точные названия ключей,
но известен их тип и тип значений.

```ts
type IndexType = {
  [prop: string]: string;
};

const colors: IndexType = {
  primary: '#fff',
  secondary: '#000',
  // любое количество ключей-строк со значениями-строками
};
```

---

# Дженерики (Generics)

Дженерики позволяют писать функции и классы, которые работают с разными типами,
не теряя при этом строгую типизацию.

```ts
const identity = <T>(arg: T): T => {
  return arg;
};

const output1 = identity('myString'); // T = string
const output2 = identity(100); // T = number
```

> 💡 В `.tsx` файлах после `T` ставят запятую (`<T,>`), иначе TypeScript
> перепутает дженерик с открывающим JSX-тегом.

## Несколько дженериков

```ts
const merge = <T, U>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

const merged = merge({ name: 'Alisa' }, { age: 28 });
console.log(merged);
// { name: "Alisa", age: 28 }
```

## Дженерики с `keyof`

`keyof` берёт тип объекта и превращает его в union из названий его ключей. Это
позволяет ограничить `key` только реально существующими полями объекта.

```ts
const extractValue = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return obj[key];
};

extractValue({ name: 'John' }, 'name'); // ✅ 'name' — существующий ключ
extractValue({ name: 'John' }, 'age'); // ❌ Ошибка: 'age' нет в объекте
```

## Generic Classes

Позволяют создавать классы, которые могут работать с разными типами данных,
сохраняя при этом строгую типизацию — конкретный тип задаётся при создании
экземпляра класса.

```ts
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Hello');
textStorage.addItem('World');
console.log(textStorage.getItems()); // ['Hello', 'World']
textStorage.addItem(1); // ❌ Error: number не подходит под string

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems()); // [1, 2]
numberStorage.addItem('TEXT'); // ❌ Error: string не подходит под number
```

---

# Utility Types

Встроенные типы-помощники, которые берут существующий тип и превращают его в
новый по определённому правилу. Очень удобны для типизации API и форм.

## `Partial<T>`

Делает все свойства типа `T` **необязательными**. Отлично подходит для
частичного обновления объекта (например, метод `PATCH`).

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const updateUser = (id: number, changes: Partial<User>) => {
  // changes может содержать любую часть полей User, а может быть и пустым {}
};

updateUser(1, { name: 'New Name' }); // ✅ не нужно передавать все поля
```

## `Readonly<T>`

Делает все свойства в типе `T` доступными только для чтения. После создания
объекта их нельзя изменить.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const aliceReadonly: Readonly<User> = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
};

aliceReadonly.name = 'Bob';
// ❌ Error: Cannot assign to 'name' because it is a read-only property.
```

## `Pick<T, K>`

Формирует новый тип только из указанных полей. Часто используется для
составления типов, например при работе с API, откуда может прийти множество
полей, а нужны не все.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type UserBasicInfo = Pick<User, 'id' | 'name'>;
// { id: number; name: string }
```

## `Omit<T, K>`

Позволяет создать новый тип на основе типа `T`, исключив набор свойств,
указанных в `K`.

```ts
type Person = {
  name: string;
  age: number;
  location: string;
};

type PersonWithoutLocation = Omit<Person, 'location'>;
// { name: string; age: number }
```

## `Record<K, T>`

Позволяет описать объект, у которого ключи заранее известны, а значения имеют
один и тот же тип.

- `K` — множество возможных ключей.
- `T` — тип каждого значения.

```ts
type User = {
  id: number;
  name: string;
};

const users: Record<number, User> = {
  1: { id: 1, name: 'Alisa' },
  2: { id: 2, name: 'Ivan' },
};
```

Или с конкретным набором строковых ключей:

```ts
type Status = 'loading' | 'success' | 'error';

const labels: Record<Status, string> = {
  loading: 'Загрузка...',
  success: 'Готово',
  error: 'Ошибка',
};
```

## `ReturnType<T>`

Позволяет получить тип, который возвращает функция. Обязательно используется
вместе с `typeof`, потому что `ReturnType` ожидает _тип функции_, а не саму
функцию.

```ts
const greeting = () => {
  return 'Hello, world!';
};

type Greeting = ReturnType<typeof greeting>; // string

const multiply = (a: number, b: number) => {
  return a * b;
};

type MultiplyResult = ReturnType<typeof multiply>; // number
```

Удобно, когда тип возврата функции сложный и не хочется дублировать его вручную
в отдельном `type`.

## `Parameters<T>`

Достаёт типы параметров функции в виде кортежа. Полезно, когда нужно
переиспользовать «форму» аргументов другой функции, не переписывая её вручную —
например, чтобы обернуть функцию в свою обёртку с теми же аргументами.

```ts
type MyFunctionType = (a: string, b: number, c: boolean) => void;

type MyParametersType = Parameters<MyFunctionType>;
// [string, number, boolean]

// Практический пример: обёртка-логгер вокруг существующей функции
const originalFn = (name: string, age: number) => {
  console.log(name, age);
};

const withLogging = (...args: Parameters<typeof originalFn>) => {
  console.log('Вызов с аргументами:', args);
  originalFn(...args);
};
```

## `NonNullable<T>`

Убирает `null` и `undefined` из типа `T`. Полезен, когда нужно гарантировать,
что дальше по коду значение точно не пустое.

```ts
type MaybeString = string | null | undefined;

type DefiniteString = NonNullable<MaybeString>;
// string

const printLength = (value: DefiniteString) => {
  console.log(value.length); // можно не проверять на null — TS уже уверен
};
```

---

# Что важно запомнить

| Что                               | Для чего                       |
| --------------------------------- | ------------------------------ |
| `string`, `number`, `boolean`     | Примитивные типы               |
| `object`                          | Объект (лучше описывать явно)  |
| `User[]`                          | Массив объектов                |
| `A \| B`                          | Один из нескольких типов       |
| `A & B`                           | Объединение типов              |
| `[string, number]`                | Кортеж                         |
| `any`                             | Отключает проверку типов       |
| `unknown`                         | Безопасная альтернатива `any`  |
| `enum`                            | Набор констант                 |
| `type`                            | Универсальный алиас типов      |
| `interface`                       | Описание структуры объектов    |
| `void`                            | Функция ничего не возвращает   |
| `never`                           | Функция никогда не завершается |
| `Partial<T>` / `Pick<T,K>` и т.д. | Готовые Utility Types          |

---

# Установка TypeScript

## 1. Устанавливаем TypeScript

Если проект создан на **React + Vite**, устанавливаем необходимые пакеты:

```bash
npm install -D typescript @types/react @types/react-dom
```

Создаём файл конфигурации:

```bash
npx tsc --init
```

## 2. Настраиваем tsconfig.json

Заменяем содержимое файла на следующее:

```jsonc
{
  "compilerOptions": {
    "target": "ESNext", // Использовать возможности современного JavaScript.

    "module": "ESNext", // Использовать ES Modules.
    "moduleResolution": "Bundler", // Искать модули так же, как Vite.

    "jsx": "react-jsx", // Новый JSX-трансформер React.

    "strict": true, // Строгая проверка типов.

    "baseUrl": ".", // Корень проекта для абсолютных импортов.

    "paths": {
      "@/*": ["src/*"], // Алиас @ → src.
    },

    "allowJs": true, // Разрешить использовать .js и .jsx.
    "checkJs": false, // Не проверять JS-файлы на ошибки типов.

    "resolveJsonModule": true, // Разрешить импорт JSON.

    "isolatedModules": true, // Проверять каждый файл отдельно (требование Vite).

    "noEmit": true, // Не компилировать JS. Это делает Vite.

    "skipLibCheck": true, // Не проверять типы библиотек.
  },

  "include": ["src"], // Проверять только папку src.
}
```

## 3. Удаляем jsconfig.json

После появления `tsconfig.json` файл `jsconfig.json` больше не нужен.

Почему? Потому что настройки

```jsonc
"allowJs": true,
"checkJs": false
```

позволяют TypeScript работать одновременно с `.js`, `.jsx`, `.ts` и `.tsx`.
Поэтому проект можно переносить постепенно, а не переписывать всё разом.

внутри src/ создаем файл vite-env.d.ts. и туда пишем ///
<reference types="vite/client" /> TypeScript по умолчанию ничего не знает о том,
как импортировать .css. По этому если такие файлы есть то это нужно подключить
ambient-типы, которые объявляют модули _.css, _.svg и т.д. созданием файла
vite-env.d.ts.

## 4. Переименовываем первые файлы

Сначала достаточно переименовать:

```text
main.jsx → main.tsx
App.jsx  → App.tsx
```

После этого TypeScript уже начинает работать в проекте.

## 5. Исправляем main.tsx

Было (JavaScript):

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Стало (TypeScript):

```tsx
const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Почему?

Потому что `document.getElementById()` может вернуть `HTMLElement | null`.
TypeScript не даст вызвать `createRoot(null)` и заставляет явно обработать этот
случай — либо проверкой (как выше), либо приведением типа через `as`.

```tsx
const root = document.getElementById('root') as HTMLInputElement;

createRoot(root).render(
  <StrictMode>
    {' '}
    <App />{' '}
  </StrictMode>
);
```

## 6. Постепенно переносим проект

Рекомендуемый порядок:

```text
✅ main.tsx
        ↓
✅ App.tsx
        ↓
✅ store.ts
        ↓
✅ Redux slices
        ↓
✅ hooks
        ↓
✅ pages
        ↓
✅ components
        ↓
✅ utils
```

Не нужно переименовывать всё сразу.

## 7. Во время миграции

Проект может выглядеть так, и это абсолютно нормально:

```text
src/
│
├── App.tsx
├── main.tsx
│
├── redux/
│   ├── store.ts
│   ├── authSlice.js
│   └── filter.js
│
├── components/
│   ├── Button.tsx
│   ├── Header.jsx
│   └── Loader.tsx
```

## 8. После полной миграции

Когда в проекте больше не останется файлов `.js` и `.jsx`, можно:

- удалить `"allowJs": true`;
- удалить `"checkJs": false`;
- удалить все оставшиеся упоминания JS в конфигурации.

После этого проект станет полностью TypeScript-проектом, и `strict: true` будет
проверять абсолютно весь код.

---

# Порядок переименования файлов на практике

Не нужно сразу менять все файлы. Например:

**Сегодня:**

```text
main.jsx → main.tsx
App.jsx  → App.tsx
```

**Завтра:**

```text
Header.jsx → Header.tsx
```

**Послезавтра:**

```text
Button.jsx → Button.tsx
```

И так далее, файл за файлом, в своём темпе.

## Styled Components

Файлы вида `Header.styled.jsx` можно постепенно переименовывать в
`Header.styled.ts` или `Header.styled.tsx`.

Если внутри только стили без JSX-разметки, то обычно используют `.styled.ts`.

## Обычные файлы

```text
theme.js     → theme.ts
constants.js → constants.ts
utils.js     → utils.ts
```

## Компоненты

Простое правило:

- `.ts` — файл **не содержит** JSX;
- `.tsx` — файл **содержит** JSX.

```text
Component.jsx → Component.tsx   (возвращает JSX)
helper.js     → helper.ts       (JSX нет, просто функции)
```

## Что произойдёт после переименования?

TypeScript сразу покажет ошибки — но только в этом конкретном файле, не во всём
проекте. Например:

```tsx
const Button = ({ title }) => {};
```

TypeScript скажет:

> Parameter 'title' implicitly has an 'any' type.

Это значит, что нужно просто добавить тип:

```tsx
type ButtonProps = {
  title: string;
};

const Button = ({ title }: ButtonProps) => {
  return <button>{title}</button>;
};
```

И так — файл за файлом, ты постепенно добавляешь типы по мере того, как
TypeScript их запрашивает.

---

Нужно ли типизировать FC вне зависитимсти от того есть пропсы или нет? Явного
профита FC не даёт — тип возвращаемого значения (JSX.Element) и так корректно
выводится. но выглядит для примера это так. import { FC, JSX } from 'react';

type SectionProps = { title?: string; children: JSX.Element; };

const Section: FC<SectionProps> = ({ title, children }) => { return ( <div>

<h2>{title}</h2> {children} </div> ); };

export { Section };

Явно указывать useState<string>('') — хорошая практика? Если начальное значение
уже однозначно определяет тип ('' → string, 0 → number, false → boolean) —
TypeScript сам это поймет. Он обязателен, когда тип шире, например: const
[gender, setGender] = useState<'male' | 'female' | ''>('');

Так же обязателен явный тип для null-начальных значений: const [user, setUser] =
useState<User | null>(null);

React-обработчик Тип события Когда использовать onChange ChangeEvent<T> input,
select, textarea onSubmit / onReset FormEvent<T> <form> onClick MouseEvent<T>
кнопки, ссылки, любой элемент onKeyDown/Up/Press KeyboardEvent<T> инпуты,
документ onFocus/onBlur FocusEvent<T> инпуты

если обработчик — это JSX-проп (onX={...}) → бери тип из React.XEvent. Если
работаешь с ref.current.addEventListener напрямую → бери нативный DOM-тип без
React. префикса.

Тип Что описывает Где используется HTMLInputElement Реальный <input>-элемент в
DOM: его свойства (value, checked, disabled) и методы (focus(), select()) В
ChangeEvent<HTMLInputElement>, в useRef<HTMLInputElement>(null)
InputHTMLAttributes<T> Набор HTML-атрибутов, которые можно передать в JSX
<input> (placeholder, value, onChange, type, disabled и т.д.) Когда пишешь свой
компонент-обёртку над <input> и хочешь принять стандартные пропсы без ручного
перечисления HTMLFormElement Реальный <form>-элемент в DOM: методы .reset(),
.submit(), свойство .elements В FormEvent<HTMLFormElement> /
SubmitEvent<HTMLFormElement>, в useRef<HTMLFormElement>(null)
FormHTMLAttributes<T> Атрибуты, которые можно передать в JSX <form> (onSubmit,
action, method, noValidate) Свой компонент-обёртка над <form> HTMLButtonElement
Реальный <button>-элемент: .disabled, .form, .type
useRef<HTMLButtonElement>(null), события на кнопке ButtonHTMLAttributes<T>
Атрибуты для JSX <button> (onClick, disabled, type) Свой компонент-кнопка
HTMLSelectElement Реальный <select>-элемент: .value, .selectedIndex, .options
ChangeEvent<HTMLSelectElement>, useRef<HTMLSelectElement>(null)
SelectHTMLAttributes<T> Атрибуты для JSX <select> (onChange, multiple, value)
Свой компонент-обёртка над <select>

Правило выбора одной фразой: если работаешь с событием (ChangeEvent,
SubmitEvent) или ref — используешь *Element. Если пишешь свой переиспользуемый
компонент и расширяешь его пропсами родного HTML-тега (extends
InputHTMLAttributes<...>) — используешь *Attributes.

Пример на твоём компоненте, если бы ты решила сделать переиспользуемый
<Input />:

ts interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label:
string; }

const Input: FC<InputProps> = ({ label, ...rest }) => (

  <div>
    <label>{label}</label>
    <input {...rest} />
  </div>
);

Здесь InputHTMLAttributes<HTMLInputElement> даёт тебе все стандартные пропсы
<input> "бесплатно" — не нужно вручную писать value?: string; onChange?: ...;
placeholder?: string и так далее. e.target === HTMLInputElement

Тип Что разрешает Что запрещает JSX.Element Ровно один готовый React-элемент
(<div/>, <Component/>) Строки, числа, null, undefined, boolean, массивы
элементов, условный рендер типа {cond && <div/>} (там тип false | JSX.Element)
ReactElement<P> То же самое, что JSX.Element, но с возможностью указать тип
пропсов конкретного элемента (ReactElement<ButtonProps>) То же, что и
JSX.Element ReactNode Вообще всё, что React способен отрендерить: элементы,
строки, числа, null, undefined, boolean, массивы, фрагменты, порталы Практически
ничего не запрещает — это "разрешить всё" PropsWithChildren<T> Не отдельный тип,
а утилита: автоматически добавляет children?: ReactNode к твоему пропс-типу —

Когда что использовать — примеры

ReactNode — самый частый выбор для универсальных обёрток-контейнеров (layout,
Card, Modal, Section-подобные компоненты), где реально может прийти что угодно:

tsx interface CardProps { children: ReactNode; } // <Card>Просто текст</Card> —
ок // <Card>{count}</Card> — ок, число // <Card><div/><div/></Card> — ок,
несколько элементов

Это самый распространённый выбор в реальных проектах для компонентов-обёрток.

JSX.Element — когда компонент требует ровно один конкретный элемент и ты хочешь,
чтобы TS запрещал передавать "мусор" (строку по ошибке, null из условного
рендера). Твой PrivateRoute — идеальный пример такого случая: там принципиально
важно, что придёт именно защищаемый маршрут, а не что-то ещё.

PropsWithChildren<T> — сокращение, чтобы не писать children: ReactNode руками
каждый раз:

tsx type Props = PropsWithChildren<{ title: string }>; // эквивалентно type
Props = { title: string; children?: ReactNode };
