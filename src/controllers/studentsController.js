const db = require('../models/db');

exports.addStudent = (req, res) => {
    const { name, father_name, mother_name, age, home_address } = req.body;
    const registration_date = new Date().toISOString().substring(0, 10);

    db.run(`INSERT INTO students (name, father_name, mother_name, age, home_address, registration_date) 
            VALUES (?, ?, ?, ?, ?, ?)`, [name, father_name, mother_name, age, home_address, registration_date], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error adding student');
        }
        res.status(200).send('Student added successfully');
    });
}

exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, father_name, mother_name, age, home_address } = req.body;

    db.run(`UPDATE students SET name =?, father_name =?, mother_name =?, age =?, home_address =? WHERE id =?`,
        [name, father_name, mother_name, age, home_address, id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error updating student');
            }
            res.status(200).send('Student updated successfully');
        });
}

exports.deleteStudent = (req, res) => {
    const { id } = req.params;

    db.run(`UPDATE students SET deleted = 1 WHERE id =?`, [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error deleting student');
        }
        res.status(200).send('Student deleted successfully');
    });
}

exports.getAllStudents = (req, res) => {
    db.all(`SELECT * FROM students WHERE deleted = 0`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error fetching students');
        }
        res.status(200).send(rows);
    });
}

exports.filterStudents = (req, res) => {
    const { name, registration_date, home_address } = req.query;
    let query = `SELECT * FROM students WHERE deleted = 0`;

    if (name) query += ` AND name LIKE '%${name}%'`;
    if (registration_date) query += ` AND registration_date='${registration_date}'`;
    if (home_address) query += ` AND home_address LIKE '%${home_address}%'`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error filtering students');
        }
        res.status(200).send(rows);
    });
}


exports.getStudentById = (req, res) => {
    const { id } = req.params; 
    db.get(`SELECT * FROM students WHERE id=? AND deleted=0`, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error fetching student');
        }
        if (!row) {
            return res.status(404).send('Student not found');
        }
        res.status(200).send(row);
    });
}