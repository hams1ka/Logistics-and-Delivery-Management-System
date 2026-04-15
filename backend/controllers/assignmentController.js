const db = require('../config/db');

const getAllAssignments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Assignment');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAssignmentById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Assignment WHERE Assignment_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Assignment not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createAssignment = async (req, res) => {
    try {
        const { Assignment_id, Delivery_id, Driver_id, Vehicle_id, Start_time } = req.body;
        await db.query(
            'INSERT INTO Assignment (Assignment_id, Delivery_id, Driver_id, Vehicle_id, Start_time) VALUES (?, ?, ?, ?, ?)',
            [Assignment_id, Delivery_id, Driver_id, Vehicle_id, Start_time]
        );
        res.status(201).json({ message: 'Assignment created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const { Delivery_id, Driver_id, Vehicle_id, Start_time } = req.body;
        const [result] = await db.query(
            'UPDATE Assignment SET Delivery_id = ?, Driver_id = ?, Vehicle_id = ?, Start_time = ? WHERE Assignment_id = ?',
            [Delivery_id, Driver_id, Vehicle_id, Start_time, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Assignment not found' });
        res.json({ message: 'Assignment updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Assignment WHERE Assignment_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Assignment not found' });
        res.json({ message: 'Assignment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment };