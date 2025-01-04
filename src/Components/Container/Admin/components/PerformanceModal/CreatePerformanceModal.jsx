import React, { useState } from "react";
import { Modal, Box, Button, Typography, TextField, Autocomplete } from "@mui/material";
import { Header } from "../Header";
import { useGetAllEmployeesQuery } from "../../../../Features/Employee";

const CreateModal = ({ open, onClose, onCreate }) => {
  const { data: employees, isLoading, error } = useGetAllEmployeesQuery();
  const [formData, setFormData] = useState({
    employee_id: null,
    review_date: "",
    score: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmployeeSelect = (event, selectedEmployee) => {
    if (selectedEmployee) {
      setFormData({ ...formData, employee_id: selectedEmployee.employee_id });
    }
  };

  const handleSubmit = () => {
    if (formData.employee_id && formData.review_date && formData.score) {
      onCreate(formData);
      onClose();
    } else {
      alert("Please fill in all required fields.");
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
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Header title="CREATE PERFORMANCE REVIEW" subtitle="Fill in the form below to create a performance review" />
        
        {isLoading && <Typography>Loading employees...</Typography>}
        {error && <Typography color="error">Failed to fetch employees.</Typography>}

        {!isLoading && !error && (
          <Autocomplete
            options={employees || []}
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}` || ""}
            onChange={handleEmployeeSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employee"
                placeholder="Search employee"
                required
                margin="normal"
                fullWidth
              />
            )}
            ListboxProps={{
              style: {
                maxHeight: '100px', // Approx. height for 5 items (adjust if needed)
                overflow: 'auto',
              },
            }}
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          label="Review Date"
          name="review_date"
          type="date"
          value={formData.review_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Score"
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, max: 100 }}
        />

        <TextField
          label="Feedback"
          name="feedback"
          multiline
          rows={3}
          value={formData.feedback}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginRight: "8px" }}
          >
            Create
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateModal;
