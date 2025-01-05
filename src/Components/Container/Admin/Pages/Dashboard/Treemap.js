import { Autorenew } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Tree } from "react-d3-tree";

// Sample container styles for the tree
const containerStyles = {
  width: "100%",
  height: "400px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "auto",
  marginTop:4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign:"center"
};

const MyTree = ({ employees }) => {
      const [orientation, setOrientation] = useState("vertical");
  // Function to build the hierarchy
  const buildHierarchy = (data) => {
      const admins = data?.filter((person) => person.role === "admin") || [];

      // Create a string with all admin names, separated by commas
      const adminNames = admins.length
        ? admins.map((admin) => `${admin.first_name} ${admin.last_name}`).join(" And ")
        : "Admin";
const hierarchy = {
    name: `Admin: ${adminNames}`,
    children: [],
  };

    const departments = {};

    data?.forEach((person) => {
      const { department, role, first_name,status, last_name } = person;
      const fullName = `${first_name} ${last_name}`;
     // Skip employees with inactive status
     if (status === "Inactive") return;
      // If the department doesn't exist, create it
      if (!departments[department]) {
        departments[department] = {
          name: `Department: ${department}`,
          children: [],
        };
      }

      // Add managers and employees under the department
     if (role === "manager") {
        departments[department].children.push({
          name: `Manager: ${fullName}`,
          children: [], 
        });
      } else if (role === "employee") {
        departments[department].children.push({
          name: `Employee: ${fullName}`,
        });
      }
      else if (role === "attendance_taker") {
        departments[department].children.push({
          name: `Attendance Taker: ${fullName}`,
        });
      }
    });

    // Add all departments to the root hierarchy
    hierarchy.children = Object.values(departments);

    return hierarchy;
  };

  // Memoized hierarchy data for better performance
  const hierarchyData = useMemo(() => buildHierarchy(employees), [employees]);
  const getTranslateValues = () => {
      if (orientation === "vertical") {
        return { x: 300, y: 50 };
      }
      return { x: 50, y: 200 }; 
    };
  return (
      <div style={{marginTop:'6px'}}>
      <div style={{textAlign: "center" }}>
            <Tooltip title="Change Orientation of Hierarchy" placement="bottom-start">
            <Autorenew sx={{fontSize:34}} onClick={() => setOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"))}/>
          </Tooltip>
      </div>
    <div style={containerStyles}>

      <Tree
        data={hierarchyData}
        orientation={orientation}
        pathFunc="diagonal"
        nodeSize={{ x: 200, y: 100 }}
        translate={getTranslateValues()}
        collapsible={true} // Allow nodes to expanded
        styles={{
          nodes: {
            node: {
              circle: { fill: "#40a9ff" },
              name: { fontSize: 12 },
              attributes: { fontSize: 10 },
            },
            leafNode: {
              circle: { fill: "#40a9ff" },
              name: { fontSize: 12 },
              attributes: { fontSize: 10 },
            },
          },
          links: {
            stroke: "#ccc",
            strokeWidth: 2,
          },
        }}
      />
    </div>
    </div>
  );
};

export default MyTree;
