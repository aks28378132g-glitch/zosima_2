
let students = [
    { id: 1, name: 'Ayush', course: 'B.Tech CSE' },
    { id: 2, name: 'Rahul', course: 'B.Tech AI/ML' }
];

// GET all students
const getStudents = (req, res) => {
    try {
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getStudentById = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addStudent = (req, res) => {
    try {
        const { name, course } = req.body;

        if (typeof name !== 'string' || !name.trim() ||
            typeof course !== 'string' || !course.trim()) {
            return res.status(400).json({
                error: 'Name and course are required'
            });
        }

        const newStudent = {
            id: students.length
                ? Math.max(...students.map(s => s.id)) + 1
                : 1,
            name: name.trim(),
            course: course.trim()
        };

        students.push(newStudent);

        res.status(201).json({
            message: 'Student created successfully',
            student: newStudent
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateStudent = (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, course } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        if (typeof name !== 'string' || !name.trim() ||
            typeof course !== 'string' || !course.trim()) {
            return res.status(400).json({
                error: 'Name and course are required'
            });
        }

        student.name = name.trim();
        student.course = course.trim();

        res.status(200).json({
            message: 'Student updated successfully',
            student
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE - Remove a student
const deleteStudent = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const deletedStudent = students.splice(index, 1)[0];

        res.status(200).json({
            message: 'Student deleted successfully',
            student: deletedStudent
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
};
