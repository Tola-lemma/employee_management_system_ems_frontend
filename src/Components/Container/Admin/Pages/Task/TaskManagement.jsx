import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../../../../Features/Task";
import { Header } from "../../components/Header";
import { useGetAllEmployeesQuery, useGetEmployeeQuery } from "../../../../Features/Employee";
import EditorJs from "../Notification/Editor";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import EmployeeTasks from "./EmployeeTask";
const TaskManagement = () => {
  const { data: tasks, isLoading,refetch } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
   const { data: employees} = useGetAllEmployeesQuery();
  const [modalType, setModalType] = useState(null); // "create", "update", "view", "delete"
  const [selectedTask, setSelectedTask] = useState(null); // For update/view
  const token = Cookies.get('token');
  let role;
  let employee_id
  try {
    if (token) {
      const decoded = jwtDecode(token);
      role = decoded.role;
      employee_id = decoded.employee_id;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
   const { data: employeeData,refetch:employeRefetch} = useGetEmployeeQuery(employee_id);
  const { department = "" } = employeeData || {};
  const [formValues, setFormValues] = useState({
    employee_id: "",
    task_description: "",
    due_date: "",
    status: "pending",
  });
  const loggedInManager = {
    department:department,
    role: role,
  };
  const [showManagerTasks, setShowManagerTasks] = useState(true);
  // Modal handlers
  const openModal = (type, task = null) => {
    setModalType(type);
    setSelectedTask(task);
    setFormValues(task || {
      employee_id: "",
      task_description: "",
      due_date: "",
      status: "pending",
    });
  };

  // Filter employees under the manager's department
  const employeesInManagerDept = employees?.filter(
    (employee) => employee.department === loggedInManager.department
  );

  // Filter tasks assigned to employees under the manager's department
  const filteredTasks = tasks?.filter((task) =>
    employeesInManagerDept?.some((emp) => emp.employee_id === task.employee_id)
  );

  const closeModal = () => {
    setModalType(null);
    setSelectedTask(null);
    refetch()
    employeRefetch()
    setFormValues({
      employee_id: "",
      task_description: "",
      due_date: "",
      status: "pending",
    });
  };

  // Form change handler
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Submit handlers
  const handleCreate = async () => {
    await createTask(formValues);
    refetch();
    employeRefetch()
    closeModal();
  };

  const handleUpdate = async () => {
    await updateTask({ task_id: selectedTask.task_id, ...formValues });
    refetch();
    employeRefetch()
    closeModal();
  };

  const handleDelete = async () => {
    await deleteTask(selectedTask.task_id);
    refetch();
    closeModal();
  };
  const handleEmployeeSelect = (event, selectedEmployee) => {
    if (selectedEmployee) {
      setFormValues({ ...formValues, employee_id: selectedEmployee.employee_id });
    }
  };
  // Columns for DataGrid
  const columns = [
    { field: "fullName", headerName: "Employee Name", width: 200 },
    { field: "task_description", headerName: "Description", width: 300,
      renderCell: (params) => (
        <div
          dangerouslySetInnerHTML={{ __html: params.row.task_description }}
          // style={{ whiteSpace: "pre-wrap" }} 
        />
      ),
     },
    { field: "due_date", headerName: "Due Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <IconButton onClick={() => openModal("view", params.row)}>
            <Visibility color="primary" />
          </IconButton>
          <IconButton onClick={() => openModal("update", params.row)}>
            <Edit color="secondary" />
          </IconButton>
          <IconButton onClick={() => openModal("delete", params.row)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m={"20px"}>
      <Header
              title="Task Management"
              subtitle="Task Management Dashboard"
            />
      {(role==='admin' || role==='manager')&&<Button variant="contained" sx={{marginRight:30}} color="primary" onClick={() => openModal("create")}>
        Create Task
      </Button>}
      {role === "manager" && (
        <button 
          className="btn btn-primary"
          onClick={() => setShowManagerTasks((prev) => !prev)}
        >
          {showManagerTasks ? "View Your Tasks" : "View Employee Tasks "}
        </button>
    )}
       {role === "admin" || (role === "manager" && showManagerTasks) ? (
      <Box mt={3}>
        <DataGrid
          rows={role === "manager" ? filteredTasks : tasks || []}
          columns={columns}
          loading={isLoading}
          autoHeight
          getRowId={(row) => row.task_id}
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      </Box>
    ) : null}
{/* employee and attendance keeper component */}
{(role === "employee" || 
      (role === "manager" && !showManagerTasks) || 
      role === "attendance_taker") && (
      <EmployeeTasks employeeId={employee_id} />
    )}
      {/* Modals */}
      <Modal open={modalType === "create"} onClose={closeModal}>
        <Box p={4} sx={{ background: "#fff", margin: "auto", maxWidth: 1050, top: "20%", position: "relative" }}>
          <Typography variant="h6">Create Task</Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
               <Autocomplete
                          options={employees?.filter((employee) => employee.role !== "admin") || []}
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
            </Grid>
            <Grid item xs={12}>
            <EditorJs
                value={formValues.task_description}
                setFieldValue={(value) => setFormValues({ ...formValues, task_description: value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Due Date"
                type="date"
                name="due_date"
                fullWidth
                value={formValues.due_date}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={3} textAlign="right">
            <Button variant="contained" onClick={handleCreate}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={modalType === "update"} onClose={closeModal}>
        <Box p={4} sx={{ background: "#fff", margin: "auto", maxWidth: 1050, top: "20%", position: "relative" }}>
          <Typography variant="h6">Update Task</Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
            <EditorJs
                value={formValues.task_description}
                setFieldValue={(value) => setFormValues({ ...formValues, task_description: value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Due Date"
                type="date"
                name="due_date"
                fullWidth
                value={formValues.due_date}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={3} textAlign="right">
            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={modalType === "view"} onClose={closeModal}>
        <Box p={4} sx={{ background: "#fff", margin: "auto", maxWidth: 400, top: "20%", position: "relative" }}>
          <Typography variant="h6">View Task</Typography>
          <Box mt={2}>
            <Typography><strong>Emp Full Name:</strong> {selectedTask?.fullName}</Typography>
            <Typography><strong>Description:</strong> {selectedTask?.task_description}</Typography>
            <Typography><strong>Due Date:</strong> {selectedTask?.due_date}</Typography>
            <Typography><strong>Status:</strong> {selectedTask?.status}</Typography>
          </Box>
        </Box>
      </Modal>

      <Modal open={modalType === "delete"} onClose={closeModal}>
        <Box p={4} sx={{ background: "#fff", margin: "auto", maxWidth: 400, top: "20%", position: "relative" }}>
          <Typography variant="h6">Delete Task</Typography>
          <Typography mt={2}>Are you sure you want to delete this task?</Typography>
          <Box mt={3} textAlign="right">
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskManagement;
