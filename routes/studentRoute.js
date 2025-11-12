const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // if using multer
const {
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudent,
  updateStatus,
  deleteStudent,
  searchStudents
} = require('../controllers/studentController');

// CREATE Student
router.post('/createStudent', upload.single('image'), createStudent);

// GET All Students
router.get('/getAllStudents', getAllStudents);

// GET Student by ID
router.get('/getStudentByID/:id', getStudentByID);

// UPDATE Student Details
router.put('/updateStudent/:id', updateStudent);

// UPDATE Status
router.patch('/updateStatus/:id', updateStatus);

// DELETE Student
router.delete('/deleteStudent/:id', deleteStudent);

// SEARCH Students
router.get('/search', searchStudents);

module.exports = router;
