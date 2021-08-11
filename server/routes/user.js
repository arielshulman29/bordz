const express = require("express");
// const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isAuthor, validateBoard } = require('../middleware');
const { googleLoginUser } = require('../controllers/user')

//add later isloggedin isauthor upload(images) validate board
router.route('/googlelogin')
    .post(googleLoginUser)

module.exports = router;