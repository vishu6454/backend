import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    messages: String,
    contact: String,
});
export default mongoose.model("Form", formSchema);