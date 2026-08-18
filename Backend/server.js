const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/portofolio').then(_ => console.log('Database Connected.'));
app.use(cors())
app.use(express.json());
const aboutRoute = require('./routes/aboutRoute')
const educationRoute = require('./routes/educationRoute')
const skillsRoute = require('./routes/skillsRoute')
const projectsRoute = require('./routes/projectsRoute')
const messageRoute = require('./routes/messagesRoute')
app.use('/about', aboutRoute);
app.use('/education', educationRoute);
app.use('/skills', skillsRoute);
app.use('/projects', projectsRoute);
app.use('/messages', messageRoute);
app.use('/files', express.static('uploads'))

app.listen(port, _ => console.log(`Server started at port ${port}`));