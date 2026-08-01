import { ContactItem } from '@/components/Section_Phonebook/ContactItem/ContactItem';
import { Contact } from '@/interfaces';

interface ContactListProps {
  contacts: Contact[];
  deleteContact: (id: Contact['id']) => void;
}

const ContactList = ({ contacts, deleteContact }: ContactListProps) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <ContactItem
            key={contact.id}
            deleteContact={deleteContact}
            contact={contact}
          />
        );
      })}
    </ul>
  );
};

export { ContactList };
