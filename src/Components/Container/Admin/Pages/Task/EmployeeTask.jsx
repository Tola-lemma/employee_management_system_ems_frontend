import React from "react";
import EmployeeTaskAccordion from "./EmployeeTaskAccordion";
import { useGetTasksQuery } from "../../../../Features/Task";

const EmployeeTasks = ({ employeeId }) => {
  const { data: tasks, isLoading,refetch } = useGetTasksQuery();

  // Filter tasks for the selected employee
  const employeeTasks = tasks?.filter((task) => task.employee_id === employeeId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{margin:"20px"}}>
      <h2>Your Tasks</h2>
      <EmployeeTaskAccordion tasks={employeeTasks}  refetch={refetch}/>
    </div>
  );
};

export default EmployeeTasks;
