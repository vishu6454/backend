import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    Day : String,
    Time: String,
    Subject: String,
    Teacher: String,
});
export default mongoose.model("Table", tableSchema);