const db = require('../config/db');

// GET all drivers
const getAllDrivers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Driver');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET single driver by ID
const getDriverById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Driver WHERE Driver_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Driver not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST — add new driver
const createDriver = async (req, res) => {
    try {
        const { Driver_id, Name, Phone_no, License_Number } = req.body;
        await db.query(
            'INSERT INTO Driver (Driver_id, Name, Phone_no, License_Number) VALUES (?, ?, ?, ?)',
            [Driver_id, Name, Phone_no, License_Number]
        );
        res.status(201).json({ message: 'Driver created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT — update existing driver
const updateDriver = async (req, res) => {
    try {
        const { Name, Phone_no, License_Number } = req.body;
        const [result] = await db.query(
            'UPDATE Driver SET Name = ?, Phone_no = ?, License_Number = ? WHERE Driver_id = ?',
            [Name, Phone_no, License_Number, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Driver not found' });
        res.json({ message: 'Driver updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE — remove driver
const deleteDriver = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Driver WHERE Driver_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Driver not found' });
        res.json({ message: 'Driver deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver };