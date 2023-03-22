
/**
 * 
 * @route POST /signup
 * @group users -Operations about user
 * @param {user.model} user.body.required -userName(nombre de usuario), email or password
 * @returns {Error} default - Unexpected error
 * @returns {object} 201 - An array of user info
 * @produces application/json
 * @consumes application/json
 */
/**
 * @route POST /login
 * @group users -Operations about user
 * @param {user.model} user.body.required - email or password
 * @returns {Error} default - Unexpected error
 * @returns {object} 201 - An array of user info
 * @produces application/json
 * @consumes application/json
 */

/* Importing the userController and userAuth modules. */
const express = require('express')
const userController = require('../Controllers/departmentsuser.controller.js')
const { signup, login } = userController
const userAuth = require('../Middleware/userAuth')
const router = express.Router()

/* Calling the `userAuth.saveUser` middleware function and then the `signup` controller function. */
router.post("/signup",userAuth.saveUser,signup);
/* Calling the `login` controller function. */
router.post('/login', login )

module.exports = router