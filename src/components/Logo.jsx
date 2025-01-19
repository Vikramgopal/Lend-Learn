// import { Link } from "react-router";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function Logo() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }
  return (
    <div onClick={handleClick} className="  cursor-pointer">
      <img src={logo} width={100} alt="" />
    </div>
  );
}

export default Logo;
