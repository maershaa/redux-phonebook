import { ContactItem } from '@/components/Section_Phonebook/ContactItem';

const ContactList = ({
  contacts,
  deleteContact,
  toggleFavourite,
  favorites,
}) => {
  return (
    <ul>
      {contacts.map(contact => {
        const { id, name, surname, phoneNumber, gender } = contact;
        const isFavourite = favorites.some(favID => favID === id);

        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            surname={surname}
            phoneNumber={phoneNumber}
            gender={gender}
            deleteContact={deleteContact}
            toggleFavourite={toggleFavourite}
            isFavourite={isFavourite}
          ></ContactItem>
        );
      })}
    </ul>
  );
};

export { ContactList };
