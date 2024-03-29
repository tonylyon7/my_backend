import express from "express";
import { user_signup,
     user_signin,
     get_all_users, 
     get_single_user, 
     update_single_user,
     delete_single_user,
    } from "../controllers/usercontroller.js";
import { userProtect } from "../middlewares/auth_handler.js";
import * as UserValidation from '../Validations/UserValidation.js'


const user_router = express.Router()

// user_router.post("/user-signup", user_signup)
// user_router.post("/user-signin", user_signin)

user_router.route("/")
    .post(UserValidation.signup, user_signup)
    .get(get_all_users)
user_router.post("/user-signin",UserValidation.signin, user_signin)
user_router.route("/:id")
    .get(userProtect, get_single_user)
    .put(userProtect, update_single_user)
    .delete(userProtect, delete_single_user)

export default user_router 

// getting and posting  in signup can share same routing 
// while signin will share a different route  