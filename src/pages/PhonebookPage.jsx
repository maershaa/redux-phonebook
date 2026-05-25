import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Section, Notification, Loader } from '@/components';
import {
  ContactForm,
  Filter,
  ContactList,
  PhonebookArticle,
} from '@/components/Section_Phonebook';

import {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from '@/redux/services/contactsApi';

import { setFilter } from '@/redux/filterSlice';
import { selectFilter } from '@/redux/selectors';

const PhonebookPage = () => {
  // RTK Query сам хранит: loading, error, cache, fetched data
  const {
    data: contacts = [],
    isLoading, // isLoading- только первый рендер сработает
  } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

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

      addContact(newContact);
      toast.success('Contact added successfully');
    },
    [addContact, contacts]
  );

  const changeFilter = useCallback(
    evt => {
      const value = evt.currentTarget.value;
      dispatch(setFilter(value));
    },
    [dispatch]
  );

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
      deleteContact(id);
      toast.info(`Contact deleted`);
    },
    [deleteContact]
  );

  return (
    <Section title="Phonebook">
      <div className="phonebook-layout">
        <PhonebookArticle subtitle={'Phonebook'}>
          <ContactForm addContact={addContactToPhonebook} />
        </PhonebookArticle>

        <PhonebookArticle subtitle={'Contacts'}>
          <PhonebookArticle>
            <Filter value={filter} onChange={changeFilter} />

            {isLoading ? (
              <Loader />
            ) : contacts.length === 0 ? (
              <Notification message="There are no contacts yet" />
            ) : (
              <ContactList
                contacts={visibleContacts}
                deleteContact={handleDeleteContact}
              />
            )}
          </PhonebookArticle>
        </PhonebookArticle>
      </div>
    </Section>
  );
};

export { PhonebookPage };
