# Logistics-and-Delivery-Management-System
A scalable Logistics and Delivery Management System that helps manage orders, assign deliveries, track shipments, and optimize logistics operations for faster and more reliable service.

📖 Overview
The Logistics & Delivery Operations Management System (LogiOps) is a comprehensive full-stack web application that models and manages real-world logistics and delivery operations. Built as a DBMS mini-project, it demonstrates end-to-end database design from Entity-Relationship modelling through all six normal forms (1NF–5NF), complex SQL queries, stored procedures, triggers, and a live REST API-connected frontend dashboard.
The system manages the complete lifecycle of a delivery operation — from driver and vehicle management to order placement, delivery tracking, route planning, and service history maintenance.

✨ Features
🗄️ Database Layer

8 fully normalised relational tables with primary and foreign key constraints
Complex SQL queries covering aggregate functions, joins (INNER, LEFT, multi-table), subqueries, set operations (UNION, INTERSECT, EXCEPT), and views

Stored functions for delivery duration calculation, driver assignment count, and vehicle status evaluation

Triggers for automatic vehicle availability updates on assignment creation and delivery completion

Cursors for iterative delivery duration reporting

Transactions with SAVEPOINT, COMMIT, and ROLLBACK for data integrity

Concurrency control using row-level and table-level locking


🖥️ Backend (Node.js + Express)


RESTful API with 40+ endpoints covering full CRUD for all 8 tables

14 complex query endpoints exposing all Chapter 3 analytical queries

MySQL connection pooling via mysql2

Environment-based configuration with dotenv

CORS-enabled for frontend-backend communication

Auto-restart with nodemon during development


🎨 Frontend (HTML/CSS/JavaScript)


Dark-themed dashboard with live data from MySQL

10 pages: Dashboard, Drivers, Vehicles, Orders, Deliveries, Assignments, Locations, Routes, Service History, Reports, Normalization

Real-time search with yellow text highlighting across all management pages

Status filter dropdown for vehicle availability

Add/Edit/Delete modals with form validation on every page

Toast notifications for all user actions

Reports page displaying all 14 Chapter 3 query results with colour-coded section labels

Normalization page (Chapter 4) with interactive 6-tab layout covering 1NF through 5NF

Live clock and MySQL online indicator in topbar

Animated delivery duration bar charts

System KPI panel with real-time vehicle and driver counts

Database Design

Entity-Relationship Model

The system identifies 8 core entities based on real-world logistics operations:

Driver ──────────────────┐

                                    ├──── Assignment ────── Delivery ──── Orders
                         
Vehicle ─────────────────┘

Location

Route

Service_History ──────── Vehicle

Relationship Summary:

sqlAssignment.Delivery_id  → Delivery.Deliver_id

Assignment.Driver_id    → Driver.Driver_id

Assignment.Vehicle_id   → Vehicle.Vehicle_Id

Delivery.Order_id       → Orders.Order_Id

Service_History.Vehicle_id → Vehicle.Vehicle_Id

📡 API Reference
Base URL

http://localhost:3000

🧪 Testing the API

A complete api-test.http file is included in the backend/ folder for use with the REST Client VS Code extension.
It covers all 40+ endpoints including GET, POST, PUT, DELETE for every table, plus all 14 report endpoints.
