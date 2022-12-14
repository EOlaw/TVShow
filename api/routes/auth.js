const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, 'password').toString(),
    });
    console.log(newUser)
    try{
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err)
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ email:req.body.email });
        !user && res.status(401).json("Wrong username!")

        const bytes = CryptoJS.AES.decrypt(user.password, 'password');
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);


        originalPassword !== req.body.password && 
        res.status(401).json("Wrong password!");

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 
            'accessToken', { expiresIn: "5d" });

        const { password, ...info } = user._doc;


        res.status(200).json({ ...info, accessToken });
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;