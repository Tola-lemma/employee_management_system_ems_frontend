import {useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css" ;
import { tokens } from "../../theme";
import { HomeOutlined, PeopleOutlined, Security ,CalendarTodayOutlined,ContactsOutlined,  MenuOutlined,  DisplaySettings, HowToReg, DeviceHub  } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
export const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  // const { user } = useContext(UserContext);
  return (
    <Box
    height="760px"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: `${colors.primary[13]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* {user.role === 'admin' && user.username} */}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[200]}>
                  EMS Admin
                </Typography>
              </Box>
            </Box>
          )}
          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Employee"
              to="/home/manage employee"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/home/contacts"
              icon={<ContactsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Department"
              to="/home/department"
              icon={<DeviceHub />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Role"
              to="/home/role"
              icon={<Security />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Employee Registration"
              to="/home/register"
              icon={<HowToReg />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="task"
              to="/home/task"
              icon={<DisplaySettings />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/home/calendar"
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
