import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import path, { dirname } from "path"

import { errorHandler } from "./middlewares/errorhandler.js";
import user_router from "./routes/userroute.js";
import work_router from "./routes/workinghrs_route.js";

import connectDB from "./config/db.js";
import admin_router from "./routes/adminroute.js";
//import Item from "./models/item.js";
import item_router from "./routes/item_route.js";
import buyer_router from "./routes/buyerroute.js";
import adminRouter from "./routes/superadminroute.js";
// you must always add .JS to every importation from javascript

const app = express()

const __dirname = path.resolve()
// for heroku
// dotenv.config({path: "./config/config.env"})

require("dotenv").config({path: "./config/config.env"})

connectDB().then()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/public", express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(errorHandler)
app.use("/api/user", user_router)
app.use("/api/admin", admin_router)
app.use("/api/users", work_router)
app.use("/api/items", item_router)
app.use("/api/buyer", buyer_router)
app.use("/api/superadmin", adminRouter)

app.get("/home", (req, res) => {
    res.redirect("/api/docs")
})


const PORT = process.env.PORT || 5000;

// app.listen(
//     PORT,
//     console.log(
//         `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
//     )
// );

app.listen (PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} node on port ${PORT}`)
  })
