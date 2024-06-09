const { BONUS_MONEY } = require("../CONST");
const User = require("../models/users");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    /**
     * 
     * name - string
     * email - string
     * password - string
     * 
     */
    
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            money: BONUS_MONEY,
            unique_id: uuidv4()
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


exports.loginUser = async (req, res) => {
    /**
     * 
     * email - string
     * password - string
     * 
     */


    const userData = {
        email: req.body.email,
        password: req.body.password
    };


    try{
        // Get user
        const user = await User.findOne({
            email: userData.email
        }, {
            _id: 0
        });
    
        if(!user) return res.status(401).send();

        // Compare passwords
        const isPasswordCorrect = bcrypt.compareSync(userData.password, user.password);

        if(!isPasswordCorrect) return res.status(401).send();

        // Create session token and save it to cookies
        const tokenData = {
            name: user.name,
            email: user.email,
            uniqueId: user.unique_id
        };
        
        const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY);

        res.cookie('session_token', jwtToken, {
            maxAge: 2700,
            httpOnly: true,
            path: "/",
            sameSite: 'strict'
        });
    }
    catch(err){
        res.status(500).send(error);
    }
    

    res.status(200).send();
}
