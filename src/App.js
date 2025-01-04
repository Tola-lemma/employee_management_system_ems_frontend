import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "./Components/Container/Admin/Pages/PageNotFound/PageNotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Components/Container/Admin/theme";
import { AuthProvider } from "./Components/Container/Admin/Pages/global/LoginContext";
import { ErrorProvider } from "./Components/Container/Admin/ToastErrorPage/ErrorContext";
import { AdminPage } from "./Components/Container/Admin/Pages/Routes/AdminPage";
import {ProtectedRoute} from "./ProtectedRoute";     
import { LoginPage } from "./Components/Container/Admin/LoginPage/LoginPage";
import { ChangePassword } from "./Components/Container/Admin/LoginPage/ChangePassword";
export const App = () => {
  const [theme, colorMode] = useMode("light");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthProvider>
      <ErrorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/change_password/:token" element={<ChangePassword />} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/home/*" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
      </ErrorProvider>
      </AuthProvider>
    </ColorModeContext.Provider>
  );
};