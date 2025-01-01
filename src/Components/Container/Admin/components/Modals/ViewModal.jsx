import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ViewModal = ({ open, onClose, data }) => {
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
          maxWidth: 800,
        }}
      >
        <Typography variant="h6">{`View Details`}</Typography>
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
        <Button onClick={onClose} variant="contained" color="secondary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ViewModal;
