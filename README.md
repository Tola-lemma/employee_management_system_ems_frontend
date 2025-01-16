# Employee Management System EMS 
Live Demo here  [https://employee-management-system-ems-bwry.onrender.com](https://employee-management-system-ems-bwry.onrender.com)
Credential for Admin that created via Super admin is
:
# Email : `admin@admin.com`
# password : `Admin@7896`


test for manager:
   Email: `manager@manager.com`
   Password: `V9kk!pyQ` 
OR (you can create your own manager and or employee or attendance taker  using admin credantials and test its functionality)
---

## Login Page

### Overview

The Login Page is where users can authenticate to access the system. The login credentials are created by the Admin, and the password is sent to the email address registered with the system.

### Functionality

1. **Credential Creation by Admin:**
   - The Admin creates login credentials for users.
   - The credentials (username and password) are sent to the email address registered with the system.
   - Once the credentials are received, users can log in.

2. **Error Handling:**
   - The Login Page includes comprehensive error handling to ensure a smooth user experience.
   - Error messages will be displayed in case of invalid credentials, empty fields, or other input issues, failed login attemps.
   
   **Examples of Errors:**
  

3. **Screenshots:**
   - A screenshot of the Login Page error handling is provided below for reference.

   ![Login Page Error Handling](./src/Assets/LoginPage/1%20not%20found.png)
   ![Login Page Error Handling](./src/Assets/LoginPage/2%20login%20attempt.png)
   ![Login Page Error Handling](./src/Assets/LoginPage/3%20network%20error.png)
   ![Login Page Error Handling](./src/Assets/LoginPage/4%20locked.png)

### Notes:
- If you do not have a registered account, please contact the Admin to create one.
- Ensure that your email is correctly entered and is accessible to receive your login credentials.
- If you experience issues logging in, make sure that both the username and password are correct, and try again.

---
## Change Password Page
1. **Automatic Redirect to Change Password:**
   - After successfully logging in, users will be automatically redirected to the Change Password page if it’s their first time logging in .
   - This page will guide users to set a new, secure password.

2. **Password Strength Indicator:**
   - On the Change Password page, a password strength indicator (bar) will be shown to guide users in creating a strong password.
   - The password strength is calculated based on several criteria such as:
     - Minimum length of 8 characters
     - Use of uppercase letters
     - Use of lowercase letters
     - Presence of special characters
     - Inclusion of numbers
   - The bar will dynamically update as the user types in their new password, providing real-time feedback on the password strength.

5. **Screenshots:**
   - 
   ![Change Password Page](./src/Assets/changePass/1.png)

---


---

## User Roles and Permissions

### Overview

The system has four distinct roles: **Admin**, **Manager**, **Employee**, and **Attendance Taker**. Each role has specific permissions and capabilities within the system to ensure smooth operation and delegation of tasks.

### Role Details

#### **Admin**
- **Permissions:**
  - **Full Access:** The Admin has complete access to all system features and functionalities.
  - **Manage Users:** Can create, edit, and delete any user account (Employee, Manager, Attendance Taker).
  - **User Management:** Can assign roles to users and modify role permissions.
  - **View All Data:** Has access to all employee performance, leave requests, attendance, and other records across the system.
  - **Configure System Settings:** Can change system-wide settings and configurations.
  - **Push Notifications:** Admin can send notifications to all users within the system.
  
  **Key Functions:**
  - **Manage Employees:** Add new employees, update employee information, and assign roles.
  - **Approve/Reject Leave Requests:** Admin can approve or reject leave requests for any employee.
  - **View All Performance Reviews:** Admin has visibility over all employee performance data.

#### **Manager**
- **Permissions:**
  - **Supervise Employees:** Managers can oversee the employees under their department.
  - **Approve/Reject Leave Requests:** Managers can approve or reject leave requests for employees under their supervision.
  - **Department Changes:** Can change department assignments for their employees.
  - **Employee Upgrades:** Managers can promote or upgrade employees based on performance or other criteria.
  - **Review Performance:** Can give performance reviews to employees and review their performance data.
  - **Push Notifications:** Can send notifications to employees within their department or team.
  
  **Key Functions:**
  - **Approve Leave Requests:** Approve or reject leave requests submitted by employees in their department.
  - **Give Performance Feedback:** Review employee performance and provide feedback.
  - **Department Changes:** Move employees from one department to another within the organization.
  - **Send Notifications:** Managers can send internal team updates or reminders to their employees.

#### **Employee**
- **Permissions:**
  - **Request Leave:** Employees can submit leave requests, which will be reviewed by their manager or admin.
  - **View Their Performance:** Employees can view their performance records and feedback provided by their managers.
  - **View Push Notifications:** Employees can read any notifications sent to them by the admin or manager.
  - **Complete Tasks:** Employees will be assigned tasks and will be required to complete them.
  
  **Key Functions:**
  - **Request Leave:** Employees can apply for leave through the system, which will be reviewed by their manager.
  - **View Performance Reviews:** Employees can view feedback on their performance provided by their managers or admins.
  - **Receive Notifications:** Employees can view notifications about important updates or tasks.
  - **Pending Feature (Task Management):** In the near future, employees will be able to view and complete tasks assigned to them.

#### **Attendance Taker**
- **Permissions:**
  - **Take Attendance:** Attendance takers can mark attendance for employees.
  - **Ask for Leave:** Attendance takers can request leave as needed.
  
  **Key Functions:**
  - **Take Employee Attendance:** Attendance takers are responsible for tracking the attendance of employees on a daily basis.
  - **Request Leave:** Similar to employees, attendance takers can submit leave requests, which will be reviewed by their manager.

### Summary of Permissions by Role

| **Feature/Permission**               | **Admin** | **Manager** | **Employee** | **Attendance Taker** |
|--------------------------------------|-----------|-------------|--------------|----------------------|
| Create and Manage Users              | Yes       | No(only Manage Employee under his supervision)          | No           | No                   |
| Approve/Reject Leave Requests        | Yes       | Yes         | No           | No                   |
| View and Review Employee Performance | Yes       | Yes         | Yes          | No                   |
| Change Employee Department           | Yes       | No         | No           | No                   |
| Employee Promotions/Upgrades         | Yes       | Yes         | No           | No                   |
| Send Notifications                   | Yes       | Yes         | No           | No                   |
| Request Leave                        | Yes       | Yes         | Yes          | Yes                  |
| Take Attendance                      | Yes       | No          | No           | Yes                  |
| View Notifications                   | Yes       | Yes         | Yes          | Yes                   |

---
# Leave Management

- Leave requests can only be edited if they have not yet been approved or rejected.  
- Managers and Admins cannot approve or reject their own leave requests; the approval and rejection buttons will be disabled for them in such cases.  
- Employees and Attendance Takers do not have access to the approval or rejection buttons.  
- Managers can view the status of their own leave requests as well as those of the employees under their supervision.  
---
# Tecknologies used
![teck](./src/Assets/teck/1.png)
![teck](./src/Assets/teck/2.png)
---
# Task Management
---

# **Task Management System**

## **Overview**
The Task Management System is a comprehensive solution to manage tasks efficiently, enabling different roles (Admin, Manager, Employee, and Attendance Taker) to interact with tasks based on their specific permissions. Tasks are categorized by status and allow for seamless updates and filtering.

---

## **Features**
1. **Role-Based Permissions**
   - **Admin**: Full control over all tasks and employees.
   - **Manager**: Can view and manage tasks for employees within their department and their tasks.
   - **Employee**: View only tasks assigned to them, categorized by status.
   - **Attendance Taker**: Limited to viewing and updating their tasks.

2. **Task Categorization**
   - **Pending**: Newly created tasks awaiting action.
   - **In-Progress**: Tasks that are actively being worked on.
   - **Completed**: Tasks that have been successfully finished.

3. **Task Status Updates**
   - Managers and employees can change task statuses using a dropdown menu.
   - Automatic marking of tasks as "In-Progress" or "Completed" when updated.

4. **Manager-Specific Toggle View**
   - Managers can toggle between viewing their tasks and tasks assigned to employees under their supervision.

5. **Badge Notifications**
   - Icons show the total number of pending tasks for quick insights.

---

## ** Tasks Roles and Permissions**
### **Admin**
- Create, update, delete, and view all tasks across all departments.
- Manage employees and their assignments.

### **Manager**
- View and manage their tasks and tasks of employees in the same department.
- Approve, assign, and update tasks.
- Toggle between personal tasks and supervised employee tasks.

### **Employee**
- View tasks assigned to them, categorized by status.
- Update task progress to "In-Progress" or "Completed."

### **Attendance Taker**
- View and manage their tasks.
---

## **Task Categorization**
- **Accordion View**: 
  - Tasks are displayed within accordions categorized by status (Pending, In-Progress, Completed).
  - Managers and employees can expand accordions to view details.
- **Status Dropdown**:
  - Inside the accordion, a dropdown allows updating task status dynamically.

---

## **Badge Notifications**
- The sidebar menu displays a badge indicating the number of pending tasks for the logged-in user.
- Helps users quickly identify pending tasks needing attention.

---

## **UI Components**
1. **Task DataGrid**
   - Displays tasks in a tabular format with filters for managers and admin.
   - Includes actions: view, update, delete.

2. **EmployeeTasks Component**
   - Displays tasks specific to employees, categorized by status.

3. **Modals**
   - Used for creating, updating, viewing, and deleting tasks.

4. **Toggle View Button (Manager)**
   - Allows managers to switch between their tasks and employee tasks.

---

## **Future Enhancements**
- Add task reminders via email notifications.
- Integrate advanced reporting and analytics for task progress.

---

## **Screenshots**
- **Admin Task dashboard**  
  ![Pending Tasks Accordion](./src/Assets/task/1.png)  
- **Manager Task dashboard**  
  ![Task DataGrid](./src/Assets/task/2.png)  
- **Manager Toggle View**  
  ![Manager Toggle View](./src/Assets/task/3.png)  
- **Employee Task Dashboard**  
  ![Manager Toggle View](./src/Assets/task/4.png)  

---
# **Gamification Module**

## **📌 Overview**
The **Gamification Module** is a system that tracks and manages employee engagement and performance using a point-based reward system. It allows employees to earn points, level up, receive badges, and track their activity streaks. Admins and managers can update or delete records, while employees and attendance takers can only view their own records.

---

## **📋 Features**
### 🔹 **Employee Tracking**
- Each employee has a **gamification record** with **points, levels, badges, and activity streaks**.

### 🔹 **Role-Based Access Control (RBAC)**
- **Admin/Managers:** Can view, edit, and delete any gamification records.
- **Employees/Attendance Takers:** Can only view their own records.

### 🔹 **Points & Level System**
- Employees earn **points** based on engagement.
- Levels are determined based on total points.
- **Streaks** track how many consecutive days points have changed.

### 🔹 **Badges**
- Employees receive **badges** for milestones.

### 🔹 **CRUD Operations**
- **Create:** Add new gamification records.
- **Read:** View employee gamification data.
- **Update:** Modify points via an edit dialog.
- **Delete:** Remove records (only for authorized roles).


---

## **📌 Usage Guide**
1. **Admin/Manager**
   - View all records
   - Edit or delete any gamification entry

2. **Employee/Attendance Taker**
   - Can only view their own gamification record
   - Cannot edit or delete records

---

## **🔹 Future Enhancements**
✅ Leaderboards & Rankings  
✅ Integration with Performance Reviews  
✅ Automated Badge Assignment  
---
# Screenshot
![gamification](./src/Assets/gamification/1.png)
![gamification](./src/Assets/gamification/2.png)
---
# Some Major pages Overview
![Change Password Page](./src/Assets/all/1.png)
![Change Password Page](./src/Assets/all/2.png)
![Change Password Page](./src/Assets/all/3.png)
![Change Password Page](./src/Assets/all/4.png)
![Change Password Page](./src/Assets/all/5.png)
![Change Password Page](./src/Assets/all/6.png)
![Change Password Page](./src/Assets/all/7.png)
![Change Password Page](./src/Assets/all/8.png)
![Change Password Page](./src/Assets/all/9.png)
![Change Password Page](./src/Assets/all/10.png)
![Change Password Page](./src/Assets/all/11.png)
![Change Password Page](./src/Assets/all/12.png)
![Change Password Page](./src/Assets/all/13.png)
![Change Password Page](./src/Assets/all/14.png)
![Change Password Page](./src/Assets/all/15.png)
