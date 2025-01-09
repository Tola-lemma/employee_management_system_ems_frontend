import { Accordion, AccordionSummary, Badge, Box, IconButton, Typography, useTheme, Button, AccordionDetails, Modal } from "@mui/material";
import { useContext, useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "./LoginContext";
import { ExpandMore, Notifications, Settings } from "@mui/icons-material";
import { useGetNotificationsQuery,useMarkNotificationAsReadMutation } from "../../../../Features/Notifications";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useContext(AuthContext)
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);
    let employee_id = decoded.employee_id;
    const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); 
  const {data:notifications, refetch} = useGetNotificationsQuery(employee_id);
const [markAsRead] = useMarkNotificationAsReadMutation()
const handleMarkAsRead = async (notificationId) => {
  try {
    await markAsRead(notificationId).unwrap();
    refetch(); // Refresh notifications
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Separate notifications into new and previous based on is_read
  const newNotifications = notifications?.filter((n) => !n.is_read) || [];
  const previousNotifications = notifications?.filter((n) => n.is_read) || [];

  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* ICONS */}
      <Box display="flex">
      <IconButton onClick={handleModalOpen}>
        <Badge badgeContent={newNotifications.length} color="error">
          <Notifications />
        </Badge>
      </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => logout()}>
          <LogoutIcon />
        </IconButton>
      </Box>
        {/* Notification Modal */}
        <Modal open={modalOpen} onClose={handleModalClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box
          sx={{
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notifications
          </Typography>

          {/* New Notifications */}
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            New Messages
          </Typography>
          {newNotifications.length > 0 ? (
            newNotifications.map((notification, index) => (
              <Accordion
                key={notification.notification_id}
                expanded={expanded === `new-${index}`}
                onChange={handleAccordionToggle(`new-${index}`)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{notification.type}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography dangerouslySetInnerHTML={{ __html: notification.message }}/>
                  <Button variant="outlined" color="primary" sx={{ mt: 1 }} 
                 onClick={() => handleMarkAsRead(notification.notification_id)}
                  >
                    Mark as Read
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No new messages.</Typography>
          )}

          {/* Previous Notifications */}
          <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
            Previous Messages
          </Typography>
          {previousNotifications.length > 0 ? (
            previousNotifications.map((notification, index) => (
              <Accordion
                key={notification.notification_id}
                expanded={expanded === `prev-${index}`}
                onChange={handleAccordionToggle(`prev-${index}`)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{notification.type}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography dangerouslySetInnerHTML={{ __html: notification.message }}/>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No previous messages.</Typography>
          )}

          {/* Close Button */}
          <Button variant="contained" color="secondary" onClick={handleModalClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
