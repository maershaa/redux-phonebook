import { ContactItem } from '@/components/Section_Phonebook/ContactItem/ContactItem';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <ContactItem
            key={contact.id}
            deleteContact={deleteContact}
            contact={contact}
          ></ContactItem>
        );
      })}
    </ul>
  );
};

export { ContactList };
