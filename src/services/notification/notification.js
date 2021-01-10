import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './notification.module.css';

const clientErrorEmptyQuery =
  'Incorrect query! Please enter your request in the correct form';

const clientErrorInvalidQuery =
  'Sorry, the service cannot process your request😨. Try again, please';

const serverError =
  'Sorry, there are some technical problems 😱😱😱. Please, try again later';

const noReviews = 'Sorry, but we have no reviews for this movie 😨';

const showError = message => {
  toast.warn(message, { className: `${s.error}` });
};

const showNotification = message => {
  toast.warn(message, { className: `${s.notify}` });
};

export {
  clientErrorEmptyQuery,
  clientErrorInvalidQuery,
  serverError,
  noReviews,
  showError,
  showNotification,
};
