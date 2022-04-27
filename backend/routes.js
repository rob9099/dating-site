const express = require ('express');
const router = express.Router();
const profileModel = require('./mongooseSchemas/profileSchema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { request } = require('http');




const multerStorage = multer.diskStorage({
    destination: '../public/profileImages',
    filename: function(req, file, callback){
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const multerImageUpload = multer({storage: multerStorage})






//Skapa nytt profil
router.post('/newProfile', multerImageUpload.array('profileImage', 5), async (request, response) =>{

    const saltedPassword = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(request.body.password, saltedPassword)

    let imagePaths = [];
    for (pathsOfImages of request.files){
        imagePaths.push(pathsOfImages.path)

    }

    const newProfile = new profileModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        emailAddress: request.body.emailAddress,
        password: encryptedPassword,
        city: request.body.city,
        gender: request.body.gender,
        age: request.body.age,
        datingGender: request.body.datingGender,
        profileBio: request.body.profileBio,
        employment: request.body.employment,
        hobbies: request.body.hobbies,
        profileImage: imagePaths
    })


    const newUserEmailAddress = newProfile.emailAddress;
    const userExists = await profileModel.findOne({emailAddress: newUserEmailAddress})


    if(userExists){
        response.json('Error, user already exists')
    }else{
        newProfile.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => response.json(error))
    }

})


router.post('/login', async (req,res) => {
    const { emailAddress, password} = req.body;

    const user = await profileModel.findOne({where: { emailAddress: emailAddress } }); 
     

    if (!user){
        return res.status(400).json({
            "errors": [
                {
                    "msg":"Invalid information",
                }
            ]
        })
    };
    
    const dbPassword = user.password
    console.log(dbPassword);
    console.log(password);
    bcrypt.compare(dbPassword, password).then((match) => {
        if(match) {
            

            res.json("it matched");
            console.log("it matched");
            
        } else {
            console.log(match);
            res
            .json({login:"error"});
            console.log("failed");
           
       }

    });

    //let isMatch = await bcrypt.compare(password, user.encryptedPassword);
    

  // if (!isMatch){
  //     return res.status(400).json({
  //         "errors": [
  //             {
  //                 "msg":"Invalid information",
  //             }
  //         ]
  //     })
  // };
  
    

})


//Hämta alla profiler
router.get('/get', (request, response) =>{

    profileModel.find()
    .then(data => {
        console.log(data)
        response.json(data)
    })
    .catch(error => response.json(error))
})

module.exports = router;