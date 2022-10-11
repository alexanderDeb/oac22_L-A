import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ROUTES PROTECTION
import PrivateRoutes from "./private_routes";
import OtherProtectedRoutes from "./other_routes";

// VIEWS - COMPONENTS
import LoginPage from "../pages/login/login_page";
import HomePage from "../pages/home_page/home_page";
import Dashboard from "../pages/dashboard/main_page/dashboard_main_page";
import ProfilePage from "../pages/profile/profile_page";
import NodeMapPage from "../pages/dashboard/node_maps/node_map_page";
import UserListPage from "../pages/dashboard/users/user_list/user_list_page";
import ReportPage from "../pages/dashboard/report_page/report_page";
import NodeDetailPage from "../pages/dashboard/node_detail/node_detail_page";
import UserCreate from "../pages/dashboard/users/user_create/user_create_page";
import UserRolesCreate from "../pages/dashboard/users/user_roles/user_roles_create";
import NodeListPage from "../pages/dashboard/node_list/node_list_page";

export default function Navigation() {
  return (
    <Router>
      <Routes>
        {/* ROOT ROUTE */}
        <Route exact path="/" element={<HomePage />} />
        {/* HOME ROUTE */}
        <Route exact path="/home" element={<HomePage />} />
        {/* RUTAS EXCLUIDAS SI EL USUARIO SI ESTA AUTENTICADO */}
        <Route element={<OtherProtectedRoutes />}>
          <Route exact path="/login" element={<LoginPage />} />
        </Route>

        {/* RUTAS EXCLUIDAS SI EL USUARIO NO ESTA AUTENTICADO */}
        <Route element={<PrivateRoutes />}>
          <Route exact path="/dashboard/home" element={<Dashboard />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          {/* USERS */}
          <Route exact path="/dashboard/users/list" element={<UserListPage />} />
          <Route exact path="/dashboard/users/create" element={<UserCreate />} />
          <Route exact path="/dashboard/users/groups" element={<UserRolesCreate/>}/>

          {/* NODES */}
          <Route exact path="/dashboard/nodes/map" element={<NodeMapPage />} />
          <Route exact path="/dashboard/nodes/list" element={<NodeListPage />} />
          <Route
            exact
            path="dashboard/node/:deviceId"
            element={<NodeDetailPage />}
          />

          {/* REPORTS */}
          <Route exact path="/dashboard/reports" element={<ReportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
