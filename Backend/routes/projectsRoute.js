const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    repoUrl: {
        type: String,
        required: true
    }

})
const projects = mongoose.model('projects', projectSchema);
router.get('/', async (req, res) => {
    const projectsData = await projects.find();
    res.status(200).json(projectsData);
})
router.post('/', async (req, res) => {
    try {
        const { title, desc, tech, repoUrl } = req.body;
        const myProjects = await projects.create({ title, desc, tech, repoUrl });
        res.status(201).json(myProjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const { title, desc, tech, repoUrl } = req.body;
        const myProjects = await projects.findByIdAndUpdate(req.params.id, { title, desc, tech, repoUrl }, { new: true });
        if (!myProjects) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(myProjects)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.delete('/:id', async (req,res) => {
    try {
        const deletedProjects = await projects.findByIdAndDelete(req.params.id);
        if (!deletedProjects) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(deletedProjects);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
)
module.exports = router;