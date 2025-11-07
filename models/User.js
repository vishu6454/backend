import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    email : {type: String, unique: true},
    password : String,
    otp : String,
    otpExpires : Date,

})
// export default mongoose.model('User', userSchema )

const User = mongoose.model("User", userSchema);
export default User;
