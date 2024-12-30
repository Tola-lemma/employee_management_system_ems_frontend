import "./LoginPage.css";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
import CustomButton from "../Pages/global/Button";
export const ChangePassword = () => {

  return (
    <>
  <button
    className="btn btn-primary rounded-pill ms-2 mt-3"
    // onClick={() => navigate("/admin")}
  >
    🏠 Back to admin page
  </button>
  <button
    className="btn btn-primary rounded-pill ms-2 mt-3"
  >
    🏠 Back to your page
  </button>
      <div className="loginpage">
        <div className="login-box">
          <div className="login-parent">
            <h2>Change Password</h2>
            <form>
              <div className="input-box">
                <span className="icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  required
                  name="oldPassword"
                  // value={passwords.oldPassword}
                  // onChange={handlePasswordChange}
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
                  name="newPassword"
                  // value={passwords.newPassword}
                  // onChange={handlePasswordChange}
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
                  // value={passwords.confirmNewPassword}
                />
                <label htmlFor="password">Confirm New Password</label>
              </div>
              <CustomButton
                type="submit"
                className="loginbtn btn btn-primary"
                // disabled={updating}
                // loading={updating}
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
