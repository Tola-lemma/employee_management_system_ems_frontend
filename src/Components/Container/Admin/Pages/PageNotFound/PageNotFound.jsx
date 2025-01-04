import { useNavigate } from "react-router-dom"

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="" style={{width:"100%", height:"100%",margin:"0",position:"absolute",top:"0" ,backgroundColor:"white"}}>
      <h1 style={{textAlign:"center",fontSize:"50px",marginTop:"10px"}}>Page Not Found</h1>
      <button style={{marginLeft:"600px",marginTop:"15px",fontSize:"20px",padding:"5px",borderRadius:"20px"}} className="btn btn-primary" onClick={()=>navigate("/")}>Go back to Home</button>
     <img style={{width:"70%" ,height:"600px",marginLeft:"200px" }} src={"https://blog.thomasnet.com/hubfs/shutterstock_774749455.jpg"} alt="page not found"/>
    </div>
  )
}
