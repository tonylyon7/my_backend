import express from "express";
import { admin_signup, 
    admin_signin,
    get_all_admin,
    get_single_admin,
    update_single_admin,
    delete_single_admin,} from "../controllers/admincontroller.js";
import { adminProtect } from "../middlewares/admin_auth_handler.js";
const admin_router = express.Router()

// admin_router.post("/admin-signup", admin_signup)
admin_router.post("/admin-signin", admin_signin)

admin_router.route("/")
    .post(admin_signup)
    .get(get_all_admin)
admin_router.route("/:id")
    .get(adminProtect, get_single_admin)
    .put(adminProtect, update_single_admin)
    .delete(adminProtect, delete_single_admin)

export default admin_router