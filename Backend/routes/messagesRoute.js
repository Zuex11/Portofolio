const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    }
})
const messages = mongoose.model('messages', messageSchema);
router.get('/', async (req, res) => {
    const messagesData = await messages.find();
    res.status(200).json(messagesData);
})
router.post('/', async (req, res) => {
    try {
        const { name, message, email } = req.body;
        const myMessages = await messages.create({ name, message, email });
        res.status(201).json(myMessages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const myMessage = await messages.findByIdAndUpdate(req.params.id, {isRead: req.body.isRead}, { new: true });
        if (!myMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(myMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const deletedMessages = await messages.findByIdAndDelete(req.params.id);
        if (!deletedMessages) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json(deletedMessages);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
)
module.exports = router;