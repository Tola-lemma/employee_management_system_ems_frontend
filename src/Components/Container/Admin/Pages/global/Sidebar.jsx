import {useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Badge, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css" ;
import { tokens } from "../../theme";
import { HomeOutlined,Info, PeopleOutlined, DirectionsRun, Security ,CalendarTodayOutlined, MenuOutlined,  DisplaySettings, HowToReg, DeviceHub, Notifications, Games, Login  } from "@mui/icons-material";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useGetEmployeeQuery } from "../../../../Features/Employee";
import { useGetTasksQuery } from "../../../../Features/Task";
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
  const token = Cookies.get('token');
  let employee_id;

  let role;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      role = decoded.role;
      employee_id = decoded.employee_id;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  const { data: employeeData,refetch} = useGetEmployeeQuery(employee_id);
  const { profile_picture = "", first_name = "", last_name = "" } = employeeData || {};
  const { data: tasks} = useGetTasksQuery();
  // Count pending tasks for the specific employee
  const pendingTasks = tasks?.filter(
    (task) => task.employee_id === employee_id && task.status === "pending"
  ).length;
  return (
    <Box
    height="900px"
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
            onClick={() => {setIsCollapsed(!isCollapsed); refetch()}}
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
                  EMS 
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
              <Zoom>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profile_picture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  onClick={()=>refetch()}
                /> 
              </Zoom>             
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
                {first_name? (first_name +" "+ last_name) : 'EMS User'} 
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
            {role === 'admin' && <Item
              title="Manage Employee"
              to="/home/manage employee"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />}
            {role === 'manager' && <Item
              title="My Supervision"
              to="/home/employee under my supervision"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />}
           {(role === 'admin' || role === 'manager') &&  <Item
              title="Department"
              to="/home/department"
              icon={<DeviceHub />}
              selected={selected}
              setSelected={setSelected}
            />}
            {(role === 'admin') &&  <Item
              title="Role"
              to="/home/role"
              icon={<Security />}
              selected={selected}
              setSelected={setSelected}
            />}
            {(role === 'admin' || role === 'manager') &&  <Item
              title="Push Notification"
              to="/home/notification"
              icon={<Notifications />}
              selected={selected}
              setSelected={setSelected}
            />}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {role === 'admin'&&   <Item
              title="Employee Registration"
              to="/home/register"
              icon={<HowToReg />}
              selected={selected}
              setSelected={setSelected}
            />}
            {(role === 'admin' || role === 'manager' ||role==='employee') &&<Item
              title="Performance"
              to="/home/performance"
              icon={<DirectionsRun />}
              selected={selected}
              setSelected={setSelected}
            />}
             <Item
              title="Leave"
              to="/home/leave"
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
             {(role === 'admin' || role === 'attendance_taker') && <Item
              title="Attendace"
              to="/home/attendance"
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
            />}
             <Item
              title="Attendance V2"
              to="/home/attendanceV2"
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Task"
              to="/home/task management"
              icon={ <Badge badgeContent={pendingTasks} color="error" overlap="circular"><DisplaySettings /></Badge>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Gamifications"
              to="/home/gamification"
              icon={<Games />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="User Logging"
              to="/home/underconstraction"
              icon={<Login />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="About Me"
              to="/home/about"
              icon={<Info />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
