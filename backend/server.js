const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const db = require('./config/db');

// Import all routes
const driverRoutes         = require('./routes/driverRoutes');
const vehicleRoutes        = require('./routes/vehicleRoutes');
const ordersRoutes         = require('./routes/ordersRoutes');
const deliveryRoutes       = require('./routes/deliveryRoutes');
const assignmentRoutes     = require('./routes/assignmentRoutes');
const locationRoutes       = require('./routes/locationRoutes');
const routeRoutes          = require('./routes/routeRoutes');
const serviceHistoryRoutes = require('./routes/serviceHistoryRoutes');
const reportsRoutes        = require('./routes/reportsRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Register all routes
app.use('/api/drivers',        driverRoutes);
app.use('/api/vehicles',       vehicleRoutes);
app.use('/api/orders',         ordersRoutes);
app.use('/api/deliveries',     deliveryRoutes);
app.use('/api/assignments',    assignmentRoutes);
app.use('/api/locations',      locationRoutes);
app.use('/api/routes',         routeRoutes);
app.use('/api/servicehistory', serviceHistoryRoutes);
app.use('/api/reports',        reportsRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message : 'Logistics & Delivery Operations Management System API',
        status  : 'Server is running',
        endpoints: [
            'GET /api/drivers',
            'GET /api/vehicles',
            'GET /api/orders',
            'GET /api/deliveries',
            'GET /api/assignments',
            'GET /api/locations',
            'GET /api/routes',
            'GET /api/servicehistory'
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});