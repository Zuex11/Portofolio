const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
    },
    period: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }

})
const education = mongoose.model('education', educationSchema)
router.get('/', async (req, res) => {
    const educationData = await education.find();
    res.status(200).json(educationData);
})
router.post('/', async (req, res) => {
    try {
        const { title, institution, period, description } = req.body;
        const myEducation = await education.create({ title, institution, period, description });
        res.status(201).json(myEducation);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { title, institution, period, description } = req.body;
        const myEducation = await education.findByIdAndUpdate(req.params.id, { title, institution, period, description }, { new: true });
        if(!myEducation){
            return res.status(404).json({error: 'Education not found'});
        }
        res.status(200).json(myEducation)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }   
});
router.delete('/:id', async (req,res)=>{
    try{
    const deletedEdu = await education.findByIdAndDelete(req.params.id);
    if(!deletedEdu){
        return res.status(404).json({error: 'Education not found'});
    }
    
    res.status(200).json(deletedEdu);
    
} catch(err){
    res.status(500).json({error: err.message});
}
})
module.exports = router;