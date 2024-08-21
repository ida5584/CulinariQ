require("dotenv").config();

import { NextResponse } from "next/server";
// import { Stripe, loadStripe } from '@stripe/stripe-js';
import Stripe from "stripe";

// const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const formatAmountForStripe = {amount} => {
    return Math.round(amount * 100)
}


export async function POST(req){
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
        // apiVersion: '2024-06-20'
    })
    
    const CURRENCY = 'usd'
    const PRICE = 10 // USD
    // Subscription model
    const params = {
        submit_type: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
                currency: CURRENCY,
                product_data:{
                    name: 'Premium Subscription',
                    
                },
                amount: formatAmountForStripe(PRICE),
                recurring:{
                  interval: 'month',
                  interval_count: 1,
                }
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      };

    // Donation Model
    // const params = {
    //     submit_type: 'donate',
    //     payment_method_types: ['card'],
    //     line_items: [
    //       {
    //         name: 'Custom amount donation',
    //         amount: formatAmountForStripe(amount, CURRENCY),
    //         currency: CURRENCY,
    //         quantity: 1,
    //       },
    //     ],
    //     success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    //   };
      
    const checkoutSession =
        await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {status:200})
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    if (!session_id) {
      throw new Error('Session ID is required!')
    } else{
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
      return NextResponse.json(checkoutSession)
    } 
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return NextResponse.json({error: {message: error.message}}, {status: 500})
  }
}