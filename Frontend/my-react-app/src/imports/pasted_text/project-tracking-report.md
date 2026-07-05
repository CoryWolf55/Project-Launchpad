📘 Project Tracking & Reporting System
🚀 Overview
This project is a data ingestion and reporting platform designed to replace manual spreadsheet-based tracking for commercialization and project lifecycle management.

The system allows users to:

Submit an Excel file URL
Automatically extract and process project data
Store versioned datasets (current and previous)
Generate real-time dashboards and reports
The goal is to eliminate manual Excel tracking while providing a centralized, automated reporting solution for leadership visibility.

🎯 Key Features
✅ Data Ingestion
Accepts an Excel file via URL
Processes files using Python and Pandas
Extracts and normalizes project data
✅ Automated Refresh
Runs every 24 hours
Downloads the latest Excel file
Reprocesses project data automatically
Updates reporting datasets
✅ Versioned Data Storage
Maintains two datasets:

Current dataset
Previous dataset
This enables historical comparisons and rollback capabilities.

✅ Reporting Dashboard
Provides real-time insights including:

Total project count
Pending vs. assigned projects
Project distribution by type:
PIE
IMO
Standard
Lifecycle
Sunset
✅ Gantt Chart Visualization
Visualizes project timelines including:

Anticipated Pilot Dates
General Availability (GA) Dates
Helping teams quickly identify scheduling and delivery timelines.

🏗️ Architecture
                +----------------+
                |   Frontend UI  |
                +--------+-------+
                         |
                         | POST /ingest
                         |
                +--------v-------+
                |   Backend API  |
                +--------+-------+
                         |
              +----------+-----------+
              |                      |
              |                      |
     +--------v--------+    +--------v--------+
     | Ingestion Logic |    |  Scheduler      |
     | (Python/Pandas) |    | (24 Hour Job)   |
     +--------+--------+    +--------+--------+
              |                      |
              +----------+-----------+
                         |
                +--------v--------+
                |    Database     |
                | Current Dataset |
                | Previous Dataset|
                +--------+--------+
                         |
                +--------v--------+
                | Reporting API   |
                +--------+--------+
                         |
                +--------v--------+
                | Dashboards      |
                | Charts          |
                | Gantt Timeline  |
                +-----------------+
Architecture
🔄 Data Flow
User visits the dashboard.
User submits an Excel file URL.
The frontend sends a request to the backend.
The backend starts the ingestion pipeline.
The ingestion service:
Downloads the Excel file
Parses the spreadsheet
Normalizes project data
The database:
Updates the current dataset
Archives the previous dataset
A scheduled job runs every 24 hours:
Downloads the latest file
Detects changes
Refreshes stored data
The frontend requests processed data through the API.
Dashboards and reports are generated in real time.
🔌 API Endpoints
POST /ingest
Submits an Excel file URL for processing.

Request
{
  "excel_url": "https://example.com/file.xlsx"
}
Response
{
  "status": "success",
  "message": "Ingestion started."
}
⏱️ Scheduler Logic
Every 24 hours the scheduler:

Retrieves the stored Excel URL.
Downloads the newest file.
Compares the file hash.
Re-ingests data if changes are detected.
Archives the previous dataset.
Replaces the current dataset.
📊 Reporting Capabilities
Key Metrics
Total project count
Pending vs. assigned projects
Project distribution by type
Resource allocation visibility
Lifecycle Tracking
Gate-based project tracking
Progress monitoring
Status reporting
Timeline Insights
Pilot readiness tracking
General Availability (GA) timelines
Cross-project visibility
⚠️ Known Limitations
Excel structure must remain consistent.
Missing values may reduce reporting accuracy.
Project IDs must be unique.
Very large spreadsheets may increase processing time.
🧠 Assumptions
Source Excel files follow a consistent format.
Project types are predefined.
Date fields may be nullable.
The application is read-only (no editing through the UI).
🔮 Future Enhancements
AI-powered anomaly detection
Dataset comparison (Diff View)
Task-level project tracking
Role-based access control
Export reports as PDF or PowerPoint
Email report scheduling
Historical trend analysis
👥 Target Users
Project Managers
Business Analysts
Leadership Teams
PMO Stakeholders
✅ Why This Matters
Replaces
Manual Excel tracking
Duplicate data entry
Disconnected reporting workflows
Provides
Automated data ingestion
Centralized project storage
Real-time dashboards
Historical dataset versioning
Results
Improved operational efficiency
Increased data accuracy
Faster decision-making
Better project visibility