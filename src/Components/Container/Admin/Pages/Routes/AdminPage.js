import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../global/LoginContext";
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
export const AdminPage = () => {
  const [theme, colorMode] = useMode("light");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ErrorMessage/>
      <UserProvider >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes> 
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage employee" element={<ManageEmployee/>} />
              <Route path="/department" element={<Department/>} />
              <Route path="/role" element={<Role/>} />
              <Route path="/leave" element={<LeaveAdmin/>} />
              <Route path="/register" element={<Form />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </UserProvider>
    </ColorModeContext.Provider>
  );
};
