import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "./Components/Container/Admin/Pages/PageNotFound/PageNotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Components/Container/Admin/theme";
import { UserProvider } from "./Components/Container/Admin/Pages/global/LoginContext";
import { ErrorProvider } from "./Components/Container/Admin/ToastErrorPage/ErrorContext";
import { AdminPage } from "./Components/Container/Admin/Pages/Routes/AdminPage";
// import {ProtectedRoute} from "./ProtectedRoute";     
import { LoginPage } from "./Components/Container/Admin/LoginPage/LoginPage";
export const App = () => {
  const [theme, colorMode] = useMode("light");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <UserProvider>
      <ErrorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route element={<ProtectedRoute/>}> */}
          <Route path="/home/*" element={<AdminPage />} />
          {/* </Route> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
      </ErrorProvider>
      </UserProvider>
    </ColorModeContext.Provider>
  );
};