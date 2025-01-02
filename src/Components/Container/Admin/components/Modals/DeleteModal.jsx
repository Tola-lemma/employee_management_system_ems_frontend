import React, { useContext } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Header } from "../Header";
import { useUpdateEmployeeMutation, useDeleteEmployeeMutation } from "../../../../Features/Employee";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
 
const DeleteModal = ({ open, onClose, data }) => {
  const [updateEmployee, { isLoading: updating }] = useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: deleting }] = useDeleteEmployeeMutation();
const {showSuccess , showError} = useContext(ErrorContext)
  const handleSetInactive = async () => {
    try {
      const body = { status: "Inactive" }; // Assuming `status` is a field in the employee model
      await updateEmployee({ employee_id: data?.employee_id, body }).unwrap();
      showSuccess("Employee status changed to Inactive.");
      onClose();
    } catch (err) {
      console.error("Error setting employee to Inactive:", err);
      showError("Failed to update employee status.");
    }
  };

  const handlePermanentDelete = async () => {
    try {
      const confirmed = window.confirm("This action is irreversible. Are you sure?");
      if (confirmed) {
        await deleteEmployee(data?.employee_id).unwrap();
        showError("Employee deleted permanently.");
        onClose();
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
      showError("Failed to delete employee.");
    }
  };

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
        <Header title="DELETE OR INACTIVATE EMPLOYEE PROFILE" subtitle="Delete or Inactivate Employee" />
        <Typography>
          What action would you like to perform for {data?.first_name} {data?.last_name}?
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
          <Button
            onClick={handleSetInactive}
            variant="contained"
            color="warning"
            disabled={updating || deleting}
          >
            {updating ? "Processing..." : "Set to Inactive"}
          </Button>
          <Button
            onClick={handlePermanentDelete}
            variant="contained"
            color="error"
            disabled={updating || deleting}
          >
            {deleting ? "Processing..." : "Delete Permanently"}
          </Button>
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
