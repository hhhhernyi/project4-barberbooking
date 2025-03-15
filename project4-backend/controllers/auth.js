const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const saltRounds = 12;

// ALL URL IN THIS PAGE STARTS WITH /AUTH


// this route is to sign up a new user
router.post('/signup', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ email: req.body.email }); // firstly, using the user schema/model .findOne(), find if the email sent in the req.body is already present

    if (userInDatabase) {
      return res.status(409).json({ err: 'Email already taken.' }); // if username is taken, we return a 409 status
    } else { // if email is not taken, use the User schema/model .create() to create a new user with the details provided, and hash the password
        console.log(req.body);
        // save this new created user into a variable named user
        const user = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
            points: 0,
            admin: req.body.admin
            });
    const payload = { email: user.email, _id: user._id }; // extract the email and id of the user and save to a variable named payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET); // create a jwt token using this payload and the secret key in the .env file
    res.status(201).json({ token }); // return this key to the user as a response when user is successfully created
    }

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


// this route is to sign in a existing user
router.post('/login-user', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, admin: false }); // search the database for any existing email
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.hashedPassword); // compare if the user entered password is same as the one in database
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: 'Invalid credentials.' }); // password wrong
    }

    const payload = { email: user.email, _id: user._id, admin: false };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


// this route is to sign in a admin
router.post('/login-admin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, admin: true }); // search the database for any existing email for admin true
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.hashedPassword); // compare if the user entered password is same as the one in database
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: 'Invalid credentials.' }); // password wrong
    }

    const payload = { email: user.email, _id: user._id, admin: true };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;