import express from "express";
import { buyer_signup, 
    buyer_signin,
    delete_single_buyer, 
    get_all_buyers, 
    get_single_buyer, 
    update_single_buyer, 
    get_all_items} from "../controllers/buyer_controller.js";
import { buyerProtect } from "../middlewares/buyer_handler.js";

const buyer_router = express.Router()

buyer_router.route("/")
    .post(buyer_signup)
    .get(get_all_buyers)
buyer_router.get("/item", get_all_items)
buyer_router.post("/buyer-signin", buyer_signin)
buyer_router.route("/:id")
    .get(buyerProtect, get_single_buyer)
    .patch(buyerProtect, update_single_buyer)
    .delete(buyerProtect, delete_single_buyer)
// buyer_router.get("/item", get_all_items)

export default buyer_router