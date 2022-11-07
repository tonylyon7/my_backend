
import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        firstname: {type: String},
        middlename: {type: String},
        lastname: {type: String},
        age: {type: Number},
        gender: {type: String},
        phoneNumber: {type: String},
        email: {type: String},
        address: {type: String},
        password: {type: String},

    }
)
const Admin = mongoose.model("Admin", adminSchema)
export default Admin