const db = require('../config/db');

const getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Orders');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Orders WHERE Order_Id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { Order_Id, Oder_Date, Customer_Id } = req.body;
        await db.query(
            'INSERT INTO Orders (Order_Id, Oder_Date, Customer_Id) VALUES (?, ?, ?)',
            [Order_Id, Oder_Date, Customer_Id]
        );
        res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { Oder_Date, Customer_Id } = req.body;
        const [result] = await db.query(
            'UPDATE Orders SET Oder_Date = ?, Customer_Id = ? WHERE Order_Id = ?',
            [Oder_Date, Customer_Id, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM Orders WHERE Order_Id = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };