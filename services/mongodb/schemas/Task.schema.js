import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
   title: { type: String, required: true },
   description: String,
   creationDate: {type: Date, default: Date.now},
   finished: { type: Boolean, default: false },
   belongTo: { type: String, required: true },
});

export default mongoose.model('Tasks', taskSchema);
