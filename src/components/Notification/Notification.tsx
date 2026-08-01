import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { FeedbackNotification } from '@/components/Notification/Notification.styled';

interface NotificationProps {
  message: string;
}
const Notification = ({ message }: NotificationProps) => {
  return (
    <FeedbackNotification>
      <BsFillPatchExclamationFill></BsFillPatchExclamationFill>
      <p> {message} </p>
    </FeedbackNotification>
  );
};

export { Notification };
