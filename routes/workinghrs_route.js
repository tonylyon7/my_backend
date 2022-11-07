import express from "express";
import { userProtect } from "../middlewares/auth_handler.js";
import { Delete_Simngle_Working_Hour, Get_Simngle_Working_Hour, update_single_day, workers } from "../controllers/workinghrscontroller.js";
import { update_single_admin } from "../controllers/admincontroller.js";

const work_router = express.Router()

work_router.route("/work")
    .post(userProtect, workers)
work_router.route("/work/:id")
    .get(userProtect, Get_Simngle_Working_Hour)
    .patch(userProtect, update_single_day)
    .delete(userProtect, Delete_Simngle_Working_Hour)
export default work_router