import { Stripe } from 'stripe';

/** @type {Stripe} */
let stripe;


function initializeStripe(){
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getStripe(){
    if(!stripe) throw new Error('Stripe was not initilized');

    return stripe;
}


export {
    initializeStripe,
    getStripe
}