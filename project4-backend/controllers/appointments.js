// all URL here begin with /appointment

const verifyToken = require('../middleware/verify-token');
const Appointment = require('../models/appointment')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// CREATE: this route is to create a new appointment with user logged in
router.post("/member", verifyToken, async (req, res) => {
    try {
      req.body.customer = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const newAppointment = await Appointment.create(req.body); // create the appointment model using .create() and save to a constant called newAppointment
      newAppointment._doc.customer = req.user;
      res.status(201).json(newAppointment);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // CREATE: this route is to create a new appointment as a guest
router.post("/guest", async (req, res) => {
  try {
    // req.body.customer = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
    const newAppointment = await Appointment.create(req.body); // create the appointment model using .create() and save to a constant called newAppointment
    //newAppointment._doc.customer = req.user;
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

  router.get("/pending", async (req, res) => {
    try {
      const allPendingAppointments = await Appointment.find({status: "pending"}); 
      res.status(201).json(allPendingAppointments);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  router.get("/confirmed", async (req, res) => {
    try {
      const allConfirmedAppointments = await Appointment.find({status: "confirmed"}); 
      res.status(201).json(allConfirmedAppointments);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // update the appointment to be confirmed
  router.put("/pending/:appointmentId", async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId
      const updateStatus = req.body
      const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updateStatus, {new:true}); 
      res.status(201).json(updatedAppointment);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

    // update the appointment to be completed
    router.put("/confirmed/:appointmentId", async (req, res) => {
      try {
        const appointmentId = req.params.appointmentId
        const updateStatus = req.body
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updateStatus, {new:true}); 
        res.status(201).json(updatedAppointment);
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    });

  router.get("/checkPending/:date", async (req, res) => {
    try {
      const apptDate = req.params.date
      const allPendingAppointments = await Appointment.find({date: apptDate}); 
      res.status(201).json(allPendingAppointments);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  router.get("/:appointmentId", async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId
      const apptDetails = await Appointment.findById(appointmentId); 
      res.status(200).json(apptDetails);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;