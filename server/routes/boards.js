const express = require("express");
// const passport = require("passport");
const router = express.Router();
const upload = require('../utils/upload');
const { isLoggedIn, isAuthor, validateBoard } = require('../middleware');
const { getBoard, getBoards, createBoard, updateBoard, deleteBoard } = require('../controllers/boards')

//add later isloggedin isauthor upload(images) validate board
router.route('/:id')
    .get(getBoard)
    .put(validateBoard, updateBoard)
    .delete(deleteBoard)

router.route('/')
    .get(getBoards)
    .post(upload.array('images'),createBoard)

module.exports = router;