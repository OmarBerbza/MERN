// CREATE SERVER
const express = require('express');
const app = express();
const _PORT = 3001;
app.use(express.json());

require('dotenv').config();

// HASH CODE
const bcrypt = require('bcrypt');

// CORS MIDDLEWERE
const cors = require('cors');
app.use(cors());

// CONNECT TO DB
const mongoose = require('mongoose');
const db = process.env.DB;
mongoose.connect(db);

// IMPORT USER MODEL
const UserModel = require('./models/Users');

// GET THE REGISTRED USERS
app.get("/registred", async (req, res)=>{
    const users = await UserModel.find();
    res.json(users)
})

// REGISTER USER
app.post("/register", async (req, res)=>{
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserModel({
            indentifiant: req.body.indentifiant,
            password: hashPassword,
            naissence: req.body.naissence,
            ville: req.body.ville,
            genre: req.body.genre,
            loisir: req.body.loisir,
            photo: req.body.photo,
            preview: req.body.preview
        });
        await newUser.save();
        res.json({message: "The user has been registred successfully!"});
    }catch(error){
        console.error("There's an error while registring: ", error);
        res.status(500).json({error: "Internal server error "})
    }
    

});

// LAUNCHING SERVER
app.listen(_PORT, ()=>{
    console.log("Server works good!")
});