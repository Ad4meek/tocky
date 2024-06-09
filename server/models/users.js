import { model, Schema } from "mongoose";


const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    money: { type: Number, required: true },
    unique_id: { type: String, required: true }
});


const User = model("User", userSchema);


export {
    User
}