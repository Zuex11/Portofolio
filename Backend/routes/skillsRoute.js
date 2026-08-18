const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true
    },
    levelNum: {
        type: Number,
        required: true
    }

})
const skills = mongoose.model('skills', skillSchema)
router.get('/', async (req, res) => {
    const skillsData = await skills.find();
    res.status(200).json(skillsData);
})
router.post('/', async (req, res) => {
    try {
        const { name, category, level, levelNum } = req.body;
        const mySkills = await skills.create({ name, category, level, levelNum });
        res.status(201).json(mySkills);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { name, category, level, levelNum } = req.body;
        const mySkills = await skills.findByIdAndUpdate(req.params.id, {  name, category, level, levelNum }, { new: true });
        if (!mySkills) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.status(200).json(mySkills)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedSkills = await skills.findByIdAndDelete(req.params.id);
        if (!deletedSkills) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        res.status(200).json(deletedSkills);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;