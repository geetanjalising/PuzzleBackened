const express = require("express");
const router = new express.Router();
const USER = require("./userSchema");
const bcrypt = require("bcryptjs");

//SignUp
router.post("/signUp", async (req, res) => {
    console.log(req.body);
    // console.log("Hello1");
    const { fname, email, mobile, password, cpassword, UserType } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill the user data" });
        console.log("data not available");
    };

    try {
        const preuser = await USER.findOne({ email: email });
        // console.log("Hello2");
        if (preuser) {
            console.log("preuser123");
            res.status(421).json({ error: "this user is already present" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and cpassword not match" })
        } else {
            const finaluser = new USER({
                fname, email, mobile, password, cpassword, UserType
            });

            //password hashing using bcryptJs


            const storedata = await finaluser.save();
          //  console.log("hashing reach");
            console.log(storedata);

            res.status(201).json(storedata);
        }
    }
    catch (error) {

    }
});

//SignIn

router.post("/signIn", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({ error: "fill all the data" })
        return;
    };

    try {
        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin + "user value");
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Details" });
            } else {
                res.status(201).json(userlogin);
            }
        }
        else{
            res.status(400).json({ error: "Invalid Details" });
        }
    } catch (error) {
        res.status(400).json({ error: "invalid details" });
    }
})

module.exports = router;