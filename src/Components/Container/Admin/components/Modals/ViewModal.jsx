import React from "react";
import { Modal, Box, Typography, Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
 } from "@mui/material";
import { Header } from "../Header";
import { useGetEmployeeDepartmentHistoryQuery } from "../../../../Features/Department";

const ViewModal = ({ open, onClose, data }) => {
  const { data: departmentHistory, isLoading:deparmentHistoryLoading } =
    useGetEmployeeDepartmentHistoryQuery(data?.employee_id||0);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 900,
          overflow:'hidden',
          height:"680px"
        }}
      >
            <Header
                title="VIEW EMPLOYEE PROFILE"
                subtitle="View Employee member's Profile"
              />
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Profile Image */}
          <Box>
            <img
              src={
                data?.profile_picture ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              }
              alt="Profile"
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* User Details */}
          <Box>
            <Typography>
              <strong>Full Name:</strong> {data?.first_name} {data?.last_name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {data?.email}
            </Typography>
            <Typography>
              <strong>Date of Birth:</strong> {data?.date_of_birth}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {data?.phone}
            </Typography>
            <Typography>
              <strong>Address:</strong> {data?.address}
            </Typography>
            <Typography>
              <strong>Department:</strong> {data?.department}
            </Typography>
            <Typography>
              <strong>Role:</strong> {data?.role}
            </Typography>
            <Typography>
              <strong>Status:</strong> {data?.status}
            </Typography>
          </Box>
        </Box>
       <h3>Employee Work History  (Found: {departmentHistory?.length})</h3>
      {deparmentHistoryLoading&&<p>Employee Department History is Loading</p>}
    {/* {error&&<p style={{color:"red"}}>Error Loading Employee Department History</p>} */}
    {(!departmentHistory || departmentHistory.length === 0)?<p>No department history available for this employee.</p>
      :<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>Department</TableCell>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>Start Date</TableCell>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>End Date</TableCell>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>Works For</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentHistory?.map((history, index) => (
            <TableRow key={history.history_id|| `history-${index}`}>
              <TableCell>{history.department_name}</TableCell>
              <TableCell>{history.start_date}</TableCell>
              <TableCell>{history.end_date}</TableCell>
              <TableCell>{history.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
       <Button onClick={onClose} variant="contained" color="secondary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ViewModal;
