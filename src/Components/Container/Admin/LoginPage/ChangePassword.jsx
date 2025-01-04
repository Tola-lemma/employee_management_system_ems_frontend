import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import CustomButton from "../Pages/global/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import { jwtDecode } from 'jwt-decode';
import { useChangePasswordMutation } from "../../../Features/Auth/Auth";
import PasswordStrength from "./PasswordStrength";
export const ChangePassword = () => {
const navigate = useNavigate();
const { showError,showSuccess } = useContext(ErrorContext);
const {token} = useParams();
const decoded = jwtDecode(token);
let employee_id = decoded.employee_id;
const [changePassword, {isLoading}]=useChangePasswordMutation()
const [confirmPasswordError, setConfirmPasswordError] = useState("");
const [passwords, setPasswords] = useState({
  old_password: "",
  new_password: "",
  confirmNewPassword: "",
});

const handleReset = () => {
  setPasswords({
    old_password: "",
    new_password: "",
    confirmNewPassword: "",
  });
  setConfirmPasswordError("");
};

const handlePasswordChange = (e) => {
  const { name, value } = e.target;

  setPasswords((prevState) => ({
    ...prevState,
    [name]: value,
  }));

  if (name === "confirmNewPassword" || name === "new_password") {
    if (
      name === "confirmNewPassword" &&
      value !== passwords.new_password
    ) {
      setConfirmPasswordError("Passwords do not match");
    } else if (
      name === "new_password" &&
      passwords.confirmNewPassword &&
      passwords.confirmNewPassword !== value
    ) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }
};

const { old_password, new_password} = passwords;
const handleSubmit = async (e) => {
  e.preventDefault();
  if (passwords.new_password !== passwords.confirmNewPassword) {
    setConfirmPasswordError("Passwords do not match");
    return;
  }
  try {
    const result = await changePassword({ employee_id, old_password, new_password });
    if(result?.error?.status===400){
    showError(result?.error?.data.message)
    }
    if(result?.error?.status==="FETCH_ERROR"){
    showError(result?.error?.error)
    }
    if(result?.data?.status==="success"){ 
      showSuccess(result?.data.message)
      navigate('/'); 
      handleReset()
    }
  } catch (error) {
    showError('Unknown Inernal server Error')
  }
}
  return (
    <>
  <button
    className="btn btn-primary rounded-pill ms-2 mt-3"
    onClick={() => navigate("/")}
  >
    🏠 Back to Home page
  </button>
  {passwords.new_password && (
                  <PasswordStrength password={passwords.new_password} />
                )}
      <div className="loginpage">
        <div className="login-box">
          <div className="login-parent">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <span className="icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  name="old_password"
                  value={passwords.old_password}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">Old Password</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  name="new_password"
                  value={passwords.new_password}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">New Password</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  name="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">Confirm New Password</label>
              </div>
              {confirmPasswordError && (
              <span className="error-message">{confirmPasswordError}</span>
            )}
              <CustomButton
                type="submit"
                className="loginbtn btn btn-primary"
                disabled={isLoading}
                loading={isLoading}
              >
                Change
              </CustomButton>
            </form>
            <ErrorMessage />
          </div>
        </div>
      </div>
    </>
  );
};
