
import { CircularProgress, Box, Typography } from "@mui/material";
const containerStyle = {
      position: "fixed",
      zIndex: 10000,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    };
    
    export const LoadingPage = () => {
      return (
        <Box style={containerStyle}>
          <Box
            sx={{
              display: "flex",
              fontFamily: "Campton",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CircularProgress />
    
            <Box sx={{ ml: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Campton",
                  letterSpacing: "1px",
                  // color: colors.background.tertiary
                }}
              >
                EMPLOYEE MANAGEMENT SYSTEM (EMS)
              </Typography>
              <Typography
                fontFamily="Campton"
                variant="p"
                sx={{ mt: 1 }}
              >
                Hold on, We are preparing your content...
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    };