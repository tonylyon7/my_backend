import express from "express";
import { userProtect } from "../middlewares/auth_handler.js";
import { create_item, delete_item, getOne_item, get_item, get_paginated_item, update_item } from "../controllers/items_controller.js";

const item_router = express.Router()

item_router.route("/")
    .post(userProtect, create_item)
    .get(userProtect, get_item)
item_router.get("/paginated-item", userProtect, get_paginated_item)
item_router.route("/:id")
    .patch(userProtect, update_item)
    .delete(userProtect, delete_item)
    .get(userProtect, getOne_item)
export default item_router