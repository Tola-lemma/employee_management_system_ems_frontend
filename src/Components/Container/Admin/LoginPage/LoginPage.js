import "./LoginPage.css";
import CustomButton from "../Pages/global/Button";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState, useContext } from "react";
import { ErrorContext } from "../ToastErrorPage/ErrorContext";
import { useLoginUserMutation } from "../../../Features/Auth/Auth";
import AuthContext from "../Pages/global/LoginContext";
import { ErrorMessage } from "../ToastErrorPage/ErrorMessage";
export const LoginPage = () => {
  const { showError } = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loginUser,{isLoading}] = useLoginUserMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password }).unwrap();
      if (user.must_change_password) {
        Cookies.set('token', token, { expires: 1 , 
          secure: false, 
          sameSite: 'Lax', 
        });
          navigate(`/change_password/${token}`);
        } else {
          login(token);
          navigate('/home'); 
        }
      } catch (error) {
        if(error?.status===401){
          showError(error?.data?.message + ".  You Have " + error?.data?.remainingAttempts + " Remaining attempts");
        }
        else if(error?.status===403){
          showError(error?.data?.message);
        }
        else if(error?.status===404){
          showError(error?.data?.message);
        }
        else if(error?.status==="FETCH_ERROR"){
          showError("Network Error. Please try again later " + error?.error);
        }
        else{
          showError("Something went wrong. Please try again later");
        }
        // showError(error?.data);
      }
    };
 return( <> 
  <div className="loginpage">
    <div className="login-box">
      <div className="login-parent">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input type="email" required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="email"> Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input type="password" required 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <label htmlFor="password"> Password</label>
          </div>
          <CustomButton  
          type="submit"
          className="loginbtn btn btn-primary"
          disabled={isLoading} loading={isLoading}> Login</CustomButton>
        </form>
      </div>
    </div>
      <ErrorMessage />
  </div>
  
  </>)
};
