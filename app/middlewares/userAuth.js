const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Pool } = require("pg");

//Assigning db.users to User variable
const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {

  try {
    const name = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    //if username exist in the database respond with a status of 409
    if (name) {
      return res.json(409).send("name already taken");
    }
    const pass = await User.findOne({
      where: {
        password: req.body.password,
      },
    });
    if (pass) {
      return res.json(409).send("Authentication failed");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
const authrole = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      res.status(403).send({ message: "TOKEN NOT AUTHORIZED" });
    } else {
      jwt.verify(token, process.env.secretKey, function (err, payload) {
        if (payload.role == "admin") {
          next();
        } else {
          res.status(409).json({ message: "access failed, only administrators can access" });
        }
      })
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Invalid Token, not Authorized" });
  }
};
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456789",
  database: "departments",
  dialect: "postgres",
  port: 5432,
})
const authroleuser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      res.status(403).send({ message: "TOKEN NOT AUTHORIZED" });
    } else {
      jwt.verify(token, process.env.secretKey, function (err, payload) {
        if (payload.role == "admin") {
          getUsers().then(response => {
            res.status(201).json(response)
          })

        } else if (payload.role == "user") {
          getName().then(response => {
            res.status(201).json(response)
          })
        }
      })
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Invalid Token, not Authorized" });
  }
}
const authroledepartment = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      res.status(403).send({ message: "TOKEN NOT AUTHORIZED" });
    } else {
      jwt.verify(token, process.env.secretKey, function (err, payload) {
        if (payload.role == "admin") {
          getDepartament().then(response => {
            res.status(201).json(response)
          })

        } else if (payload.role == "user") {
          getDepartamenttitle().then(response => {
            res.status(201).json(response)
          })
        }
      })
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Invalid Token, not Authorized" });
  }
}


const getUsers = async () => {
  const response = await pool.query('SELECT * FROM  users');
  return response.rows
}
const getName = async () => {
  const response = await pool.query('SELECT name FROM users');
  return response.rows
}
const getDepartament = async () => {
  const response = await pool.query('SELECT * FROM departments');
  return response.rows
}
const getDepartamenttitle = async () => {
  const response = await pool.query('SELECT title FROM departments');
  return response.rows
}

module.exports = {
  saveUser,
  authrole,
  authroleuser,
  authroledepartment,
};