const express = require('express');
const app = express();
const db = require('../models/db')
const bodyParser = require('body-parser');
var cors = require('cors')
const {addStudent , updateStudent, deleteStudent, getAllStudents, filterStudents, getStudentById} = require('../controllers/studentsController');
require('dotenv').config();
app.use(cors());

const port = process.env.port || 3000;
app.use(bodyParser.json());

// Add a new student
app.post('/students', addStudent);

// Update an existing student
app.put('/students/:id', updateStudent);

// Soft delete a student
app.delete('/students/:id', deleteStudent);

// Get all students
app.get('/students',getAllStudents);

// Filter students
app.get('/students/filter', filterStudents);

// get students by id
app.get('/students/:id', getStudentById);

app.listen(port);