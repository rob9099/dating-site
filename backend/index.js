const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const routes = require ('./routes');
const cors = require("cors");
const bcrypt = require('bcrypt');
const index = express();
const port = 5000;

const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
const profileModel = require('./mongooseSchemas/profileSchema');
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'));

index.use(express.json()); // använder denna funktion för att skicka data i body på postman/insomnia
index.use(cookieParser());

index.post('/newProfile', /*multerImageUpload.single('profileImage'),*/ async (request, response) =>{

    const saltedPassword = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(request.body.password, saltedPassword)

    let newProfile = new profileModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        emailAddress: request.body.emailAddress,
        password: encryptedPassword,
        city: request.body.city,
        gender: request.body.gender,
        datingGender: request.body.datingGender,
        profileBio: request.body.profileBio,
        employment: request.body.employment,
        hobbies: request.body.hobbies,
        //profileImage: request.file.path
    })

    newProfile.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => response.json(error))

})


//Hämta alla profiler
index.get('/get', (request, response) =>{

    profileModel.find()
    .then(data => {
        console.log(data)
        response.json(data)
    })
    .catch(error => response.json(error))
})


index.post("/login", async (req, res) => {
    const { emailAddress, password } = req.body;
  
    const user = await profileModel.findOne({ where: { emailAddress: emailAddress } });
  
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(user);
  
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000, // experation datum för tokencookien
          httpOnly: true,
        });
  
        res.json("LOGGED IN");
      }
    });
  });

  index.get("/profile", validateToken, (req, res) => {
    res.json("profile");
  });


/*
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

const verify = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token =  authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err,user) =>{
            if (err) {
                return res.status(403).json("Token is not valid");
            }

            req.user = user;
            next();
        });

    }else {
        res.status(401).json("you are not authenticated");
    }
};

index.delete("/api/users/:userId", verify, (req,res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("User has been deleted.")
    } else {
        res.status(403).json("You are not able to delete other users");
    }
});
*/










index.use(cors())
index.use('/', routes);
index.listen(port, () => console.log(`Server started on port ${port}`))