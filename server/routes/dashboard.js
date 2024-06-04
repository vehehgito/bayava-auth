const router = require("express").Router();
const authorize = require("../middleware/authorize");
const poolDB = require("../db");

router.post("/", authorize, async (req, res) => {
    try {
        const user = await poolDB.query(
            "SELECT id__c FROM users WHERE id__c = $1", [req.user.id]);
        res.json(user.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Error @dashboard.js");
    }
});

module.exports = router;