import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetAllEmployeesQuery } from "../../../../Features/Employee";
import AttendanceSkeleton from "./AttendanceSkeleton";
import { tokens } from "../../theme";
import { Header } from "../../components/Header";

const AttendanceSystem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const {
    data: employees,
    isLoading,
    error,
//     refetch,
  } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (employees) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const initialAttendance = employees.reduce((acc, employee) => {
        acc[employee.employee_id] = Array(daysInMonth).fill(false); // Use a unique ID
        return acc;
      }, {});

      setAttendance(initialAttendance);
    }
  }, [selectedDate, employees]);

  const handleCheckboxChange = (employeeId, dayIndex) => {
    setAttendance((prev) => ({
      ...prev,
      [employeeId]: prev[employeeId]?.map((status, index) =>
        index === dayIndex ? !status : status
      ),
    }));
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
      <Header title="Attendance System" subtitle="Dashboard to Manage Employees Attendance" />

      {/* Date Selector */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(params) => <Box component="div" {...params} />}
        />
      </LocalizationProvider>

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
                          onChange={() =>
                            handleCheckboxChange(employee.employee_id, i)
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
