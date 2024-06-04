module.exports = function (req, res, next) {
    const { inputUsername, inputEmail, inputPassword, inputFirstName, inputLastName, inputAddress, inputPhone } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![inputUsername, inputEmail, inputPassword, inputFirstName, inputLastName, inputAddress, inputPhone].every(Boolean)) {
            return res.json("Missing Registration Credentials @validation.js");
        }
        else if (!validEmail(inputEmail)) {
            return res.json("Invalid Email Credentials @validation.js");
        }
    }
    else if (req.path === "/login") {
        if (![inputEmail, inputPassword].every(Boolean)) {
            return res.json("Missing Login Credentials @validation.js");
        }
        else if (!validEmail(inputEmail)) {
            return res.json("Invalid Login Email @validation.js");
        }
    }

    next();
};