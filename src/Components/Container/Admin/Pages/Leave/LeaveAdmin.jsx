import React, { useContext, useMemo, useState } from "react";
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
  useTheme,
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
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { useGetAllEmployeesQuery, useGetEmployeeQuery } from "../../../../Features/Employee.jsx";
import { useCreateLeaveRequestMutation, useGetLeaveRequestsQuery, useUpdateLeaveRequestMutation } from "../../../../Features/Leave.jsx";
import { tokens } from "../../theme.js";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext.jsx";
import DataGridSkeleton from "../../components/Skeleton.jsx";
import EditLeaveModal from "./EditModal.jsx";
const LeaveAdmin = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  // const [leaveData, setLeaveData] = useState([]);
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const fullName = decoded.fullname || ""
  const employee_id = decoded.employee_id;
  const { data: employeeData,refetch:employeRefetch} = useGetEmployeeQuery(employee_id);
  const { data: leaveData, isLoading, refetch,error } = useGetLeaveRequestsQuery();
  const [createLeaveRequest] = useCreateLeaveRequestMutation();
  const [updateLeave] = useUpdateLeaveRequestMutation();
   const { data } = useGetAllEmployeesQuery();
  const {showSuccess , showError} = useContext(ErrorContext)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
      let role;
      try {
        if (token) {
          const decoded = jwtDecode(token);
          role = decoded.role;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
      const EmployeeDataRecords = !isLoading && !error && Array.isArray(leaveData)
      ? leaveData.filter((record) => record.name?.toLowerCase() === fullName.toLowerCase())
      : [];

    const { department = "" } = employeeData || {};
   const loggedInUser = {
      department: department, 
    };
  
    // Filter employees based on logged-in user's department and role
    const filteredLeaveData =
    leaveData?.filter(
      (leave) =>
        data?.some(
          (employee) =>
            employee.department === loggedInUser.department && // Match department
            employee.role === "employee" && // Ensure the role is "employee"
            `${employee.first_name} ${employee.last_name}` === leave.name // Match the leave request with employee
        )
    ) || [];

  const { remaining_leave = 20, total_leave = 20 } = employeeData || {};
  const [modalState, setModalState] = useState({
    action: null,
    open: false,
    leave: null,
  });
  const [formValues, setFormValues] = useState({
    name: fullName, 
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
  

  const handleSubmit = async () => {
    try {
      const result = await createLeaveRequest({
        employee_id,
        start_date: formValues.fromDate,
        end_date: formValues.toDate,
        reason: formValues.leaveType,
      }).unwrap();
  if(result?.result){
    showSuccess(result?.message)
    refetch(); 
    employeRefetch()
    setOpenRequestModal(false);
  }
  else{
    showError("Error While requesting Leave.....")
  }
    } catch (error) {
      console.error("Failed to create leave request:", error);
    }
  };
  //pie chart
  const leavesTaken = total_leave - remaining_leave ;
  const pieChartData = [
    { id: "Taken", label: "Taken", value: leavesTaken, color: "hsl(220, 70%, 50%)" },
    { id: "Remaining", label: "Remaining", value: remaining_leave, color: "hsl(120, 70%, 50%)" },
  ];
  //calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate an array of all leave dates
  const leaveDates = useMemo(() => {
    if (!leaveData) return [];
    return leaveData.flatMap(({ start_date, end_date }) => {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const dates = [];

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toISOString().split("T")[0]); // Format as "yyyy-MM-dd"
      }
      return dates;
    });
  }, [leaveData]);

  // Add a highlight class to dates that are in the leaveDates array
  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (leaveDates.includes(formattedDate)) {
      return "highlight"; 
    }
    return null;
  };
    // Handle status updates
    const handleStatusChange = async (params, status) => {
      try {
        await updateLeave({
          leave_id: params,
          status,
        }).unwrap();
        showSuccess(`Leave request updated to ${status}`);
        refetch()
      } catch (error) {
        console.error("Error updating leave status:", error);
        showError("Failed to update leave request status." );
      }
    };
  const columns = [
    { field: "name", headerName: "Employee Name", width: 110 },
    { field: "reason", headerName: "Leave Type", width: 120 },
    { field: "start_date", headerName: "From Date", width: 90 },
    { field: "end_date", headerName: "To Date", width: 90 },
    { field: "created_at", headerName: "Request Day", width: 90 },
    { field: "amountInDays", headerName: "Leave Days", width: 90,
      renderCell: (params) => {
        const startDate = new Date(params.row.start_date);
        const endDate = new Date(params.row.end_date);
        
        // Ensure the dates are valid
        if (!isNaN(startDate) && !isNaN(endDate)) {
          const diffInTime = endDate - startDate; // Difference in milliseconds
          const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1; // Convert to days
          return diffInDays;
        }
        return "Invalid Dates"; 
      },
     },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 290,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px",justifyContent: "center" }}>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => handleModalOpen("Edit", params.row)}
          >
            Edit
          </button>
         {(role!=='attendance_taker' && role!=='employee')&&<button
            type="button"
            className="btn btn-primary"
            disabled={params?.row.status === "Approved" || params?.row.status === "Rejected"}
            onClick={() => handleStatusChange(params.row.leave_id,"Approved")}
          >
            {(params?.row.status === "Approved")?"Approved":"Approve"}
          </button>}
          {(role!=='attendance_taker' && role!=='employee')&& <button
           type="button"
           className="btn btn-danger"
           disabled={params?.row.status === "Rejected" || params?.row.status === "Approved"}
           onClick={() => handleStatusChange(params.row.leave_id,"Rejected")}
          >
           {(params?.row.status === "Rejected")? "Rejected":"Decline"}
          </button>}
        </div>
      ),
    },
  ];

  //Edite Leave
  const handleModalOpen = (action, leave) => {
    setModalState({ action, open: true, leave });
  };
  const handleModalClose = () => {
    setModalState({ action: null, open: false, role: null });
  };
  const handleEdit = async (updatedLeave) => {
    try {
      const result = await updateLeave(updatedLeave)
      if(result?.data?.success){
        showSuccess(result?.data.message)
        refetch()
        employeRefetch()
      }
      else if(result?.error?.status===500){
        showError(result?.error?.data?.message)
      }
      else{
        showError('Error while Updating Leave request')
      }
    } catch (error) {
      showError('Error While Updating Leave',error?.data?.err )
    }
  }
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
            Your Total Leaves: <strong>{total_leave}</strong>
          </Typography>
          <Typography>
            Leaves Taken: <strong>{total_leave - remaining_leave}</strong>
          </Typography>
          <Typography>
            Remaining Leaves: <strong>{remaining_leave}</strong>
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
                     tileClassName={tileClassName} 
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
      {/* edit modal  */}
      {modalState.action === 'Edit' && (
        <EditLeaveModal
          open={modalState.open}
          onClose={handleModalClose}
          leave={modalState.leave}
          leaveTypes={leaveTypes}
          onEdit={handleEdit}
        />
      )}
      {/* Request Leave Modal */}
      <Modal open={openRequestModal} onClose={() => setOpenRequestModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
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
    {isLoading?<DataGridSkeleton/>:  <Modal open={openStatusModal}>
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
          <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    "& .css-15n4jlm-MuiDataGrid-root .MuiDataGrid-container--top, .css-15n4jlm-MuiDataGrid-root .MuiDataGrid-container--bottom":
                      {
                        backgroundColor: "red",
                        color: "black",
                        fontSize: "1rem",
                        borderBottom: "none",
                      },
                    "& .css-15n4jlm-MuiDataGrid-root": {
                      backgroundColor: "burlywood",
                      color: "black",
                    },
                    "& .css-1knaqv7-MuiButtonBase-root-MuiButton-root": {
                      color: "black",
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: `${colors.primary[12]}`,
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: `${colors.greenAccent[700]}`,
                    },
                    "& .MuiDataGrid-toolbarContainer > button,.css-128fb87-MuiDataGrid-toolbarContainer > button": {
                      borderTop: "none",
                      color:`${colors.grey[100]}`,
                    },
                  }}
                >
                  <DataGrid
                    rows={
                      role === "attendance_taker" || role === "employee"
                            ? EmployeeDataRecords
                            : role === "manager"
                            ? filteredLeaveData
                            : leaveData 
                     }
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowId={(row) => row.leave_id} // Ensure the `id` field is used as the unique row identifier
                    slots={{
                      toolbar: GridToolbar ,
                    }}
                  />
                </Box>
        </Box>
      </Modal>
      }
    </Box>
  );
};

export default LeaveAdmin;
