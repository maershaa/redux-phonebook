import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';

import { Header, Hero, Section, Notification } from '@/components';

import {
  ContactForm,
  Filter,
  ContactList,
  PhonebookArticle,
} from '@/Section_Phonebook';

import { addContact, deleteContact } from '@/redux/contactsSlice.js';
const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

  const addContactToPhonebook = useCallback(
    newContact => {
      const normalizedName = newContact.name.trim().toLowerCase();
      const normalizedSurname = newContact.surname.trim().toLowerCase();
      const normalizedPhone = newContact.phoneNumber.trim();

      const isDuplicateNumber = contacts.some(
        contact => contact.phoneNumber.trim() === normalizedPhone
      );

      const isDuplicateNameSurname = contacts.some(
        contact =>
          contact.name.trim().toLowerCase() === normalizedName &&
          contact.surname.trim().toLowerCase() === normalizedSurname
      );

      if (isDuplicateNumber) {
        toast.error(
          `Phone number ${newContact.phoneNumber} is already in contacts`
        );
        return;
      }

      if (isDuplicateNameSurname) {
        toast.error(
          `Contact ${newContact.name} ${newContact.surname} already exists`
        );
        return;
      }

      dispatch(addContact(newContact));

      toast.success('Contact added successfully');
    },
    [contacts, dispatch]
  );

  const changeFilter = useCallback(evt => {
    setFilter(evt.currentTarget.value);
  }, []);

  const visibleContacts = useMemo(() => {
    if (!filter.trim()) return contacts;

    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.surname.toLowerCase().includes(normalizedFilter) ||
        contact.phoneNumber.includes(normalizedFilter)
    );
  }, [contacts, filter]);

  const handleDeleteContact = useCallback(
    id => {
      dispatch(deleteContact(id));
      toast.info(`Contact  deleted`);
    },
    [dispatch]
  );

  return (
    <>
      <Header />

      <main>
        <Section title="Feedback Widget & Phonebook" id="hero">
          <Hero />
        </Section>

        <Section title="Phonebook-section" id="phonebook">
          <div className="phonebook-layout">
            <PhonebookArticle subtitle={'Phonebook'}>
              <ContactForm addContact={addContactToPhonebook} />
            </PhonebookArticle>

            {contacts.length === 0 ? (
              <PhonebookArticle subtitle={'Contacts'}>
                <Notification message="There are no contacts yet" />
              </PhonebookArticle>
            ) : (
              <PhonebookArticle>
                <Filter value={filter} onChange={changeFilter} />

                <ContactList
                  contacts={visibleContacts}
                  deleteContact={handleDeleteContact}
                />
              </PhonebookArticle>
            )}
          </div>
        </Section>
      </main>

      {/* {showModal && (
        <Modal closeModal={closeModal}>
          <AboutAppModal closeModal={closeModal} />
        </Modal>
      )} */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
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
