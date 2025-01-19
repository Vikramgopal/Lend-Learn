import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className=" p-2 shadow-[0 0.8rem 2.4rem rgba(36, 42, 46, 0.5)] rounded-md  bg-black bg-opacity-50 text-white text-md font-semibold bg-lightGray flex items-center gap-3">
      {/* Profile picture container */}
      <div className="rounded-full bg-black shadow-md p-2">
        <img
          className="h-6 w-6"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' class='h-6 w-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 14c4 0 6-3 6-6s-2-6-6-6-6 3-6 6 2 6 6 6zM12 14c-4 0-6 2-6 6v1h12v-1c0-4-2-6-6-6z'%3E%3C/path%3E%3C/svg%3E"
        />
      </div>

      {/* User details */}
      <div className="text-md  font-semibol  items-start">
        Hey, <span className="uppercase">{user?.name || "User"}</span>
        {/* <span className="text-xs text-gray-600">{user?.email}</span> */}
      </div>

      {/* Logout Button */}
      <button
        className="rounded-lg border-none text-sm uppercase cursor-pointer p-2 text-black bg-white bg-opacity-90 hover:bg-black hover:text-white transition-all duration-150 font-bold bg-accent-dark hover:bg-accent-light"
        onClick={handleClick}
      >
        Logout
      </button>
    </div>
  );
}

export default User;
