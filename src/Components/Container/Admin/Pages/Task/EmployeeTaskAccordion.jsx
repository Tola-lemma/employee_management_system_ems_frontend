// import React,  from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUpdateTaskMutation } from "../../../../Features/Task";
import { useContext } from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";

const EmployeeTaskAccordion = ({ tasks,refetch }) => {
  const [updateTask] = useUpdateTaskMutation();
const {showError, showSuccess}= useContext(ErrorContext)
  // Categorize tasks by status
  const categorizedTasks = {
    pending: tasks?.filter((task) => task.status === "pending"),
    "in-progress": tasks?.filter((task) => task.status === "in-progress"),
    completed: tasks?.filter((task) => task.status === "completed"),
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask({ task_id: taskId, status: newStatus });
      refetch();
      showSuccess("Status updated successfully!");
    } catch (error) {
      showError("Error updating status:")
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      {Object.entries(categorizedTasks).map(([status, tasks]) => (
        <Accordion key={status}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{status.charAt(0).toUpperCase() + status.slice(1)} Tasks </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Box key={task.task_id} mb={2} p={2} border={1} borderRadius={2}>
                  <Typography variant="h6" dangerouslySetInnerHTML={{ __html:task.task_description }}/>
                  <Typography variant="body2" mb={5}>Due Date: {task.due_date}</Typography>
                  {task.status==='completed'&&<h5>This Task is Completed thanks.</h5>}
                {task.status!=='completed'&&<FormControl fullWidth>
                    <InputLabel id={`status-label-${task.task_id}`} style={{margin:-10}}> Change Status</InputLabel>
                    <Select
                      labelId={`status-label-${task.task_id}`}
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In-Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>}
                </Box>
              ))
            ) : (
              <Typography>No tasks in this category.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default EmployeeTaskAccordion;
