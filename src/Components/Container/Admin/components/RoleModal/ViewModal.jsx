import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Header } from '../Header';

const ViewModal = ({ open, onClose, role }) => {
  if (!role) return null;
  const roleDetails = {
    admin: {
      description: "Has full access to the system and can manage all resources.",
      permissions: ["Manage Users", "View Reports", "Edit Settings","Manage Department","Manage Roles"],
      created_at: "2025-03-01T12:00:00Z",
    },
    employee: {
      description: "Limited access to view and manage their own tasks.",
      permissions: ["View Tasks", "Submit Reports","Leave Requests","View Status(leave,Task)"],
      created_at: "2025-03-01T12:00:00Z",
    },
    manager: {
      description: "Can oversee team activities and approve tasks.",
      permissions: ["Manage Team", "Approve Tasks", "View Reports","Manage His Department"],
      created_at: "2025-03-01T12:00:00Z",
    },
    attendance_taker: {
      description: "Responsible for managing attendance records.",
      permissions: ["View Attendance", "Update Attendance","Record Attendance"],
      created_at: "2025-03-01T12:00:00Z",
    },
  };
  const roleInfo = roleDetails[role.role_name.toLowerCase()] || {};
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 600,
        }}
      >
         <Header title="VIEW ROLE" subtitle="Here is Role Details" />
        <Typography mb={4}>Role Name: <span style={{fontWeight:"bold"}}>{role.role_name}</span></Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
         <span style={{fontWeight:"bold"}}>Description:</span>  {roleInfo.description || 'No description available.'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
        <span style={{fontWeight:"bold"}}>  Permissions:</span> {roleInfo.permissions ? roleInfo.permissions.join(', ') : 'None assigned.'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
        <span style={{fontWeight:"bold"}}> Created At:</span> {roleInfo.created_at
            ? new Date(roleInfo.created_at).toLocaleString()
            : 'Unknown'}
        </Typography>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewModal;
