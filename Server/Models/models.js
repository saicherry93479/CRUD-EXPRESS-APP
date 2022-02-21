const mongoose = require("mongoose");

const TaskManager = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [6, "Name must be atleast 3 characters"],
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("TaskManager", TaskManager);
