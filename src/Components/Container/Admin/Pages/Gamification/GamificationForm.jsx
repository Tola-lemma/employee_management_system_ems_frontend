import React, { useContext, useState } from "react";
import { Box, Button, TextField,  Paper, Autocomplete } from "@mui/material";
import { useGetAllEmployeesQuery } from "../../../../Features/Employee";
import { Header } from "../../components/Header";
import { useCreateGamificationMutation } from "../../../../Features/Gamification";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";

const GamificationForm = ({ onClose }) =>{ 
  const { data: employees} = useGetAllEmployeesQuery();
  const [newGamification] = useCreateGamificationMutation()
  const {showSuccess, showError} = useContext(ErrorContext)
  const [formData, setFormData] = useState({
    employee_id:"",
    points: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEmployeeSelect = (event, selectedEmployee) => {
    if (selectedEmployee) {
      setFormData({ ...formData, employee_id: selectedEmployee.employee_id });
    }
  };
  const handleSubmit = async() => {
   try {
    const result = await newGamification(formData).unwrap()
     if(result?.message){
       showSuccess(result?.message)
        onClose();
      }
      else{
       showError('Unable to create Gamification '+result?.error?.message)
       onClose();
      }
   } catch (error) {
    if (error?.data.status===500) {
      showError('Unable Create Gamification  ' + error?.data?.error)
      onClose();
    }
      else{
        showError('Unable create Gamification  ' + error?.data ? error?.data?.message : error?.error)
        onClose();
      }
   } 
 
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
         <Header
           title="Add Gamification"
           subtitle="This is where you give points for your Employee when they Accomplish task on time"
                  />
      <Autocomplete
        options={
          employees?.filter((employee) => employee.role !== "admin") || []
        }
        getOptionLabel={(option) =>
          `${option.first_name} ${option.last_name}` || ""
        }
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
            maxHeight: "100px", // Approx. height for 5 items (adjust if needed)
            overflow: "auto",
          },
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Points"
        name="points"
        type="number"
        fullWidth
        margin="normal"
        value={formData.points}
        onChange={handleChange}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          fullWidth
          sx={{ mt: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default GamificationForm;
