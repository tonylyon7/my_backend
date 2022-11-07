import express from "express";

const index_routes = express.Router()

index_routes.get("/api/docs", (req, res) =>{
    res.render("index")
})

export default index_routes