import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { store, purgeAuthState } from '../redux/store';
import { useSelector } from "react-redux";
import { updateItemQuantity } from "../api/item";

const HeaderDropDown = (props) => {
    const cookies=new Cookies();
    const navigate =useNavigate()
    const cartItems=useSelector((state)=>state.item.cartItems)
    const _handleLogout= async()=>{
        cookies.remove("userName","/")
        cookies.remove("auth","/")
        cookies.remove("userId","/")
        cookies.remove('token','/')
        cookies.remove('userType','/')
        localStorage.clear()
        await updateItemQuantity(cartItems)
        // purgeAuthState();
        window.location.reload();

        navigate('/login')
    }
  return <>

    
      <div
        className="text-center p-2 hover cardStyle"
        style={{
          position: "absolute",
          fontSize: 16,
          top: 57,
          right: 0,
          background: "#fff",
          color: "black",
          zIndex: 1,
          borderRadius: 5,
        //   width: role === "org_admin" || role === MyConstants.CARBON_USER_ROLE ? 223 : 173,
        width:200,
          cursor: "pointer",
          border: `1px solid black`,
        }}
      >
        {/* <div onClick={()=> navigate('/building-and-user-registration')} className="p-1 pb-2" style={{ borderBottom: '1px solid gray' }}>Registration</div> */}
        {/* <div className="p-1" style={{ textAlign: "left" }} onClick={() => navigate("/profile")}>
          <div style={{ display: "flex" }}>
            <i className="ri-shield-user-line pe-2"></i>
            {"Profile"}
          </div>
        </div>
        <div className="p-1" style={{ textAlign: "left" }} onClick={() => navigate("/change_password")}>
          <div style={{ display: "flex" }}>
          <i class="ri-key-fill pe-2"></i>
            {"Change Password"}
          </div>
        </div> */}
        <div className="p-1" style={{ textAlign: "left" }} 
        onClick={() => _handleLogout()}
        >
          <div style={{ display: "flex" }}>
            <i className="ri-logout-box-line pe-2"></i>
            {"Log Out"}
          </div>
        </div>
      </div>
  </>

}

export default HeaderDropDown;
