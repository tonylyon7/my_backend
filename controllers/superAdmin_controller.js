import asyncHandler from "express-async-handler";
import bcrypts from "bcryptjs"
import { generateToken } from "../utilities/generate_token.js";
import Superadmin from "../models/Superadmin.js";
import User from "../models/user.js";
import Buyer from "../models/buyer.js";
import { SuperAdminProtect } from "../middlewares/SuperAdmin.js";
import Admin from "../models/admin.js";

export const create_admin = asyncHandler(async(req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        dob,
        qualification,
        post,
        email,
        phoneNumber,
        password,
        gender,
        address,
        superadmin
    } = req.body
    const superexist = await Superadmin.find({})
    const adminexist = await Superadmin.find({email:email}, {phoneNumber:phoneNumber})
    if(superexist.length == 0 && adminexist.length == 0){
        const hashed = await bcrypts.hash(password, 10)
        const admin = await Superadmin.create({firstName, middleName, lastName, dob, qualification, post, email, phoneNumber, password: hashed, gender, address, superadmin: true})
        if(admin){
            res.json({
                status: "ok",
                message: "you are the superadmin",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    dob: admin.dob,
                    qualification: admin.qualification,
                    post: admin.post,
                    email: admin.email,
                    phonenumber: admin.phonenumber,
                    password: admin.password,
                    gender: admin.gender,
                    address: admin.address,
                    superadmin: admin.superadmin,
                    token: generateToken(admin._id)
                }
            })
        }else{
            res.json({
                message: "incorrect info"
            })
        }
    }else if(adminexist.length > 0){
        throw new Error("admin already exists")
    }else{
        const hashed = await bcrypts.hash(password, 10)
        const admin = await Superadmin.create({firstName, middleName, lastName, dob, qualification, post, email, phoneNumber, password: hashed, gender, address})
        if(admin){
            res.json({
                status: "ok",
                message: "you are now an admin",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    dob: admin.dob,
                    qualification: admin.qualification,
                    post: admin.post,
                    email: admin.email,
                    phonenumber: admin.phonenumber,
                    password: admin.password,
                    gender: admin.gender,
                    address: admin.address,
                    superadmin: admin.superadmin,
                    token: generateToken(admin._id)
                }
            })
        }else{
            res.json({
                message: "incorrect info"
            })
        }
    }
})

export const super_admin_signin = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const admin = await Superadmin.findOne({email})
    if(!admin || !bcrypts.compareSync(password, admin.password)){
        res.json({error: "Email or Password is incorrect"})
    }else(
        res.json({
            status: "Ok",
            message: "Login successfully",
            data: {
                firstname: admin.firstname,
                middlename: admin.middlename,
                lastname: admin.lastname,
                age: admin.age,
                address: admin.address,
                password: admin.password,
                phoneNumber: admin.phoneNumber, 
                gender: admin.gender,
                email: admin.email,
                token: generateToken(admin._id)
            }
        })
    )
})

export const getusersbuyersandadmins = asyncHandler(async(req, res) => {
    const admin = await Superadmin.findById(req.superAdmin.id)
    if(admin.superadmin === true){
        const buyer = await Buyer.find({})
        //const singleBuyer = buyer.find(b => b._id == req.params.id)
        const users = await User.find({})
        res.json({
            status: "ok",
            message: "all data retrived",
            data: {
                buyer,
                users
            }
        })
    }else{
        res.json({
            message: "you're not superadmin"
        })
    }
})

export const get_single_buyer = asyncHandler(async(req, res) => {
    const admin = await Superadmin.findById({_id:req.params.id})
    if(admin.superadmin === true){
        const singleBuyer = Buyer.find(b => b._id == req.params.id)
        res.json({
            status: "ok",
            message: "all buyer retrived",
            data: singleBuyer
        })
    }else{
        res.json({
            message: "you're not superadmin"
        })
    }
})

export const get_single_user = asyncHandler(async(req, res) => {
    const admin = await Superadmin.findById({_id:req.params.id})
    if(admin.superadmin === true){
        const singleuser = User.find(b => b._id == req.params.id)
        res.json({
            status: "ok",
            message: "all user retrived",
            data: singleuser
        })
    }else{
        res.json({
            message: "you're not superadmin"
        })
    }
})

export const Get_all_Admin = asyncHandler(async(req, res) => {
    const Sadmin = await Superadmin.findById(req.superAdmin.id)
    if(Sadmin.superadmin === true){
        const alladmins = await Superadmin.find({})
        const falseAdmin = alladmins.filter(admin => admin.superadmin == false)

        res.json({
            status: "ok",
            message: "all Admin retrived",
            data: falseAdmin
        })
    }else{
        res.json({
            message: "you're not superadmin"
        })
    }
})


//get single Admin
export const Get_single_admin = asyncHandler(async(req, res) => {
    const singleadmin = await Superadmin.findById(req.superAdmin.id)
    if(singleadmin.superadmin === true){
        const getadmin = await Superadmin.find({})
        const Fadmin = getadmin.find(admin => admin._id == req.params.id)

        res.json({
            Status: "OK",
            Message: "Admin gotten Successfully",
            data: Fadmin
        })
    }else{
        res.json({
            Message: "you are not a super Admin"
        })
    }
})