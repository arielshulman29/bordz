const express = require('express');
const mongoose = require('mongoose');
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const getSignedUrl = require('../utils/getImages');
const Board = require('../models/board.js');


module.exports.getBoards = async (req, res, next) => {
    try {
        const Boards = await Board.find().populate("images");
        var boardIndex = 0;
        for (let board of Boards) {
            var imagesIndex = 0;
            for (let image of board.images) {
                url = await getSignedUrl(image.key);
                Boards[boardIndex].images[imagesIndex].url = url;
                imagesIndex++;
            }
            boardIndex++;
        }
        res.status(200).json(Boards);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

module.exports.getBoard = async (req, res, next) => {
    try {
        const { id } = req.params;
        let board = await Board.findById(id).populate('images');
        var imagesIndex = 0;
        for (let image of board.images) {
            url = await getSignedUrl(image.key);
            board.images[imagesIndex].url = url;
            imagesIndex++;
        }
        res.status(200).json({ board });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}


module.exports.createBoard = async (req, res, next) => {
    // const geoData = await geocoder.forwardGeocode({
    //     query: req.body.board.location,
    //     limit: 1
    // }).send()
    // const board = new Board(req.body.board);
    // console.log(req.body);
    const { title, boardType, price, volume, brand, year, length, description, phone, seller } = req.body;
    const newBoard = new Board({ title, boardType, price, volume, brand, year, length, description, phone, seller });
    // if (!geoData.body.features[0]) {
    //     return res.status(409).send('location not found');
    // }
    // console.log(images);
    newBoard.images = req.files.map(f => ({ url: f.location, filename: f.filename, key: f.key }));
    newBoard.createdAt = new Date();
    try {
        await newBoard.save();
        var imagesIndex = 0;
        for (let image of newBoard.images) {
            url = await getSignedUrl(image.key);
            newBoard.images[imagesIndex].url = url;
            imagesIndex++;
        }
        res.status(201).json(newBoard);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
}


module.exports.updateBoard = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedBoard = await Board.findByIdAndUpdate(id, { ...req.body.board });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    updatedBoard.images.push(...imgs);
    updatedBoard.updated = new Date();
    await updatedBoard.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await s3Config.deleteObject({
                Bucket: `${process.env.AWS_BUCKET_NAME}`,
                Key: filename
            }, function (err, data) {
                if (err) {
                    return res.status(404).send("an error occured while deleting photos", err);
                }
            })
        }
        await board.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    res.status(201).json(newBoard);
}

module.exports.deleteBoard = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Board.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
