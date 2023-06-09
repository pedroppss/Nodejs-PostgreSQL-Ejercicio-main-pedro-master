/**
 *@typedef user
 *@property {string} name.required
 *@property {string} email.required
 *@property {string} password.required
 *@property {string} role.required
 */



/* This is creating a table in the database. */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        /* This is creating a column in the table. */
        name: {
            type: DataTypes.STRING,
            allowNull: false

        },
        /* This is creating a column in the table. */
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        /* This is creating a column in the table. */
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: true },)
    return User
};