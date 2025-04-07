

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define the formatAmountForStripe function
function formatAmountForStripe(amount) {
  // Stripe expects amounts in cents, so multiply by 100 if necessary
  return Math.round(amount * 100);
}
export async function GRT(req,{params})
{
  const searchParams=req.nextUrl.searchParams()
  const session_id=searchParams.get('session_id')
  
}
export async function POST(req) {
  const params = {
    mode:'suscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro subscription',
          },
          unit_amount: formatAmountForStripe(10), // $10 subscription
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
   // Specify subscription mode
    success_url: `${req.headers.get('origin',)}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin',)}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, {
      status: 500,
    });
  }

    }
