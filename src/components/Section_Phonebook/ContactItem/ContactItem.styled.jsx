import styled from '@emotion/styled';
const ContactCard = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  justify-items: normal;
  align-items: center;
`;

const AvatarImg = styled.img`
  width: 100px;
  border-radius: 100%;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  justify-content: left;
  align-items: left;

  p {
    font-size: 1.2rem;
    font-weight: 500;
    font-style: italic;
  }

  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ContactActions = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: right;
  align-items: center;

  button {
    cursor: pointer;
  }

  button svg {
    width: 32px;
    height: 32px;
  }

  button:hover {
    opacity: 0.7;
  }
`;

export { ContactCard, AvatarImg, ContactDetails, ContactActions };
