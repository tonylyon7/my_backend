import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generateToken } from "../utilities/generate_token.js";
import User from "../models/user.js";
//import res from "express/lib/response";



export const user_signup = asyncHandler(async(req, res) => {
    const {firstname,
        middlename,
        lastname,
        age,
        address,
        password,
        phoneNumber, 
        gender,
        email} = req.body
    const userExist = await User.find({$or: [{phoneNumber:phoneNumber},{email:email}]})
    // const userExist = await User.find({phoneNumber:phoneNumber},{email:email})

    if (userExist.length>0){
        throw new Error("User already exist")
    }else{
     const hashedPass = await bcrypt.hash(password, 10)

     const new_user = await User.create({
         firstname, middlename, lastname, phoneNumber, age, address, password: hashedPass, email, gender
     })
     
     if(new_user){
        res.status(201).json({
            status: "OK",
            message: "User created successfully",
            data: {
                firstname: new_user.firstname,
                middlename: new_user.middlename,
                lastname: new_user.lastname,
                age: new_user.age,
                address: new_user.address,
                password: new_user.password,
                phoneNumber: new_user.phoneNumber, 
                gender: new_user.gender,
                email: new_user.email,
                token: generateToken(new_user._id)
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
export const user_signin = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const new_user = await User.findOne({email})
    if(!new_user || !bcrypt.compareSync(password, new_user.password)){
        res.json({error: "Email or Password is incorrect"})
    }else(
        res.json({
            status: "Ok",
            message: "Login successfully",
            data: {
                firstname: new_user.firstname,
                middlename: new_user.middlename,
                lastname: new_user.lastname,
                age: new_user.age,
                address: new_user.address,
                password: new_user.password,
                phoneNumber: new_user.phoneNumber, 
                gender: new_user.gender,
                email: new_user.email,
                token: generateToken(new_user._id)
            }
        })
    )
})

// get all API
export const get_all_users = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({
        status: "OK",
        message: "All users retrieved",
        data: users 
    })
})

// SIngle user
export const get_single_user = asyncHandler(async(req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if (user){
        res.json({
            status: "OK",
            meaasage: "User gotten",
            data: user
        })
    }
})

//updating a user 
export const update_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    const {firstname,
        middlename,
        lastname,
        age,
        address,
        password,
        phoneNumber, 
        gender,
        email} = req.body
    if(user){
        user.firstname = firstname || user.firstname
        user.middlename = middlename || user.middlename
        user.lastname = lastname || user.lastname
        user.age = age || user.age 
        user.address = address || user.address
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.gender = gender || user.gender
        user.email = email || user.email

        const updatedUser = await user.save()

        if(updatedUser){
            res.status(201).json({
                status: "OK",
                meaasage: "User updated successfully",
                data: updatedUser
            })
        }else{
            res.json({meaasage: "something went wrong"})
        }
    } else{
        res.json({error: "user does not exist"})
    }
})

//deleting a user
export const delete_single_user = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(user){
        res.json({
            status: "OK",
            message: "User deleted successfully"
        })
    }else{
        res.json({message: "User not delected"})
    }
})