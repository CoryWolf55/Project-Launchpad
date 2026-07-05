import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { DataRefreshPage } from "./pages/DataRefreshPage";
import { DatasetHistoryPage } from "./pages/DatasetHistoryPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TimelinePage } from "./pages/TimelinePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "timeline", element: <TimelinePage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "refresh", element: <DataRefreshPage /> },
      { path: "history", element: <DatasetHistoryPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
