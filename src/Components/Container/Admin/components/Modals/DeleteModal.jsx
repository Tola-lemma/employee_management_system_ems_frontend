import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Header } from "../Header";

const DeleteModal = ({ open, onClose, data, onDelete }) => {
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
          maxWidth: 400,
        }}
      >
            <Header
               title="DELETE EMPLOYEE PROFILE"
               subtitle="Delete Employee member's Profile"
             />
        <Typography>
          Are you sure you want to delete the profile of{" "}
          {data?.first_name} {data?.last_name}?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete(data?.employee_id);
              onClose();
            }}
            variant="contained"
            color="error"
          >
            Confirm Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
