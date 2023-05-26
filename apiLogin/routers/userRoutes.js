/** 
 * @route POST /users/register
 * @group users - Operations about user
 * @produces application/json
 * @param {user.model} user.body.required -name(user name), password, email, role
 * @returns {Error} default - error creating user
 * @returns {success:true,message="user created successfully"} 201  
*/
/** 
 * @route POST /users/login
 * @group users - Operations about user
 * @produces application/json
 * @param {user.model} user.body.required - name and password
 * @returns {Error} default -Unexpected error
 * @returns {success:true,message="Authentication success"} 201
*/
/** 
 * @route  GET /users/users
 * @group users -Operations about user
 * @produces application/json
 * @param {string} Authorization.header.required - Bearer-JWt Token use Bearer {token}
 * @returns {Error} default - Invalid Token,not Authorized
 * @returns {success:true, message="access granted"} 201
*/
/** 
 * @route DELETE /users/users
 * @group users -Operations about user
 * @produces application/json
 * @param {string} Authorization.header.required - Bearer - JWt Token use Bearer {token}
 * @param {string} name.query.required -Enter the name to delete
 * @returns {Error} default -Invalid Token, not Authorized
 * @returns {success:true, message="access granted"} 201
*/
/**
 * @route POST /users/requestPasswordChanged
 * @group users -Operations about user
 * @produces application/json
 * @param {user.model} user.body.required -name and email
 * @returns {Error} default - error message sent
 * @returns {success:true,message="Message sent"} 201
 */
/**
 * @route POST /users/restorePassword/{token}
 * @group users -Operations about user
 * @produces application/json
 * @param {string} token.path.required -Enter token
 * @param {user.model} user.body.required -name , email, new password
 * @returns {Error} default 
 * @returns {success:true, message="password updated succesfully"} 201
 */
const express = require('express')
const userController = require('../controllers/userControllers.js')
const { signup, login, findAll, deleteusers, login_email} = userController
const router = express.Router();
const auth = require("../middleware/userAuth.js");
const authrole = require("../middleware/roleAuth.js");
const authtoken=require("../middleware/tokenAuth.js");

router.post('/users/register', signup);
router.post('/users/login', login);
//router.get('/login/validate',auth);
router.get('/users/users', auth, findAll, function (req, res) {
    res.status(200).send({ message: "YOU HAVE ACCESS" })
});
router.delete('/users/users', authrole, deleteusers);
router.post('/users/requestPasswordChanged', login_email);
router.post('/users/restorePassword/:token',authtoken);


module.exports = router