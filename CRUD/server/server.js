// CREATE SERVER
const express = require("express");
const app = express();
const _PORT = 3001;
app.use(express.json());
require('dotenv').config();

// USE CORS MIDDLEWARE
const cors = require("cors");
app.use(cors());

// CONNECT TO DATABASE
const mongoose = require("mongoose");
const database = process.env.DATABASE;
mongoose.connect(database)

// IMPORT USER_MODEL
const UserModel = require('./models/Users')

// GET USERS
app.get("/users", async (req, res)=>{
    const users = await UserModel.find();
    res.json(users)
})

// GET USER BY ID
app.get("/users/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// CREATE NEW USER
app.post("/createUser", async (req, res)=>{
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.json(req.body);
})

// DELETE USER BY ID
app.delete("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ success: true, message: "User has been deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE USER
app.put("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = req.body;
        const user = await UserModel.findByIdAndUpdate(userId, updatedUser, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ success: true, message: "User has been updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// STARTING SERVER
app.listen(_PORT, ()=>{
    console.log("Server Works Good!")
})