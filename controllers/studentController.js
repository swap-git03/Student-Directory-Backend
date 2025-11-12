const Student = require('../models/Student');

// -------------------- CREATE Student --------------------
async function createStudent(req, res) {
  try {
    const { studentName, studentEmail, studentPhone, studentDOB, studentAddress } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!studentName || !studentEmail) {
      return res.status(400).send({ msg: 'Name and Email are required', success: false });
    }

    const newStudent = new Student({
      studentName,
      studentEmail,
      studentPhone,
      studentDOB,
      studentAddress,
      image
    });

    await newStudent.save();
    res.status(201).send({ msg: 'Student created successfully', success: true, student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- GET All Active Students --------------------
async function getAllStudents(req, res) {
  try {
const students = await Student.find(); // fetch all students, active + inactive
    res.status(200).send({ students, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- GET Student by ID --------------------
async function getStudentByID(req, res) {
  try {
    const id = req.params.id;
    const student = await Student.findOne({ _id: id, isActive: true });
    if (!student) return res.status(404).send({ msg: 'Student not found', success: false });
    res.status(200).send({ student, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- UPDATE Student Details --------------------
async function updateStudent(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body;

    const student = await Student.findOneAndUpdate({ _id: id, isActive: true }, updates, { new: true });
    if (!student) return res.status(404).send({ msg: 'Student not found or inactive', success: false });

    res.status(200).send({ msg: 'Student details updated successfully', success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- UPDATE Status (Active/Inactive) --------------------
async function updateStatus(req, res) {
  try {
    const id = req.params.id;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).send({ msg: "Invalid 'isActive'. Use true/false.", success: false });
    }

    const updated = await Student.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!updated) return res.status(404).send({ msg: 'Student not found', success: false });

    res.status(200).send({
      msg: `Student status updated successfully to ${isActive ? 'Active' : 'Inactive'}`,
      success: true,
      student: updated
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- DELETE Student --------------------
async function deleteStudent(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send({ msg: 'Student not found', success: false });

    res.status(200).send({ msg: 'Student deleted successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- SEARCH Students (Active Only) --------------------
async function searchStudents(req, res) {
  try {
    const { name, email } = req.query;
    if (!name && !email) return res.status(400).send({ msg: 'Provide name or email', success: false });

    const query = { isActive: true };
    if (name) query.studentName = { $regex: name, $options: 'i' };
    if (email) query.studentEmail = { $regex: email, $options: 'i' };

    const students = await Student.find(query);
    res.status(200).send({ students, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- EXPORT --------------------
module.exports = {
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudent,
  updateStatus,
  deleteStudent,
  searchStudents
};
