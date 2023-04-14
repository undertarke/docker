//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require('express');
const userRoute = express.Router();
const { getUser, createUser, updateUser } = require('../controllers/userController');

//GET user
userRoute.get("/getUser", getUser);

//POST create user
userRoute.post("/createUser", createUser);

//PUT update user
userRoute.put("/updateUser/:user_id", updateUser);

userRoute.get("/get-user-demo",(req,res)=>{
    res.send("Hello world node js")
})


module.exports = userRoute;
