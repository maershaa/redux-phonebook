import { useState } from 'react';
import { toast } from 'react-toastify';
import { MdPermIdentity } from 'react-icons/md';
import { HiOutlineIdentification } from 'react-icons/hi';
import { Form, GenderGroup, RadioOption } from './ContactForm.styled';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false); //коснулся ли пользователь поля телефона. Нужно, чтобы показывать ошибки или красную рамку только после того, как пользователь начал ввод.

  const handleFormChange = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
      console.log(name, ':', value);
    } else if (name === 'surname') {
      setSurname(value);
      console.log(name, ':', value);
    } else if (name === 'gender') {
      setGender(value);
      console.log(name, ':', value);
    } else return;
  };

  const handlePhoneChange = phone => {
    console.log('phone :', phone);

    const valid = phone ? isPossiblePhoneNumber(phone) : false;
    //isPossiblePhoneNumber - Проверяет, может ли введённый номер существовать реально, учитывая код страны, минимальную и максимальную длину.

    setPhoneNumber(phone);
    setPhoneValid(valid);
    setPhoneTouched(true);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!phoneValid) {
      toast.error('Invalid phone');
      return;
    }

    if (!name || !surname || !phoneNumber || !gender) {
      toast.warn('Fill all fields');
      return;
    }

    const nameRegex =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

    if (!nameRegex.test(name.trim())) {
      //Метод .test() проверяет, соответствует ли строка этому шаблону. Возвращает true, если строка подходит, и false, если нет.
      toast.error(
        'Invalid name. Only letters, spaces, apostrophes and hyphens are allowed'
      );
      return;
    }

    if (!nameRegex.test(surname.trim())) {
      toast.error(
        'Invalid surname. Only letters, spaces, apostrophes and hyphens are allowed'
      );
      return;
    }

    const contactInfo = {
      id: crypto.randomUUID(),
      name: name.trim(),
      surname: surname.trim(),
      phoneNumber,
      gender,
      isFavorite: false,
    };
    console.log('🚀 ~ handleFormSubmit ~ contactInfo:', contactInfo);

    addContact(contactInfo);
    toast.success('Contact added successfully!');

    e.target.reset();
  };

  const isFormValid =
    name.trim() !== '' && surname.trim() !== '' && gender !== '' && phoneValid;

  return (
    <Form autoComplete="on" onSubmit={handleFormSubmit}>
      <div className="input-wrapper">
        <MdPermIdentity />

        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          required
          onChange={handleFormChange}
          autoComplete="given-name" //Подсказывает браузеру, что это имя пользователя, чтобы он мог подставлять сохранённые данные
        />
      </div>

      <div className="input-wrapper">
        <HiOutlineIdentification className="input-icon" />
        <input
          type="text"
          name="surname"
          value={surname}
          placeholder="Surname"
          required
          onChange={handleFormChange}
          autoComplete="family-name" //Подсказывает браузеру, что это фамилия пользователя, чтобы он мог подставлять сохранённые данные
        />
      </div>

      <div
        className={`input-wrapper ${phoneTouched ? (phoneValid ? 'valid' : 'invalid') : ''}`}
      >
        <PhoneInput
          placeholder="Enter phone number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneChange}
          defaultCountry="UA"
          international //Включает международный формат номера, добавляет выбор страны и отображает +ко
          autoComplete="tel"
        />
      </div>

      <GenderGroup>
        <RadioOption>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleFormChange}
            checked={gender === 'male'} //Определяет, выбрана ли эта опция, сравнивая текущее значение gender со значением радио
          />
          Male
        </RadioOption>

        <RadioOption>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleFormChange}
            checked={gender === 'female'} //Определяет, выбрана ли эта опция, сравнивая текущее значение gender со значением радио
          />
          Female
        </RadioOption>
      </GenderGroup>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </Form>
  );
};

export { ContactForm };
