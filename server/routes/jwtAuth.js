const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const poolDB = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const validation = require("../middleware/validation");

// REGISTER ROUTE
// Test JSON for http://localhost:8000/auth/register POST operation
// {
//     "inputUsername":"mut", 
//     "inputEmail":"muteenk@gmail.com", 
//     "inputPassword":"1234mut", 
//     "inputFirstName":"Mutin", 
//     "inputLastName":"Nabee", 
//     "inputAddress":"Greater Noida", 
//     "inputPhone":"1233211235"
// }

router.post("/register", async (req, res) => {

    // Destructure the req.body sent in by the user { inputUsername, inputEmail, inputPassword, inputFirstName, inputLastName, inputAddress, inputPhone }
    const { inputUsername, inputEmail, inputPassword, inputFirstName, inputLastName, inputAddress, inputPhone } = req.body;

    try {
        // Check if user exists (if user exists then throw error)
        const user = await poolDB.query("SELECT * FROM bayavasfdc.customer_detail__c WHERE email__c = $1", [inputEmail]);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exists!");
        }

        // Bcrypt the user password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(inputPassword, salt);

        // Enter the new user inside our database
        let newUser = await poolDB.query(
            "INSERT INTO bayavasfdc.customer_detail__c(username__c, email__c, password__c, first_name__c, last_name__c, address__c, phone__c) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [inputUsername, inputEmail, bcryptPassword, inputFirstName, inputLastName, inputAddress, inputPhone]
        );

        // Generate our JWT token
        const jwtToken = jwtGenerator(newUser.rows[0].id__c);
        return res.json({ jwtToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Error @jwtAuth.js in Register");
    }
});

// LOGIN ROUTE
// Test JSON for http://localhost:8000/auth/login POST operation
// {    
//     "inputEmail":"muteenk@gmail.com",
//     "inputPassword":"1234mut"
// }
router.post("/login", validation, async (req, res) => {
    // Destructure the req.body
    const { inputEmail, inputPassword } = req.body;

    try {
        // Check if user doesn't exist (if not then throw error)
        const user = await poolDB.query("SELECT * FROM bayavasfdc.customer_detail__c WHERE email__c = $1", [inputEmail]);
        console.log(user.rows);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid e-mail or password! @jwtAuth.js in Login");
        }

        // Check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(
            inputPassword,
            user.rows[0].password__c
        );
        if (!validPassword) {
            return res.status(401).json("Invalid Password @jwtAuth.js in Login");
        }

        // Give them the JWT token
        const jwtToken = jwtGenerator(user.rows[0].id__c);
        return res.json({ jwtToken });
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Error @jwtAuth.js in Login");
    }
});

// Verify
router.post("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error @jwtAuth.js in Verify");
    }
});

// Export
module.exports = router;