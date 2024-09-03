import "./App.css";
import Dashboard from "../src/components/pages/dashboard";
import Login from "./components/pages/login";
import { Routes, Route, useLocation } from "react-router-dom";
import LeftNav from "./components/LeftNav";
import AddProject from "./components/pages/addProject";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectList from "./components/pages/projectList";

// Component to handle the layout based on routes
const AppLayout = () => {
  const location = useLocation();

  // Define routes where the LeftNav should not appear
  const hideNavRoutes = ["/"];

  // Check if the current path matches the routes where nav should be hidden
  const shouldHideNav = hideNavRoutes.includes(location.pathname);
  const getBackgroundClass = () => {
    switch (location.pathname) {
      case "/":
        return "bg-home"; // Home page background
      case "/dashboard":
        return "bg-dashboard"; // Dashboard background
      case "/project-list":
        return "bg-dashboard"; // Project List background
      case "/add-project":
        return "bg-dashboard"; // Add Project background
      default:
        return "bg-dashboard"; // Default background for any other route
    }
  };
  return (
    <>
      <div className="d-flex">
        {!shouldHideNav && <LeftNav />} {/* Conditionally render LeftNav */}
        <div className={`flex-grow-1 p-3 ${getBackgroundClass()}`}>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />

            {/* Protected Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-project"
              element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-list"
              element={
                <ProtectedRoute>
                  <ProjectList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

// Main App component
function App() {
  return (
    <>
      <AppLayout />
    </>
  );
}

export default App;
