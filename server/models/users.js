import { model, Schema } from "mongoose";


const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    money: { type: Number, required: true },
    unique_id: { type: String, required: true },

    payment_id: { type: String, required: false }
});


const User = model("User", userSchema);


export {
    User
}