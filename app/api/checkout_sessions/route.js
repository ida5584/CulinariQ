require("dotenv").config();

import { NextResponse } from "next/server";
// import { Stripe, loadStripe } from '@stripe/stripe-js';
// import Stripe from "stripe";
const Stripe= require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15'
})

const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}


export async function POST(req){
    
    // console.log(req.headers)
    console.log("Request Tier: ",req.headers.get("tier"))
    console.log("Request Price: ",req.headers.get("price"))
    
    const CURRENCY = 'usd'
    // const PRICE = 10 // USD
    // Subscription model
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
                currency: CURRENCY,
                product_data:{
                    name: `${req.headers.get("tier")} Subscription`,
                    
                },
                unit_amount: formatAmountForStripe(parseInt(req.headers.get("price"))),
                recurring:{
                  interval: 'month',
                  interval_count: 1,
                }
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
      };
      
    const checkoutSession =
        await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {status:200})
}

export async function GET(req) {
  // console.log(req)
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')
  console.log('session_id:', session_id)

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