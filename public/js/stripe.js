/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51RZBAc2fPM5GcDoRmWv2J7q0qnc3CeAv3Z7KPzceSlybjmrsewWbejihposKeNgzuYtwbtSCqWcO0T5oezIwYv8Y00vC0z6Wwi',
  );
  try {
    // 1. Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
