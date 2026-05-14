import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { FeedbackNotification } from '@/components/Notification/Notification.styled';

const Notification = ({ message }) => {
  return (
    <FeedbackNotification>
      <BsFillPatchExclamationFill></BsFillPatchExclamationFill>
      <p> {message} </p>
    </FeedbackNotification>
  );
};

export { Notification };
