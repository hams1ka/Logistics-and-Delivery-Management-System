const express = require('express');
const router  = express.Router();
const {
    deliveriesByDriver,
    routeStats,
    vehicleStatusSummary,
    contactList,
    vehiclesInBothTables,
    unassignedVehicles,
    lateDeliveryOrders,
    earliestAssignedDriver,
    aboveAvgCapacityVehicles,
    assignmentDetails,
    ordersWithDeliveries,
    fullDeliveryReport,
    driverAssignmentSummary,
    vehicleServiceReport
} = require('../controllers/reportsController');

// Aggregate functions
router.get('/deliveries-by-driver',    deliveriesByDriver);
router.get('/route-stats',             routeStats);
router.get('/vehicle-status-summary',  vehicleStatusSummary);

// Set operations
router.get('/contact-list',            contactList);
router.get('/vehicles-in-both-tables', vehiclesInBothTables);
router.get('/unassigned-vehicles',     unassignedVehicles);

// Subqueries
router.get('/late-delivery-orders',    lateDeliveryOrders);
router.get('/earliest-driver',         earliestAssignedDriver);
router.get('/above-avg-capacity',      aboveAvgCapacityVehicles);

// Joins
router.get('/assignment-details',      assignmentDetails);
router.get('/orders-with-deliveries',  ordersWithDeliveries);
router.get('/full-delivery-report',    fullDeliveryReport);

// Views
router.get('/driver-assignment-summary', driverAssignmentSummary);
router.get('/vehicle-service-report',    vehicleServiceReport);

module.exports = router;