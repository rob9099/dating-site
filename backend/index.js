const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const routes = require ('./routes');

const index = express();
const port = 5000;

const jwt = require("jsonwebtoken");

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'))

index.use(express.json()) // använder denna funktion för att skicka data i body på postman/insomnia

//users
const users = [
    {
        id:"1",
        username:"james",
        password:"123456qwert",
        isAdmin:true,
    },
    {
        id:"2",
        username:"randomuser",
        password:"123456qwert",
        isAdmin:false,
    },
];

index.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => {
        return u.username === username && u.password === password; //return user om username är korrekt username och userns password är korrekt password
    });
    if(user) {  //om vi hittar korrekt user
        //generate an access token
        const accessToken = jwt.sign(
            {id:user.id, isAdmin:user.isAdmin},
             "mySecretKey"); // Byt mysecretkey mot en envfil med key. 
        res.json ({
            username:user.username,
            isAdmin:user.isAdmin,
            accessToken,

        });
    }else { // om vi inte hittar user
        res.status(400).json("wrong password");
    }
    //res.json("yup it works") // denna rad för att testa post på postman
});










index.use('/', routes);
index.listen(port, () => console.log(`Server started on port ${port}`))