const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const router = express.Router();
const upload = require('./upload');
const aboutMeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    bio: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: String,
        required: true,
    }

})
const aboutMe = mongoose.model('aboutMe', aboutMeSchema)
router.put('/', upload.single('photo'), async (req, res) => {

    try {
        const { name, email, title, bio, github, linkedIn } = req.body;
        const currentData = await aboutMe.findOne();
        if (req.file) {
            if (currentData && currentData.photo) {
                fs.unlink('uploads/' + currentData.photo, (err) => {
                    if (err) {
                        console.log(err.message);
                    };
                })
            }
        }
        const photo = req.file ? req.file.filename : currentData?.photo;
        const about = await aboutMe.findOneAndUpdate({}, { name, email, title, photo, bio, github, linkedIn }, { upsert: true, new: true });
        res.status(200).json(about);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.get('/', async (req, res) => {
    const aboutData = await aboutMe.findOne();
    res.status(200).json(aboutData);
})

module.exports = router;