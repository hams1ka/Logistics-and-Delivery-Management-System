const db = require('../config/db');

// ─────────────────────────────────────────────────────────────
// 3.2 AGGREGATE FUNCTIONS
// ─────────────────────────────────────────────────────────────

// Total deliveries made by each driver
const deliveriesByDriver = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT D.Driver_id, D.Name,
                   COUNT(A.Assignment_id) AS Total_Deliveries
            FROM Driver D
            JOIN Assignment A ON D.Driver_id = A.Driver_id
            GROUP BY D.Driver_id, D.Name
            ORDER BY Total_Deliveries DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Average, max, min and total distance across all routes
const routeStats = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT AVG(Distance) AS Avg_Distance,
                   MAX(Distance) AS Max_Distance,
                   MIN(Distance) AS Min_Distance,
                   SUM(Distance) AS Total_Distance
            FROM Route
        `);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Vehicle count and total capacity grouped by availability status
const vehicleStatusSummary = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Availability_Status,
                   COUNT(Vehicle_Id) AS Vehicle_Count,
                   SUM(Capacity)     AS Total_Capacity
            FROM Vehicle
            GROUP BY Availability_Status
            HAVING COUNT(Vehicle_Id) >= 1
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─────────────────────────────────────────────────────────────
// 3.3 SET OPERATIONS
// ─────────────────────────────────────────────────────────────

// UNION — all driver names and location addresses as one contact list
const contactList = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Name    AS Contact_Info, 'Driver'   AS Source FROM Driver
            UNION
            SELECT Address AS Contact_Info, 'Location' AS Source FROM Location
            ORDER BY Source
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// INTERSECT — vehicles that appear in both Assignment and Service_History
const vehiclesInBothTables = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DISTINCT A.Vehicle_id
            FROM Assignment A
            INNER JOIN Service_History SH ON A.Vehicle_id = SH.Vehicle_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// EXCEPT — vehicles that have never been assigned to any delivery
const unassignedVehicles = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Vehicle_Id, Plate_Number, Vehicle_Type
            FROM Vehicle
            WHERE Vehicle_Id NOT IN (SELECT Vehicle_id FROM Assignment)
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─────────────────────────────────────────────────────────────
// 3.4 SUBQUERIES
// ─────────────────────────────────────────────────────────────

// Orders with delivery completion time later than 15:00
const lateDeliveryOrders = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Order_Id, Oder_Date, Customer_Id
            FROM Orders
            WHERE Order_Id IN (
                SELECT Order_id FROM Delivery
                WHERE TIME(Completed_time) > '15:00:00'
            )
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Driver assigned to the earliest assignment time
const earliestAssignedDriver = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT D.Driver_id, D.Name, D.Phone_no
            FROM Driver D
            WHERE D.Driver_id = (
                SELECT Driver_id FROM Assignment
                WHERE Start_time = (SELECT MIN(Start_time) FROM Assignment)
                LIMIT 1
            )
        `);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Vehicles with capacity greater than the average capacity
const aboveAvgCapacityVehicles = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Vehicle_Id, Plate_Number, Vehicle_Type, Capacity
            FROM Vehicle
            WHERE Capacity > (SELECT AVG(Capacity) FROM Vehicle)
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─────────────────────────────────────────────────────────────
// 3.5 JOINS
// ─────────────────────────────────────────────────────────────

// INNER JOIN — full assignment details with driver name and vehicle type
const assignmentDetails = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT A.Assignment_id,
                   D.Name        AS Driver_Name,
                   V.Plate_Number,
                   V.Vehicle_Type,
                   A.Start_time
            FROM Assignment A
            INNER JOIN Driver  D ON A.Driver_id  = D.Driver_id
            INNER JOIN Vehicle V ON A.Vehicle_id = V.Vehicle_Id
            ORDER BY A.Assignment_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LEFT JOIN — all orders with their delivery details
const ordersWithDeliveries = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT O.Order_Id, O.Oder_Date, O.Customer_Id,
                   D.Deliver_id, D.Assignment_time, D.Completed_time
            FROM Orders O
            LEFT JOIN Delivery D ON O.Order_Id = D.Order_id
            ORDER BY O.Order_Id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// MULTI-TABLE JOIN — full delivery report with duration
const fullDeliveryReport = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT O.Order_Id,
                   O.Oder_Date,
                   D.Name        AS Driver_Name,
                   V.Vehicle_Type,
                   TIMEDIFF(Del.Completed_time, Del.Assignment_time) AS Duration
            FROM Orders O
            JOIN Delivery   Del ON O.Order_Id    = Del.Order_id
            JOIN Assignment A   ON Del.Deliver_id = A.Delivery_id
            JOIN Driver     D   ON A.Driver_id   = D.Driver_id
            JOIN Vehicle    V   ON A.Vehicle_id  = V.Vehicle_Id
            ORDER BY O.Order_Id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─────────────────────────────────────────────────────────────
// 3.6 VIEWS (queried as normal SELECTs from Node.js)
// ─────────────────────────────────────────────────────────────

// Driver assignment summary view
const driverAssignmentSummary = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT D.Driver_id, D.Name,
                   COUNT(A.Assignment_id) AS Total_Assignments
            FROM Driver D
            LEFT JOIN Assignment A ON D.Driver_id = A.Driver_id
            GROUP BY D.Driver_id, D.Name
            ORDER BY Total_Assignments DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Vehicle service report view
const vehicleServiceReport = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT V.Vehicle_Id, V.Plate_Number, V.Vehicle_Type,
                   SH.Maintenance_Type, SH.Service_Date
            FROM Vehicle V
            JOIN Service_History SH ON V.Vehicle_Id = SH.Vehicle_id
            WHERE SH.Service_Date = (
                SELECT MAX(Service_Date)
                FROM Service_History S2
                WHERE S2.Vehicle_id = V.Vehicle_Id
            )
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    // Aggregates
    deliveriesByDriver,
    routeStats,
    vehicleStatusSummary,
    // Set operations
    contactList,
    vehiclesInBothTables,
    unassignedVehicles,
    // Subqueries
    lateDeliveryOrders,
    earliestAssignedDriver,
    aboveAvgCapacityVehicles,
    // Joins
    assignmentDetails,
    ordersWithDeliveries,
    fullDeliveryReport,
    // Views
    driverAssignmentSummary,
    vehicleServiceReport
};