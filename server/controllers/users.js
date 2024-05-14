const User = require("../models/users");
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        
        const data = new User(userData);

        const result = await data.save();
        
        if (result) {
            return res.status(201).send({
            msg: "User created",
            payload: result,
            });
        }
        res.status(500).send({
            msg: "User was not created",
        });

    } catch (error) {
        res.status(500).send(error);
    }
};
