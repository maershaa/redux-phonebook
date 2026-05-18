import { ContactItem } from '@/components/Section_Phonebook/ContactItem/ContactItem';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => {
        const { id, name, surname, phoneNumber, gender, isFavorite } = contact;

        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            surname={surname}
            phoneNumber={phoneNumber}
            gender={gender}
            deleteContact={deleteContact}
            isFavorite={isFavorite}
          ></ContactItem>
        );
      })}
    </ul>
  );
};

export { ContactList };
