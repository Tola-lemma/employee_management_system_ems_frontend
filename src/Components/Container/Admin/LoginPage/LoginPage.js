import "./LoginPage.css";
import CustomButton from "../Pages/global/Button";
export const LoginPage = () => {
 return( <> 
  <div className="loginpage">
    <div className="login-box">
      <div className="login-parent">
        <h2>Login</h2>
        <form >
        {/* <form onSubmit={handleSubmit}> */}
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input type="email" required 
            // value={email}
            // onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="email"> Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input type="password" required 
            // value={password}
            // onChange={(e)=>setPassword(e.target.value)}
            />
            <label htmlFor="password"> Password</label>
          </div>
          <CustomButton  
          type="submit"
          className="loginbtn btn btn-primary"
         > Login</CustomButton>
          {/* <CustomButton  
          type="submit"
          className="loginbtn btn btn-primary"
          disabled={updating} loading={updating}> Login</CustomButton> */}
        </form>
      </div>
    </div>
  </div>
  
  </>)
};
