// all URL here begin with /users
const verifyToken = require('../middleware/verify-token');
const User = require('../models/user')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

  router.get("/:userId", verifyToken, async (req, res) => {
    try {
      const userID = req.params.userId
      const oneUser = await User.findById(userID); 
      res.status(201).json(oneUser);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  router.put("/:userId", async (req,res)=>{
    try {
      const userId = req.params.userId;
      const body = req.body
      //req.body.customer = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const updatedUser = await User.findByIdAndUpdate(userId, body, {new:true}); // create the client model using .create() and save to a constant called newClient
      //updatedUser._doc.customer = req.user;
      res.status(201).json(updatedUser);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;