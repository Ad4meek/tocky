import mongoose from "mongoose";

function connectMongo(){
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("DB Connected"))
        .catch(() => console.error('DB Connection failed'))
}


export {
    connectMongo
}