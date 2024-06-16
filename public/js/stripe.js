/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51PSPa3P8YkiaSmpibVAwSs50vfwZcDxtax5Qt17RbTPI1O2HhiI65rJg98zNpLsDqIM9g4QWy39Gc7Y5DNQGo4L200osH7wFKl',
);

export const bookTour = async (tourID) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourID}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    // console.log(err);
    showAlert('error', err);
  }
};
