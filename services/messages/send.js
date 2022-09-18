// const { getCorrectUser } = require("../../queries/auth");
const errors = require("../../errors/commons");

module.exports = (db) => async (req, res, next) => {


    res.status(200).json({
        success: true,
    });
};