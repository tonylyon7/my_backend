//import { type } from "express/lib/response";
import mongoose from "mongoose";

const itemScheme = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        itemName: {type: String},
        price: {type: Number},
        size: {type: String},
        typeofItem: {type: String},
        qwy: {type: Number},
        availability: {
            type: Boolean,
            default: true
        },
        description: {type: String}
    },
    {
        timestamps: true
    }
)

const Item = mongoose.model("Item", itemScheme)

export default Item