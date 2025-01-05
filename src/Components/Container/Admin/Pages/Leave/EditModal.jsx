import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { Header } from "../../components/Header";


const EditLeaveModal = ({ open, onClose, leave, onEdit, leaveTypes }) => {
  const [formData, setFormData] = useState({
    leave_id: "",
    start_date: leave?.start_date|| "",
    end_date: leave?.end_date ||"",
    reason: "",
  });

  // Populate form fields when `leave` data changes
  useEffect(() => {
    if (leave) {
      setFormData({
        leave_id: leave.leave_id || "",
        start_date: leave.start_date || "",
        end_date: leave.end_date || "",
        reason: leave.reason || "",
      });
    }
  }, [leave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onEdit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Header title="Update Leave" subtitle="Edit the details of the leave request below." />
      
        {/* Start Date Field */}
        <TextField
          label="Start Date"
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* End Date Field */}
        <TextField
          label="End Date"
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Reason Field */}
        <TextField
          select
          label="Leave Type"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {leaveTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <button className="btn btn-warning" onClick={handleSubmit}>
            Save Changes
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditLeaveModal;
