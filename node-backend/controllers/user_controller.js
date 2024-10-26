const DB = require("../services/database");
const { sendEmail } = require('../services/emailService');
const { formValidation } = require("../validation/validateForm");
const { generateToken } = require("./token_controller")
const crypto = require('crypto');
const short = require('short-uuid');

const register = async function (req, res) {
    try {
        const { formData } = req.body;
        console.log("Form data", formData);

        const error = formValidation(formData);
        if (error !== '')
            return res.status(400).send(error);

        // Generate a short UUID using the default translator (flickrBase58)
        const companyID = short.generate();

        // Check if the email already exists
        const admin = await DB.query(
            `SELECT "company_id" FROM "company_info" WHERE "Referent email" = $1`,
            [formData["Referent email"]]
        );

        if (admin.rowCount != 0) {
            return res.status(400).send("email already exists, use another one");
        }

        // Insert into company_info
        await DB.query(`INSERT INTO company_info (company_id) VALUES ($1)`, [companyID]);

        if (typeof formData === "object" && formData !== null) {

            sendEmail(formData['Referent email'], "Welcome to Form Generator", `Your Comany ID is: ${companyID} and your password is: ${formData.Password}`);
            ////////////////////////////////////////////////////////////////
            console.log("All Pass", formData.Password, formData["Password"]);
            const { salt, hash } = await hashPassword(formData.Password);
            formData.Password = hash;
            formData.Salt = salt;

            const updatePromises = Object.entries(formData).map(([key, value]) => {
                const sanitizedKey = `"${key.replace(/’/g, '')}"`;
                const queryText = `UPDATE company_info SET ${sanitizedKey} = $1 WHERE company_id = $2`;
                return DB.query(queryText, [value, companyID]);
            });

            // Wait for all updates to complete
            await Promise.all(updatePromises);

        } else {
            return res.status(500).send("Internal Error");
        }

        return res.status(200).send("success");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Error");
    }
};

const login = async function (req, res) {
    try {
        const { email, password } = req.body.formData;
        console.log("Data", email, password);
        const error = formValidation(req.body.formData);
        if (error !== '')
            return res.status(400).send(error);
        const user = await DB.query(`SELECT "company_id" as "companyID", "Password", "Salt" FROM "company_info" WHERE "Referent email" = $1`, [email]);
        console.log("User", user);
        if (user.rowCount === 0) {
            return res.status(400).send("Invalid email or password");
        }
        console.log(user.rows[0])
        const userPassword = user.rows[0].Password;
        const salt = user.rows[0].Salt;
        console.log("User Password", userPassword, salt);
        const hash = hashPasswordWithSalt(password, salt);
        //if the password is incorrect
        if (hash !== userPassword) {
            return res.status(400).send("Invalid email or password");
        }
        const token = generateToken(user.rows[0].companyID, "admin");
        return res.status(200).send({ token: token });
    }
    catch (error) {
        return res.status(500).send(error);
    }

};
//use this in passport.js for authentication and authorization.
const findUser = async function (companyID) {
    try {
        const user = DB.query(`SELECT "company_id", "Password" FROM company_info WHERE company_id = $1`, [companyID])
        return user;
    }
    catch (error) {
        return null;
    }

};
// password hashing with HMAC + Salt
function hashPassword(password) {
    console.log("pass", password);
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
    return { salt, hash };
}
function hashPasswordWithSalt(password, salt) {
    const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
    return hash;
}


module.exports = { register, login, findUser }