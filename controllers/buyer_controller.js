import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generateToken } from "../utilities/generate_token.js";
import Buyer from "../models/buyer.js";
import Item from "../models/item.js";
import User from "../models/user.js";

export const buyer_signup = asyncHandler(async(req, res) => {
    const {firstname,
        middlename,
        lastname,
        age,
        address,
        password,
        phoneNumber, 
        gender,
        email} = req.body
    const buyerExist = await Buyer.find({$or: [{phoneNumber:phoneNumber},{email:email}]})
    // const userExist = await User.find({phoneNumber:phoneNumber},{email:email})

    if (buyerExist.length>0){
        throw new Error("User already exist")
    }else{
     const hashedPass = await bcrypt.hash(password, 10)

     const new_buyer = await Buyer.create({
         firstname, middlename, phoneNumber, age, address, password: hashedPass, email, gender
     })
     
     if(new_buyer){
        res.status(201).json({
            status: "OK",
            message: "Buyer created successfully",
            data: {
                firstname: new_buyer.firstname,
                middlename: new_buyer.middlename,
                lastname: new_buyer.lastname,
                age: new_buyer.age,
                address: new_buyer.address,
                password: new_buyer.password,
                phoneNumber: new_buyer.phoneNumber, 
                gender: new_buyer.gender,
                email: new_buyer.email,
                token: generateToken(new_buyer._id)
            }
        })
     }else{
         res.status(400).json({
            message: "Buyer data already Exist"
         })
     }
    }
})

// sign in API
export const buyer_signin = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const new_buyer = await Buyer.findOne({email})
    if(!new_buyer || !bcrypt.compareSync(password, new_buyer.password)){
        res.json({error: "Email or Password is incorrect"})
    }else(
        res.json({
            status: "Ok",
            message: "Login successfully",
            data: {
                firstname: new_buyer.firstname,
                middlename: new_buyer.middlename,
                lastname: new_buyer.lastname,
                age: new_buyer.age,
                address: new_buyer.address,
                password: new_buyer.password,
                phoneNumber: new_buyer.phoneNumber, 
                gender: new_buyer.gender,
                email: new_buyer.email,
                token: generateToken(new_buyer._id)
            }
        })
    )
})

// get all API
export const get_all_buyers = asyncHandler(async(req, res) => {
    const buyers = await Buyer.find({})
    res.json({
        status: "OK",
        message: "All buyer retrieved",
        data: buyers 
    })
})

// SIngle user
export const get_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findOne({_id: req.params.id})
    if (buyer){
        res.json({
            status: "OK",
            meaasage: "buyer gotten",
            data: buyer
        })
    }
})

//updating a user 
export const update_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findById(req.params.id)
    const {firstname,
        middlename,
        lastname,
        age,
        address,
        password,
        phoneNumber, 
        gender,
        email} = req.body
    if(buyer){
        buyer.firstname = firstname || buyer.firstname
        buyer.middlename = middlename || buyer.middlename
        buyer.lastname = lastname || buyer.lastname
        buyer.age = age || buyer.age 
        buyer.address = address || buyer.address
        buyer.phoneNumber = phoneNumber || buyer.phoneNumber
        buyer.gender = gender || buyer.gender
        buyer.email = email || buyer.email

        const updatedBuyer = await buyer.save()

        if(updatedBuyer){
            res.status(201).json({
                status: "OK",
                meaasage: "buyer updated successfully",
                data: updatedBuyer
            })
        }else{
            res.json({meaasage: "something went wrong"})
        }
    } else{
        res.json({error: "Buyer does not exist"})
    }
})

//deleting a user
export const delete_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findByIdAndDelete(req.params.id)
    if(buyer){
        res.json({
            status: "OK",
            message: "buyer deleted successfully"
        })
    }else{
        res.json({message: "buyer not delected"})
    }
})

// get all items
export const get_all_items = asyncHandler(async(req, res) => {
    const items = await Item.find({}) 
    const buyerfind = items.filter(x => x.availability === true)

    if(buyerfind){
        res.json({
            status: "OK",
            message: "All available items retrieved",
            data: buyerfind
        })   
    }else{
        res.json({
            Error : "no items available"
        })
    }
})