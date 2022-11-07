import express from "express";
import { adminProtect } from "../middlewares/admin_auth_handler.js";
import { create_admin, getusersbuyersandadmins, Get_all_Admin, Get_single_admin, super_admin_signin } from "../controllers/superAdmin_controller.js";
import { SuperAdminProtect } from "../middlewares/SuperAdmin.js";
import { get_single_buyer } from "../controllers/buyer_controller.js";
import { get_single_user } from "../controllers/usercontroller.js";

const adminRouter = express.Router()
adminRouter.route("/")
     .post(create_admin)
     .get(super_admin_signin)
adminRouter.get("/all", SuperAdminProtect, getusersbuyersandadmins)
adminRouter.get("/buyers/:id", SuperAdminProtect, get_single_buyer)
adminRouter.get("/users/:id", SuperAdminProtect, get_single_user)
adminRouter.get("/admins/", SuperAdminProtect, Get_all_Admin)
adminRouter.get("/admins/:id", SuperAdminProtect, Get_single_admin)
export default adminRouter