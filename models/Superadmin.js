import mongoose from "mongoose";

const superadminSchema = mongoose.Schema(
    {
        firstName: {type : String},
        middleName: {type : String},
        lastName: {type : String},
        dob: {type : String},
        qualification: {type : String},
        post: {type : String},
        email: {type : String},
        phoneNumber: {type : String},
        password: {type : String},
        gender: {type : String},
        address: {type : String},
        superadmin: {
            type: Boolean, 
            default: false
        }
    }
)
const Superadmin = mongoose.model("Sadmin", superadminSchema)
export default Superadmin