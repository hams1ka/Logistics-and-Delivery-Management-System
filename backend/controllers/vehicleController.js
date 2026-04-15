const db = require('../config/db');

const getAllVehicles = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Vehicle');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Vehicle WHERE Vehicle_Id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Vehicle not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createVehicle = async (req, res) => {
    try {
        const { Vehicle_Id, Plate_Number, Vehicle_Type, Capacity, Availability_Status } = req.body;
        await db.query(
            'INSERT INTO Vehicle (Vehicle_Id, Plate_Number, Vehicle_Type, Capacity, Availability_Status) VALUES (?, ?, ?, ?, ?)',
            [Vehicle_Id, Plate_Number, Vehicle_Type, Capacity, Availability_Status]
        );
        res.status(201).json({ message: 'Vehicle created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const { Plate_Number, Vehicle_Type, Capacity, Availability_Status } = req.body;
        const [result] = await db.query(
            'UPDATE Vehicle SET Plate_Number = ?, Vehicle_Type = ?, Capacity = ?, Availability_Status = ? WHERE Vehicle_Id = ?',
            [Plate_Number, Vehicle_Type, Capacity, Availability_Status, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Vehicle not found' });
        res.json({ message: 'Vehicle updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Vehicle WHERE Vehicle_Id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Vehicle not found' });
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };