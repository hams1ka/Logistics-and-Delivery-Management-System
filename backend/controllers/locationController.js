const db = require('../config/db');

const getAllLocations = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Location');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getLocationById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Location WHERE Location_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Location not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createLocation = async (req, res) => {
    try {
        const { Location_id, Address, Contact_No } = req.body;
        await db.query(
            'INSERT INTO Location (Location_id, Address, Contact_No) VALUES (?, ?, ?)',
            [Location_id, Address, Contact_No]
        );
        res.status(201).json({ message: 'Location created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateLocation = async (req, res) => {
    try {
        const { Address, Contact_No } = req.body;
        const [result] = await db.query(
            'UPDATE Location SET Address = ?, Contact_No = ? WHERE Location_id = ?',
            [Address, Contact_No, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Location not found' });
        res.json({ message: 'Location updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteLocation = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Location WHERE Location_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Location not found' });
        res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation };