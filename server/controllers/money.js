import { User } from '../models/users.js';
import { getStripe } from '../helpers/stripe.js';
import bcrypt from 'bcrypt';

async function getUserMoney(req, res){
    const userId = req.params.id;

    if(!userId) return res.status(500).send();

    try{
        const user = await User.findOne({
            unique_id: userId
        }, {
            _id: 0,
            money: 1
        });
    
        if(!user || Object.hasOwnProperty(user, "money")) return res.status(500).send();
    
        res.status(200).send({
            data: {
                money: user.money
            }
        });
    }
    catch(err){
        res.status(500).send();
    }
}

async function depositUserMoney(req, res){
    try{
        const userId = req.params.id;
        const moneyAmount = parseInt(req.body.amount) ?? null;
    
        if(!userId || moneyAmount === null) return res.status(500).send();
    
        const stripe = getStripe();
    
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'czk',
                        unit_amount: moneyAmount * 100,
                        product_data: {
                            name: "Točky kredit"
                        },
                    },
                    quantity: 1
                }
            ],
            metadata: {
                user_id: userId
            },
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/deposit/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/deposit/cancel`
        });
    
        
        // Save stripe id to db
        const hashedStripeId = bcrypt.hashSync(session.id, 10);
        
        const dbResult = await User.updateOne({
            unique_id: userId
        }, {
            $set: {
                payment_id: hashedStripeId
            }
        });
    
        if(!dbResult || dbResult.modifiedCount === 0) return res.status(500).send();
    
        res.status(200).send({
            data: {
                payment_url: session.url
            }
        })
    }
    catch(err){
        res.status(500).send();
    }
}


async function getDepositAmount(req, res){
    const depositId = req.params.deposit_id;

    if(!depositId) return res.status(500).send();

    const stripe = getStripe();

    try{
        const session = await stripe.checkout.sessions.retrieve(depositId);
        const amount = session.amount_total / 100;

        res.status(200).send({
            data: {
                amount: amount
            }
        })
    }
    catch(err){
        res.status(500).send();
    }
}

async function removeAmountMoney(req, res){
    const amount = parseInt(req.body.amount) ?? null;
    const userUniqueId = req.body.uniqueId;

    if(!amount || !userUniqueId) return res.status(500).send();

    try{
        const result = await User.updateOne({
            unique_id: userUniqueId
        }, {
            $inc: {
                money: -amount
            }
        });

        if(!result || result.modifiedCount !== 1) return res.status(500).send();
        
        res.status(200).send();
    }
    catch(err){
        res.status(500).send();
    }
}

async function addAmountMoney(req, res){
    const amount = parseInt(req.body.amount) ?? null;
    const userUniqueId = req.body.uniqueId;

    if(!amount || !userUniqueId) return res.status(500).send();

    try{
        const result = await User.updateOne({
            unique_id: userUniqueId
        }, {
            $inc: {
                money: amount
            }
        });

        if(!result || result.modifiedCount !== 1) return res.status(500).send();
        
        res.status(200).send();
    }
    catch(err){
        res.status(500).send();
    }
}


export {
    getUserMoney,
    depositUserMoney,
    getDepositAmount,
    removeAmountMoney,
    addAmountMoney
}