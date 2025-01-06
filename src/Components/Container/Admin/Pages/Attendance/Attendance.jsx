import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetAllEmployeesQuery } from "../../../../Features/Employee";
import AttendanceSkeleton from "./AttendanceSkeleton";
import { tokens } from "../../theme";
import { Header } from "../../components/Header";
import AttendanceData from "./AttendanceData";
import { useCreateAttendanceMutation,useGetAttendanceQuery } from "../../../../Features/Attendance";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";

const AttendanceSystem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {showSuccess,showError}= useContext(ErrorContext)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [createAttendance]=useCreateAttendanceMutation()
  const {data: attendanceData,refetch}=useGetAttendanceQuery()
  const [modalState, setModalState] = useState({
    open: false,
  });

  const handleModalOpen = () => {
    setModalState({  open: true });
  };

  const handleModalClose = () => {
    setModalState({ open: false });
  };
  const [attendance, setAttendance] = useState({});
  const {
    data: employees,
    isLoading,
    error,
//     refetch,
  } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (employees && attendanceData) {
      const initialAttendance = employees.reduce((acc, employee) => {
        acc[employee.employee_id] = Array(daysInMonth).fill(false);
        attendanceData.forEach((record) => {
          const recordDate = new Date(record.date);
          if (
            record.employee_id === employee.employee_id &&
            recordDate.getMonth() === selectedDate.getMonth() &&
            recordDate.getFullYear() === selectedDate.getFullYear()
          ) {
            acc[employee.employee_id][recordDate.getDate()] = record.status === "present";
          }
        });
        return acc;
      }, {});
      setAttendance(initialAttendance);
    }
  }, [employees, attendanceData, selectedDate]);
  
  const formatTime12Hour = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero to minutes
    return `${hours}:${formattedMinutes} ${ampm}`;
  };
  const handleCheckboxChange = async (employeeId, dayIndex,isChecked) => {
    const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const date = new Date(year, month, dayIndex + 1); // Calculate the exact date

  const status = isChecked ? "present" : "absent";
  const formattedDate = date.toISOString().split("T")[0];
  try {
    let checkInTime = null;
    let checkOutTime = null;

    if (isChecked) {
      const now = new Date();
      checkInTime = formatTime12Hour(now); // Format time as 12-hour
      const checkOutDate = new Date(now.getTime() + 8 * 60 * 60 * 1000); // Add 8 hours to current time
      checkOutTime = formatTime12Hour(checkOutDate); // Format time as 12-hour
    }
    const payload = {
      employee_id: employeeId,
      date: formattedDate,
      status: status,
      check_in_time:  checkInTime,
      check_out_time:  checkOutTime,
    };
    const response = await createAttendance(payload).unwrap();
    if(response?.result){
      showSuccess(response?.result?.status)
      refetch()
      setAttendance((prev) => ({
        ...prev,
        [employeeId]: prev[employeeId]?.map((currentStatus, index) =>
          index === dayIndex ? isChecked : currentStatus
        ),
      }));
    }
  } catch (error) {
    showError('Error taking Attendance')
    console.error("Error updating attendance:", error);
  }

  };

  const getDayOfWeek = (day) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return new Date(year, month, day).getDay();
  };

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <Box m={2}>
      <AttendanceData
       open={modalState.open}
       onClose={handleModalClose}
      />
      <Header title="Attendance System" subtitle="Dashboard to Manage Employees Attendance" />
      <Box display={'flex'} justifyContent={'left'} gap={10}>
         {/* Date Selector */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(params) => <Box component="div" {...params} />}
        />
      </LocalizationProvider>
          <button
           type="button"
           className="btn btn-primary"
           onClick={() => handleModalOpen()}
           style={{borderRadius:"20px" ,textAlign:"center"}}
          >
            View Attendance Data
          </button>
      </Box>
      {/* Attendance Table */}
      {isLoading ? (
        <AttendanceSkeleton daysInMonth={daysInMonth} />
      ) : (
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow bgcolor={`${colors.primary[400]}`}>
                <TableCell rowSpan={2} bgcolor={`${colors.primary[400]}`}
                 sx={{
                  minWidth: "120px",
                  maxWidth: "200px",
                  width: "100%",
                }}>Employee Name</TableCell>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <TableCell
                    key={`day-${i + 1}`}
                    align="center"
                    sx={{
                      bgcolor:
                        getDayOfWeek(i + 1) === 0 ? "grey.300" : "inherit", // Sunday shading
                    }}
                  >
                    {new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      i + 1
                    ).toLocaleDateString("en-US", { weekday: "short" })}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <TableCell
                    key={`date-${i + 1}`}
                    align="center"
                    sx={{
                      bgcolor:
                        getDayOfWeek(i + 1) === 0 ? `${colors.primary[12]}` : `${colors.primary[400]}`, // Sunday shading
                    }}
                  >
                    {i + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {employees?.map((employee) => (
                <TableRow key={employee.employee_id}>
                  <TableCell  bgcolor={`${colors.primary[400]}`}
                   sx={{
                        minWidth: "120px",
                        maxWidth: "200px",
                        width: "100%",
                      }}>
                    {employee.first_name} {employee.last_name}
                  </TableCell>
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const isSunday = getDayOfWeek(i + 1) === 0; // Check if it's Sunday
                    return (
                      <TableCell
                        key={i + 1}
                        align="center"
                        sx={{
                          bgcolor: isSunday ? `${colors.primary[12]}` : "inherit", // Shade Sunday cells
                        }}
                      >
                        <Checkbox
                          checked={
                            attendance[employee.employee_id]?.[i] || false
                          }
                          onChange={(event) =>
                            handleCheckboxChange(employee.employee_id, i, event.target.checked)
                          }
                          disabled={isSunday} // Disable checkbox for Sundays
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Typography color="error">{error.message}</Typography>}
    </Box>
  );
};

export default AttendanceSystem;
