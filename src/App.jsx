import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Header,
  Hero,
  Section,
  Notification,
  // Modal,
  ContactForm,
  Filter,
  ContactList,
  PhonebookArticle,
} from '@/components';

const App = () => {
  const [contacts, setContacts] = useState([
    {
      id: 'id-1',
      name: 'Rosie ',
      surname: 'Simpson',
      gender: 'female',
      phoneNumber: '459-12-56',
    },
    {
      id: 'id-2',
      name: 'Hermione ',
      surname: 'Kline',
      gender: 'female',
      phoneNumber: '443-89-12',
    },
    {
      id: 'id-3',
      name: 'Eden ',
      gender: 'male',
      surname: 'Clements',
      phoneNumber: '645-17-79',
    },
    {
      id: 'id-4',
      name: 'Annie ',
      surname: 'Copeland',
      phoneNumber: '227-91-26',
    },
  ]);
  const [filter, setFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const contactsFromStorage =
      JSON.parse(localStorage.getItem('contactsList')) || [];

    if (contactsFromStorage) {
      // Устанавливаем контакты в состояние, чтобы они отобразились в приложении
      setContacts(prev => prev, contactsFromStorage);
    }

    //     if (prevState.contacts !== this.state.contacts) {
    //    Сохраняем/Удаляем новые контакты в localStorage
    //   localStorage.setItem('contactsList', JSON.stringify(this.state.contacts));
    // }

    // return () => {
    //   second
    // }
  }, []);

  // async componentDidMount() {
  //   // Считываем контакты из localStorage при монтировании компонента
  //   // Если данных нет, используем пустой массив
  //   const contactsFromStorage =
  //     JSON.parse(localStorage.getItem('contactsList')) || [];

  //   if (contactsFromStorage) {
  //     // Устанавливаем контакты в состояние, чтобы они отобразились в приложении
  //     this.setState({
  //       contacts: contactsFromStorage,
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // Проверяем, изменились ли контакты по сравнению с предыдущим состоянием
  //   if (prevState.contacts !== this.state.contacts) {
  //     // Сохраняем/Удаляем новые контакты в localStorage
  //     localStorage.setItem('contactsList', JSON.stringify(this.state.contacts));
  //   }
  // }

  const addContactToPhonebook = newContact => {
    const isDuplicateNumber = this.state.contacts.some(
      c => c.phoneNumber.trim() === newContact.phoneNumber.trim()
    );
    const isDuplicateNameSurname = this.state.contacts.some(
      c =>
        c.name.trim() === newContact.name.trim() &&
        c.surname.trim() === newContact.surname.trim()
    );
    if (isDuplicateNumber) {
      alert(`Phone number: ${newContact.phoneNumber} is already in contacts`);
      return;
    }

    if (isDuplicateNameSurname) {
      alert(
        `Contact ${newContact.name} ${newContact.surname} is already in contacts`
      );
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  const changeFilter = evt => {
    const currentValue = evt.currentTarget.value;
    this.setState({ filter: currentValue });
  };

  const getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    console.log('🚀 ~ App ~ normalizedFilter:', normalizedFilter);

    return contacts.filter(
      c =>
        c.name.toLowerCase().includes(normalizedFilter) ||
        c.surname.toLowerCase().includes(normalizedFilter) ||
        c.phoneNumber.includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    console.log('🚀 ~ App ~ id:', id);
    //   this.setState(prevState => ({
    //     contacts: prevState.contacts.filter(el => el.id !== id),
    //   }));
  };

  const toggleFavourite = id => {
    console.log('🚀 ~ App ~ id:', id);
    // this.setState(prevState => {
    //   const isFavourite = prevState.favorites.includes(id);
    //   if (isFavourite)
    //     // удалить из favorites
    //     return {
    //       favorites: prevState.favorites.filter(elId => elId !== id),
    //     };
    //   else {
    //     // добавить в favorites
    //     const newFavoriteContact = prevState.contacts.find(el => el.id === id);
    //     // console.log("🚀 ~ App ~ newFavoriteContact:", newFavoriteContact);
    //     return {
    //       favorites: [...prevState.favorites, newFavoriteContact.id],
    //     };
    //   }
    // });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const visibleContacts = getFilteredContacts();

  const notify = () => toast('Wow so easy !');

  return (
    <>
      <Header />
      <main>
        <Section title="Feedback Widget & Phonebook" id="hero">
          <Hero openModal={openModal} />
        </Section>

        <Section title="Phonebook-section" id="phonebook">
          <div className="phonebook-layout">
            <PhonebookArticle subtitle={'Phonebook'}>
              <ContactForm addContact={addContactToPhonebook} />
            </PhonebookArticle>

            <PhonebookArticle subtitle={'Contacts'}>
              {contacts.length === 0 && (
                <Notification message="There are no contacts yet" />
              )}

              {contacts.length > 0 && (
                <PhonebookArticle>
                  <Filter value={filter} onChange={changeFilter} />

                  <ContactList
                    contacts={visibleContacts}
                    favorites={favorites}
                    deleteContact={deleteContact}
                    toggleFavourite={toggleFavourite}
                  />
                </PhonebookArticle>
              )}
            </PhonebookArticle>
          </div>
        </Section>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000} // Время закрытия уведомления в мс
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
};

export default App;
