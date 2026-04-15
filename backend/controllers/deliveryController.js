const db = require('../config/db');

const getAllDeliveries = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Delivery');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDeliveryById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Delivery WHERE Deliver_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Delivery not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createDelivery = async (req, res) => {
    try {
        const { Deliver_id, Order_id, Assignment_time, Completed_time } = req.body;
        await db.query(
            'INSERT INTO Delivery (Deliver_id, Order_id, Assignment_time, Completed_time) VALUES (?, ?, ?, ?)',
            [Deliver_id, Order_id, Assignment_time, Completed_time]
        );
        res.status(201).json({ message: 'Delivery created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDelivery = async (req, res) => {
    try {
        const { Order_id, Assignment_time, Completed_time } = req.body;
        const [result] = await db.query(
            'UPDATE Delivery SET Order_id = ?, Assignment_time = ?, Completed_time = ? WHERE Deliver_id = ?',
            [Order_id, Assignment_time, Completed_time, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Delivery not found' });
        res.json({ message: 'Delivery updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDelivery = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Delivery WHERE Deliver_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Delivery not found' });
        res.json({ message: 'Delivery deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllDeliveries, getDeliveryById, createDelivery, updateDelivery, deleteDelivery };