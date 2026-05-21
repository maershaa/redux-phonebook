import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Section, Notification } from '@/components';
import {
  ContactForm,
  Filter,
  ContactList,
  PhonebookArticle,
} from '@/components/Section_Phonebook';
import { addContact, deleteContact } from '@/redux/contactsSlice.js';
import { selectContacts } from '@/redux/selectors';

const PhonebookPage = () => {
  const contacts = useSelector(selectContacts);
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
    <Section title="Phonebook-section">
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
  );
};

export { PhonebookPage };
