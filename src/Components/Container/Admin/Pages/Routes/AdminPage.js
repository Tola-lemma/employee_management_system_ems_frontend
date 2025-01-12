import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Sidebar } from "../global/Sidebar";
import { Form } from "../form/Form";
import { Dashboard } from "../Dashboard/Dashboard";
import { Topbar } from "../global/Topbar";
import { ColorModeContext,useMode } from "../../theme";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
import ManageEmployee from "../Employee/ManageEmployee";
import Department from "../Department/Department";
import Role from "../Role/Role";
import LeaveAdmin from "../Leave/LeaveAdmin";
import AttendanceSystem from "../Attendance/Attendance";
import { AuthProvider } from "../global/LoginContext";
import Performance from "../Performance/Performance";
import NotificationForm from "../Notification/Notifications";
import Unauthorized from "../global/Unauthorized";
import ProtectedInternalRoute from "../global/ProtectInternalRoute";
import ManageEmployeeByDepartment from "../Employee/ManageEmployeeByDepartment";
import { Underconstruction } from "../global/Underconstruction";
import TaskManagement from "../Task/TaskManagement";
export const AdminPage = () => {
  const [theme, colorMode] = useMode("light");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ErrorMessage/>
      <AuthProvider >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes> 
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage employee" element={
                <ProtectedInternalRoute allowedRoles={['admin']}>
                    <ManageEmployee />
               </ProtectedInternalRoute>} />
              <Route path="/employee under my supervision" element={
                <ProtectedInternalRoute allowedRoles={['manager']}>
                    <ManageEmployeeByDepartment />
               </ProtectedInternalRoute>} />
              <Route path="/department" element={
                <ProtectedInternalRoute allowedRoles={['admin','manager']}>
                        <Department/>
                </ProtectedInternalRoute>
                } />
              <Route path="/role" element={
                <ProtectedInternalRoute allowedRoles={['admin']}>
                   <Role/>
                </ProtectedInternalRoute>
                } />
              <Route path="/leave" element={<LeaveAdmin/>} />
              <Route path="/attendance" element={
                 <ProtectedInternalRoute allowedRoles={['admin','attendance_taker']}>
                     <AttendanceSystem/>
                </ProtectedInternalRoute>} />
              <Route path="/performance" element={
                 <ProtectedInternalRoute allowedRoles={['admin','manager','employee']}>
                   <Performance/>
                </ProtectedInternalRoute>} />
              <Route path="/notification" element={
                <ProtectedInternalRoute allowedRoles={['admin','manager']}>
                <NotificationForm/>
                </ProtectedInternalRoute>} />
              <Route path="/register" element={
                <ProtectedInternalRoute allowedRoles={['admin']}>
                    <Form />
               </ProtectedInternalRoute>} />
              <Route path="/task management" element={<TaskManagement/>} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/underconstraction" element={<Underconstruction />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </AuthProvider>
    </ColorModeContext.Provider>
  );
};
