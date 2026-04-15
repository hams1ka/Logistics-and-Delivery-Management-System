const db = require('../config/db');

const getAllRoutes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Route');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRouteById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Route WHERE Route_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Route not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createRoute = async (req, res) => {
    try {
        const { Route_id, Distance } = req.body;
        await db.query(
            'INSERT INTO Route (Route_id, Distance) VALUES (?, ?)',
            [Route_id, Distance]
        );
        res.status(201).json({ message: 'Route created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateRoute = async (req, res) => {
    try {
        const { Distance } = req.body;
        const [result] = await db.query(
            'UPDATE Route SET Distance = ? WHERE Route_id = ?',
            [Distance, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Route not found' });
        res.json({ message: 'Route updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteRoute = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Route WHERE Route_id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Route not found' });
        res.json({ message: 'Route deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute };