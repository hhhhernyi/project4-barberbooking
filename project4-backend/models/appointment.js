const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    date: {
      type: Date,
      required: true,
    },
    time:{
        type: [],
        required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ["cut", "color", "treatment"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "completed"],
    },
    comments: {
      type: String

    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
