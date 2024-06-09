import { User } from '../models/users.js';
import bcrypt from 'bcrypt';

async function stripeMainWebhook(req, res) {
    const event = req.body;

    if(event.type === "checkout.session.completed"){
        const session = event.data.object;

        const userId = session.metadata.user_id;
        const sessionId = session.id;
        const sessionAmount = session.amount_total / 100;

        if(!userId || !sessionId) throw new Error(500);

        const user = await User.findOne({
            unique_id: userId
        }, {
            _id: 0,
            payment_id: 1
        });

        if(!user || !user.payment_id) throw new Error(500);

        const isCorrectUser = bcrypt.compareSync(sessionId, user.payment_id);

        if(!isCorrectUser) throw new Error(500);

        const result = await User.updateOne({
            unique_id: userId
        }, {
            $unset: {
                payment_id: 1
            },
            $inc: {
                money: sessionAmount
            }
        })

        if(!result || result.modifiedCount !== 1) throw new Error(500);
    }

    res.json({ received: true });
}

export { stripeMainWebhook };
