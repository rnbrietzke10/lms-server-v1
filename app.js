const express = require('express');
const morgan = require('morgan');

const staffRouter = require('./routes/staffRoutes');
const courseRouter = require('./routes/courseRoutes');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Route Handlers

// GET staff member by id
// app.get('/api/v1/staff/:id', getStaffMember);

// create staff memeber
// app.post('/api/v1/staff', createStaffMember);

// Update staff member
// app.patch('/api/v1/staff/:id', updateStaffMember);

// Delete Staff member
// app.delete('/api/v1/staff/:id', deleteStaffMember);

// Routes

app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/courses', courseRouter);

// Start Server

module.exports = app;
