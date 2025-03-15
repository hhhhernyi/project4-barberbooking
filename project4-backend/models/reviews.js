const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    review: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
      },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
