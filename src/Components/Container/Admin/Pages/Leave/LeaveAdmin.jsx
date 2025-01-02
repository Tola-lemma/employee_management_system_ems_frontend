import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Paper,
  Divider,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PieChartIcon from "@mui/icons-material/PieChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Header } from '../../components/Header.jsx';
import CustomButton from "../global/Button.jsx";
import { ResponsivePie } from '@nivo/pie';
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";
import './calendar.css'
const LeaveAdmin = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "Tola Naty", 
    leaveType: "",
    fromDate: "",
    toDate: "",
    amountInDays: 0,
    reason: "",
  });

  const leaveTypes = [
    "Annual Leave",
    "Wedding Leave",
    "Paternity Leave",
    "Mourning Leave",
    "Sick Leave",
    "Emergency Leave",
    "Prematernity Leave",
    "Post Maternity Leave",
    "Special Purpose Leave",
    "Unpaid Leave",
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
  
    // Recalculate leave days if both dates are valid
    if (name === "fromDate" || name === "toDate") {
      const { fromDate, toDate } = updatedValues;
      if (fromDate && toDate) {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        if (start <= end) {
          const leaveDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
          updatedValues.amountInDays = leaveDays;
        } else {
          updatedValues.amountInDays = 0; // Reset if the range is invalid
        }
      } else {
        updatedValues.amountInDays = 0; // Reset if one of the dates is missing
      }
    }
  
    setFormValues(updatedValues);
  };
  

  const handleSubmit = () => {
    // Add new leave to the leaveData state
    setLeaveData([...leaveData, { ...formValues, status: "Pending" }]);
    setOpenRequestModal(false);
  };
  //pie chart
  const totalLeaves = 20;
  const leavesTaken = 5;
  const remainingLeaves = totalLeaves - leavesTaken;

  const pieChartData = [
    { id: "Taken", label: "Taken", value: leavesTaken, color: "hsl(220, 70%, 50%)" },
    { id: "Remaining", label: "Remaining", value: remainingLeaves, color: "hsl(120, 70%, 50%)" },
  ];
  //calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "leaveType", headerName: "Leave Type", width: 200 },
    { field: "fromDate", headerName: "From Date", width: 150 },
    { field: "toDate", headerName: "To Date", width: 150 },
    { field: "amountInDays", headerName: "Days", width: 100 },
    { field: "reason", headerName: "Reason", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <Box m="20px">
      <Header
        title="Leave System"
        subtitle="Apply and Manage your leaves here"
      />
      <Typography variant="h3" gutterBottom>
        Leave Management System
      </Typography>

      {/* Overview Section */}
      {/* Overview Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Paper elevation={3} sx={{ padding: 3, width: "48%" }}>
          <Typography variant="h6">Overview</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>
            Your Total Leaves: <strong>20</strong>
          </Typography>
          <Typography>
            Leaves Taken: <strong>5</strong>
          </Typography>
          <Typography>
            Remaining Leaves: <strong>15</strong>
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, width: "48%" }}>
          <Typography variant="h6">Quick Actions</Typography>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenRequestModal(true)}
            sx={{ mb: 2, width: "100%" }}
          >
            Request Leave
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenStatusModal(true)}
            sx={{ width: "100%" }}
          >
            Leave Status
          </Button>
        </Paper>
      </Box>

      {/* Additional Info Section */}
      <Grid container spacing={3}>
        <Grid item xs={4} size={6}>
          <Card elevation={2}>
            <CardContent>
              <Tooltip title="View Leave Utilization Chart">
                <Box display="flex" alignItems="center" gap={2}>
                  <PieChartIcon fontSize="large" color="primary" />
                  <Typography variant="h6">
                    Leave Utilization (Pie Chart)
                  </Typography>
                </Box>
                <Box mb={2} sx={{ width: "100%", height: 250 }}>
                  <ResponsivePie
                    data={pieChartData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ datum: "data.color" }}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 2]],
                    }}
                  />
                </Box>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
        {/* calendar */}
        <Grid item xs={4} size={6}>
          <Card elevation={2}>
            <CardContent>
              <Tooltip title="Check Leave Calendar">
                <Box display="flex" alignItems="center" gap={2}>
                  <CalendarTodayIcon fontSize="large" color="secondary" />
                  <Typography variant="h6">Leave Calendar</Typography>
                </Box>
                <Box mb={3}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      // p: 4,
                      borderRadius: 2,
                      height: "100%", // Make it responsive to parent height
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      tileClassName={({ date }) => {
                        // Example: Highlight specific dates based on conditions
                        const leaveDates = ["2025-01-10", "2025-01-15"];
                        if (
                          leaveDates.includes(date.toISOString().split("T")[0])
                        ) {
                          return "highlight";
                        }
                      }}
                        className="custom-calendar"
                    />
                    <Typography mt={1}>
                      Selected Date: {selectedDate.toDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Request Leave Modal */}
      <Modal open={openRequestModal} onClose={() => setOpenRequestModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Header title="Request Leave" subtitle="request your leaves here" />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={formValues.name}
            InputProps={{ readOnly: true }}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Leave Type"
            name="leaveType"
            value={formValues.leaveType}
            onChange={handleFormChange}
          >
            {leaveTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            fullWidth
            margin="normal"
            label="From Date"
            name="fromDate"
            InputLabelProps={{ shrink: true }}
            value={formValues.fromDate}
            onChange={handleFormChange}
          />
          <TextField
            type="date"
            fullWidth
            margin="normal"
            label="To Date"
            name="toDate"
            InputLabelProps={{ shrink: true }}
            value={formValues.toDate}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Amount in Days"
            name="amountInDays"
            value={formValues.amountInDays}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Reason (Optional)"
            name="reason"
            value={formValues.reason}
            onChange={handleFormChange}
          />
          <Box mt={2}>
            <CustomButton
              type="submit"
              onClick={handleSubmit}
              className="loginbtn btn btn-primary"
            >
              {" "}
              Submit
            </CustomButton>
          </Box>
        </Box>
      </Modal>

      {/* Leave Status Modal */}
      <Modal open={openStatusModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: "85%",
            maxHeight: "85%",
            overflowY: "auto",
          }}
        >
          <Header title="Leave Status" subtitle="Manage Leave Status Here" />
          <Box display="flex" justifyContent={"flex-end"} mb={2}>
            <span></span>
            <Button
              onClick={() => setOpenStatusModal(false)}
              color="error"
              variant="contained"
            >
              Close
            </Button>
          </Box>
          <DataGrid
            rows={leaveData}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default LeaveAdmin;
