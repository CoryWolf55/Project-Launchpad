Project Tracking & Reporting System
Frontend Design Specification

Target Users: CRE/CRM Teams at Velera

Design Philosophy

This application is an internal enterprise tool designed for employees who spend several hours each day tracking commercialization projects. The interface should prioritize efficiency, readability, and quick access to information over flashy visuals.

The design should resemble modern Microsoft enterprise applications rather than a marketing website.

Goals
Information-dense without feeling cluttered
Professional, corporate appearance
Minimal use of color
Fast navigation
Powerful filtering
Tables as the primary method of viewing data
Charts used only to summarize information
Consistent spacing and typography
Responsive layout for large desktop monitors
Overall Layout
---------------------------------------------------------
| Sidebar |                Top Navigation               |
|         |---------------------------------------------|
|         |                                             |
|         |                                             |
|         |               Main Content                  |
|         |                                             |
|         |                                             |
---------------------------------------------------------
Sidebar Navigation

The sidebar should remain visible throughout the application.

Navigation Items:

Dashboard
Projects
Timeline
Reports
Data Refresh
Dataset History
Settings

The sidebar should support collapsing to icons only.

Top Navigation

The top navigation should contain:

Current page title
Global search
Last synchronization timestamp
Refresh button
Upload Excel URL button
User profile/avatar

Example:

Dashboard

Search ______________________

Last Sync:
5 minutes ago

[Refresh]

[Upload Excel URL]

(User)
Dashboard

The dashboard should immediately answer the most important operational questions.

KPI Cards

Display four summary cards across the top.

Examples:

Total Projects
Pending Projects
Assigned Projects
Late Projects

Each card should contain:

Large number
Label
Small trend indicator
Optional comparison with previous dataset

Example:

Projects

234

+12 since yesterday
Project Distribution

Pie chart showing:

PIE
IMO
Standard
Lifecycle
Sunset
Status Overview

Bar chart displaying:

Assigned
Pending
Delayed
Completed
Upcoming Pilot Dates

A compact table showing projects approaching Pilot milestones.

Columns:

Project Name
Owner
Pilot Date
Days Remaining
Status
Recent Dataset Changes

Display recent updates after ingestion.

Example columns:

Time
Project
Change Type
User/System
Scheduler Status

Display scheduler health.

Example:

Last Refresh

2:03 AM

Next Refresh

Tomorrow
2:00 AM

Status

Healthy
Projects Page

This is expected to be the primary working page.

The layout should resemble an improved version of Excel.

Search

Global search bar.

Search by:

Project Name
Project ID
Owner
Business Unit
Filters

Visible at all times.

Recommended filters:

Status
Owner
Project Type
Lifecycle
Business Unit
Date Range
Data Table

Columns:

Project Name
Project ID
Owner
Business Unit
Project Type
Lifecycle
Pilot Date
GA Date
Status
Last Updated

Features:

Sorting
Pagination
Column resizing
Column visibility
Multi-column filtering
Sticky headers
Export current view
Project Details Drawer

Selecting a project should open a right-side drawer instead of navigating away.

Display:

General Information

Project Name
Project ID
Business Unit
Project Owner

Commercialization

Pilot Date
GA Date
Lifecycle
Current Gate

Status

Current Status
Last Updated

Additional Information

Comments
Historical Changes
Timeline Page

The Timeline page focuses on scheduling.

Main component:

Interactive Gantt Chart

Filters
Project Type
Owner
Quarter
Lifecycle
Status
Gantt Chart

Each row represents one project.

Timeline displays:

Pilot Date
GA Date

Hovering should display:

Project Name
Owner
Pilot Date
GA Date
Status
Reports Page

Purpose:

Executive reporting.

Report cards:

Project Health
Upcoming Pilot Dates
Upcoming GA Dates
Missing Dates
Lifecycle Distribution
Resource Allocation

Future export buttons:

Export PDF
Export PowerPoint
Export Excel
Data Refresh Page

Purpose:

Manual ingestion.

Top Section

Excel URL input

____________________________________

[Validate]

[Start Import]
Current Dataset

Display

Dataset Version
Upload Time
Source File
Previous Dataset

Display

Version
Upload Time
Import Progress

Display pipeline status.

Example:

Downloading

██████████

Parsing

███████

Validating

██████████

Saving

████████

Completed

✓
Import Log

Display chronological events.

Example:

10:02 Downloading

10:03 Parsing

10:04 Validating

10:05 Saving

10:06 Complete
Dataset History

Purpose:

Browse historical imports.

Display versions.

Each version should contain:

Version Number
Upload Date
Number of Changes

Buttons:

View
Compare
Dataset Comparison

When comparing datasets display:

Summary

Added Projects

+12

Removed Projects

-3

Modified Projects

19

Detailed table:

Project
Field Changed
Previous Value
New Value
Data Quality Widget

Dashboard widget displaying import quality.

Example:

Data Quality

98.7% Complete

Missing Pilot Dates: 6

Missing GA Dates: 2

Duplicate IDs: 0

Import Errors: 1
Color Palette

Background

#F5F7FA

Cards

White

Primary

Blue

Success

Green

Warning

Amber

Error

Red

Text

Dark Gray

Use color only where it communicates information.

Typography

Use a clean enterprise font.

Recommended:

Inter
Segoe UI
IBM Plex Sans

Hierarchy:

Page Title

32px

Section Title

24px

Card Title

16px

Body

14px

Table

13px

Icons

Use a consistent icon set.

Recommended:

Lucide
Heroicons
Fluent UI Icons
Spacing

Use an 8px spacing system.

Examples:

8px between related elements
16px between cards
24px between sections
32px page padding
UX Improvements

The application should include:

Sticky table headers
Sticky filter bar
Remember last-used filters
Global search
Keyboard shortcuts
Loading skeletons
Empty states
Error states
Tooltips
Status badges
CSV export
Excel export
Last refresh timestamp
Source filename display
Overdue date highlighting
Responsive side drawers
Recommended Frontend Stack
React
TypeScript
Tailwind CSS
shadcn/ui
TanStack Table
Recharts (or Apache ECharts)
React Query (TanStack Query)
React Router
Framer Motion (subtle animations only)
Complete Navigation Structure
Dashboard
├── KPI Cards
├── Project Distribution
├── Status Overview
├── Upcoming Pilot Dates
├── Recent Dataset Changes
└── Scheduler Status

Projects
├── Search
├── Filters
├── Project Table
└── Project Details Drawer

Timeline
├── Filters
└── Interactive Gantt Chart

Reports
├── Executive Summary
├── Health Metrics
├── Upcoming Milestones
└── Export Options

Data Refresh
├── Excel URL Submission
├── Dataset Information
├── Pipeline Progress
└── Import Log

Dataset History
├── Version List
├── Dataset Comparison
└── Change History

Settings
├── Scheduler Configuration
├── User Preferences
└── System Information

This design emphasizes a professional, enterprise-grade experience tailored to Velera's CRE/CRM teams, with a focus on rapid access to project data, operational visibility, and efficient day-to-day workflows.