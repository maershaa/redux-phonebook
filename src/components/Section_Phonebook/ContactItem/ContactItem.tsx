import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdDelete,
} from 'react-icons/md';

import { boy, girl, unknown_gender } from '@/assets/images/avatar/avatar';
import {
  ContactCard,
  AvatarImg,
  ContactDetails,
  ContactActions,
} from './ContactItem.styled';

import { useToggleFavoriteMutation } from '@/redux/services/contactsApi';

import { Contact } from '@/interfaces';

interface ContactItemProps {
  contact: Contact;
  deleteContact: (id: Contact['id']) => void;
}

const ContactItem = ({ contact, deleteContact }: ContactItemProps) => {
  const [toggleFavorite] = useToggleFavoriteMutation();

  const { id, name, surname, phoneNumber, gender, isFavorite } = contact;

  const imgSrc = gender === 'male' ? boy : girl;

  const handleToggleFavorite = () => {
    toggleFavorite(contact);
  };

  return (
    <ContactCard>
      <AvatarImg src={imgSrc} alt="avatar image"></AvatarImg>

      <ContactDetails>
        <p>
          {name} {surname}
        </p>

        <a href={`tel:${phoneNumber}`} aria-label={`Call ${name} ${surname}`}>
          {phoneNumber}
        </a>
      </ContactDetails>

      <ContactActions>
        <button
          type="button"
          className="btn-favorite"
          aria-label="Add to favorites"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
        </button>

        <button
          type="button"
          className="btn-delete"
          aria-label="Delete contact"
          onClick={() => deleteContact(id)}
        >
          <MdDelete />
        </button>
      </ContactActions>
    </ContactCard>
  );
};

export { ContactItem };
