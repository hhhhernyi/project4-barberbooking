// all URL here begin with /reviews

const verifyToken = require('../middleware/verify-token');
const Review = require('../models/reviews')
const express = require('express');
const router = express.Router();


// CREATE: this route is to create a new appointment with user logged in
router.post("/", async (req, res) => {
    try {
      //req.body.customer = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const newReview = await Review.create(req.body); // create the appointment model using .create() and save to a constant called newAppointment
      newReview._doc.customer = req.user;
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

// CREATE: this route is to create a new appointment with user logged in
router.get("/", async (req, res) => {
    try {
      //req.body.customer = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const allReviews = await Review.find(); // find all reviews
      //newReview._doc.customer = req.user;
      res.status(201).json(allReviews);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;