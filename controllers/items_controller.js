import asyncHandler from "express-async-handler";
import Item from "../models/item.js";
import User from "../models/user.js";

export const create_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const {itemName, price, size, typeofItem, qty, description,availability} = req.body

    if(user){
        const item = await Item.create({
            created_by: req.user.id,
            itemName,
            price,
            size,
            typeofItem,
            qty,
            availability,
            description
        })

        if(item){
            res.json({
                status: "Okay",
                Message: "Item created successfully",
                data: item
            })
        }else{
            res.json({
                error: "Invalid User"
            })
        }
    }else{
        res.status(404).json({
            error: "user does not exist"
        })
    }
})

export const get_paginated_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)

    const pageSize = 2 //ten per page
    const page = Number(req.query.pageNumber) || 1
    const count = await Item.countDocuments({created_by: user._id})
    const item = await Item.find({created_by: user._id})
        .sort({createdAt: -1}) // the last item on a very long array 
        .limit(pageSize)
        .skip(pageSize * (page-1))
    if(user && item){
        res.json({
            status: "OK",
            Message: "paginated item retrived",
            data: {
                item,
                meta:{
                    page,
                    page: Math.ceil(count / pageSize),
                    total: count,
                }
            }
        })
    }else{
        res.json({
            error: "user does not exist or does not have item"
        })
    }
})

export const get_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const item = await Item.find({created_by: user._id})

    if(user && item){
        res.json({
            status: "OK",
            Message: "paginated item retrived",
            data: item
        })
    }else{
        res.json({
            error: "User does not exis"
        })
    }
})

export const getOne_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const getOne = await Item.findOne({_id: req.params.id, created_by: user._id}) 

    if(getOne){
            res.json({
                status: "OK",
                Message: "One Item retrived",
                data: getOne
            })
        // }else{
        //     res.json({
        //         Message: "Item does not exist"
        //     })
        // }
    }else{
        res.json({
            Error: "Item was not created"
        })
    }

})

export const update_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const get_item = await Item.findById({_id:req.params.id})
    const {itemName, price, size, typeofItem, qty, description} = req.body

    if(user && get_item){
        get_item.itemName = itemName || get_item.itemName
        get_item.price = price || get_item.price
        get_item.size = size || get_item.size
        get_item.typeofItem = typeofItem || get_item.typeofItem
        get_item.qty = qty || get_item.qty
        get_item.description = description || get_item.description

        const newItem = await get_item.save()

        if(newItem){
        res.json({
            Status: "OK",
            Message: "item Updated Successfully",
            data: newItem
        })
        }else{
        res.json({
            message: "item not found"
        })
        }
    }else{
        res.json({
            error: "not a user"
        })
    }
})

export const delete_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const update_item = await Item.findByIdAndDelete({_id:req.params.id})
    if(user && update_item){
        res.status(201).json({
            status: "OK",
            message: "Deleted Successfully"
        })
    }else{
        res.json({
            error: "Item not found"
        })
    }
})

