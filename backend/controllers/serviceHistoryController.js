const db = require('../config/db');

const getAllServiceHistory = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Service_History');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getServiceHistoryById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Service_History WHERE Record_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Record not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createServiceHistory = async (req, res) => {
    try {
        const { Record_id, Vehicle_id, Maintenance_Type, Service_Date } = req.body;
        await db.query(
            'INSERT INTO Service_History (Record_id, Vehicle_id, Maintenance_Type, Service_Date) VALUES (?, ?, ?, ?)',
            [Record_id, Vehicle_id, Maintenance_Type, Service_Date]
        );
        res.status(201).json({ message: 'Service history record created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateServiceHistory = async (req, res) => {
    try {
        const { Vehicle_id, Maintenance_Type, Service_Date } = req.body;
        const [result] = await db.query(
            'UPDATE Service_History SET Vehicle_id = ?, Maintenance_Type = ?, Service_Date = ? WHERE Record_id = ?',
            [Vehicle_id, Maintenance_Type, Service_Date, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Service history updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteServiceHistory = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Service_History WHERE Record_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Service history deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllServiceHistory, getServiceHistoryById, createServiceHistory, updateServiceHistory, deleteServiceHistory };
  