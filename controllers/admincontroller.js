import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generateToken } from "../utilities/generate_token.js";
import Admin from "../models/admin.js";




export const admin_signup = asyncHandler(async(req, res) => {
    const {firstname,
        middlename,
        lastname,
        age,
        address,
        password,
        phoneNumber, 
        gender,
        email} = req.body
    const adminExist = await Admin.find({$or: [{phoneNumber:phoneNumber},{email:email}]})
    // const userExist = await Admin.find({phoneNumber:phoneNumber},{email:email})

    if (adminExist.length>0){
        throw new Error("User already exist")
    }else{
    const hashedPass = await bcrypt.hash(password, 10)

     const admin = await Admin.create({
         firstname, middlename, phoneNumber, age, address, password: hashedPass, email, gender
     })
     
     if(admin){
        res.status(201).json({
            status: "OK",
            message: "User created successfully",
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
     }else{
         res.status(400).json({
            message: "User data already Exist"
         })
     }
    }
})

// sign in API
export const admin_signin = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const admin = await Admin.findOne({email})
    if(!admin || !bcrypt.compareSync(password, admin.password)){
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

// get all API
export const get_all_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.find({})
    res.json({
        status: "OK",
        message: "All users retrieved",
        data: admin 
    })
})

// SIngle user
export const get_single_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findOne({_id: req.params.id})
    if (admin){
        res.json({
            status: "OK",
            meaasage: "User gotten",
            data: admin
        })
    }
})

export const update_single_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.params.id)
    const {firstname,
        middlename,
        lastname,
        age,
        address,
        password,
        phoneNumber, 
        gender,
        email} = req.body
    if(admin){
        admin.firstname = firstname || admin.firstname
        admin.middlename = middlename || admin.middlename
        admin.lastname = lastname || admin.lastname
        admin.age = age || admin.age 
        admin.address = address || admin.address
        admin.phoneNumber = phoneNumber || admin.phoneNumber
        admin.gender = gender || admin.gender
        admin.email = email || admin.email

        const updatedAdmin = await admin.save()

        if(updatedAdmin){
            res.status(201).json({
                status: "OK",
                meaasage: "User updated successfully",
                data: updatedAdmin
            })
        }else{
            res.json({meaasage: "something went wrong"})
        }
    } else{
        res.json({error: "user does not exist"})
    }
})

//delecting a single admin
export const delete_single_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findByIdAndDelete(req.params.id)
    if(admin){
        res.json({
            status: "OK",
            message: "User deleted successfully"
        })
    }else{
        res.json({message: "User not found"})
    }
})