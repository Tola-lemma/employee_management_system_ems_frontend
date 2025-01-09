import React, { useContext, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Button, TextField, MenuItem, Box, Autocomplete, Typography } from "@mui/material";
import { useCreateNotificationMutation } from "../../../../Features/Notifications";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { useGetAllEmployeesQuery } from "../../../../Features/Employee";
import { Header } from "../../components/Header";

const NotificationForm = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [type, setType] = useState("alert");
  const [createNotification, { isLoading: loading }] = useCreateNotificationMutation();
  const { showSuccess, showError } = useContext(ErrorContext);
  const [employee_id, setEmployee_id] = useState(null);
  const { data: employees } = useGetAllEmployeesQuery();
  const [validationError, setValidationError] = useState(null);

  const handleEmployeeSelect = (event, selectedEmployee) => {
    if (selectedEmployee) {
      setEmployee_id(selectedEmployee?.employee_id);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!employee_id) {
        setValidationError("Please select an employee.");
        return;
      }

      const contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        setValidationError("Message content cannot be empty.");
        return;
      }

      const rawMessage = convertToRaw(contentState);
      const message = JSON.stringify(rawMessage);

      const payload = { employee_id, message, type };

      const response = await createNotification(payload);
      if (response?.error?.status === 404) {
        showError(response?.error?.data?.message);
      } else if (response?.error?.status === 500) {
        showError(response?.error?.data?.error);
      } else if (response?.data?.result) {
        showSuccess(response?.data?.message);
        setEditorState(EditorState.createEmpty());
        setType("");
        setEmployee_id(null);
        setValidationError(null);
      } else {
        showError("Error while pushing the notification.");
      }
    } catch (error) {
      showError("Unexpected error occurred while submitting.");
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} sx={{ p: 3 }} m="20px" >
      <Header title="PUSH NOTIFICATION TO EMPLOYEE" subtitle="Push Alert or Reminder to Specific Employee" /> 
      {validationError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {validationError}
        </Typography>
      )}

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
            maxHeight: "100px", // Approx. height for 5 items (adjust if needed)
            overflow: "auto",
          },
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label="Notification Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      >
        <MenuItem value="alert">Alert</MenuItem>
        <MenuItem value="reminder">Reminder</MenuItem>
      </TextField>

      <Box sx={{ border: "1px solid #ccc", mb: 2, borderRadius: "4px", p: 2 }}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
          placeholder="Write your message here..."
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Push Notification"}
      </Button>
    </Box>
  );
};

export default NotificationForm;
