import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdDelete,
} from 'react-icons/md';

import { boy, girl, unknown_gender } from '@/assets/avatar/avatar';
import {
  ContactCard,
  AvatarImg,
  ContactDetails,
  ContactActions,
} from '@/components/Section_Phonebook/ContactItem/ContactItem.styled';

const ContactItem = ({
  id,
  name,
  surname,
  phoneNumber,
  gender,
  deleteContact,
  toggleFavourite,
  isFavourite,
}) => {
  const imgSrc =
    gender === 'male' ? boy : gender === 'female' ? girl : unknown_gender;
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
          onClick={() => toggleFavourite(id)}
        >
          {isFavourite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
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
