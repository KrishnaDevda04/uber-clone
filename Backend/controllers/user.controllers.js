const userModel = require('../models/user.model');
const userservice = require('../services/user.service');
const {validationResult} = require('express-validator');

module.exports.registerUser = async(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    console.log(req.body);


    const{ fullname, email, password } = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userservice.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token,user});



}