

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
   // default: false
  }
});

const TodoModel = mongoose.model("Todo", TodoSchema);

export default TodoModel;