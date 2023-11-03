const express = require('express')
const client = require('../db/connection')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', (req, res) => {

    console.log(req.body);

    const { email, password } = req.body
    // console.log(email, password);
    client.query(`SELECT * FROM users WHERE email ='${email}'`, (err, result) => {

        if (err) {
            res.status(500).json({message:"Internal server error"})
        } 
        else {
            //console.log(result);
            if (result.rows.length === 0) {
                res.status(401).json({
                    message: "User does not exist"
                })
            } else {
                const user = result.rows[0]
                // console.log(user);
                if (user.password === password) {
                    const token = jwt.sign({
                        uname: user.username,
                        email: user.email
                    }, JWT_SECRET)
                    // console.log(token);
                    res.status(200).json({
                        token: token
                    })
                } else {
                    res.status(400).json({
                        message: "Incorrect Password"
                    })

                }
            }
        }
    })
});

module.exports = router