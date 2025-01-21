import { useAuth } from "../contexts/FakeAuthContext";
import { NavLink } from "react-router";
import User from "./User";
function MobileSidebar({closetoggle}) {
  const { user } = useAuth();
  // Close dropdown when a link is clicked

  function SidebarLink({ to, children }) {
    return (
      <NavLink
        to={to}
       onClick={closetoggle}
        className={({ isActive }) =>
          isActive
            ? "flex items-center  text-white  p-2 bg-black bg-opacity-50 rounded"
            : "flex items-center  text-gray-300 hover:text-white p-2"
        }
        
      >
        {children}
      </NavLink>
    );
  }
  const section = [
    { label: "Members List", to: "memberslist" },
    { label: "Add Members", to: "memberform" },
    { label: "Books List", to: "bookslist" },
    { label: "Add Books", to: "bookform" },
    { label: "Transactions List", to: "transactionslist" },
    ...(user.role === "Librarian" || user.role === "Admin"
      ? [{ label: "Add Transactions", to: "transactionform" }]
      : []),
    { label: "Staff List", to: "staffslist" },
    ...(user.role === "Admin" ? [{ label: "Add Staff", to: "addstaff" }] : []),
    { label: "Pie Chart", to: "piechart" },
    { label: "Top Borrowers", to: "topborrower" },
    { label: "Overdues", to: "overduetransaction" },
  ];
  const closeDropdown = () => {
    setIsMenuOpen(false);
  };
  return (
    // <div className=" h-full p-4 rounded-md flex flex-col justify-around bg-accent-sidebar overflow-y-scroll scrollbar-hide font-playfair text-white w-[20vw]">
    <div className="h-[88vh] flex flex-col  justify-center">
      <div className="flex items-center h-[12vh]  justify-center">
        <User />
      </div>
      <div className=" h-[80vh] flex flex-col justify-around  px-5  text-white ">
        {section.map((link) => (
          <ul
            key={link.to}
            className="font-montserrat font-semibold flex flex-col  text-xl "
          >
            <li className=" ">
              <SidebarLink key={link.to} to={link.to}>
                {link.label}
              </SidebarLink>
            </li>
          </ul>
        ))}
        {/* </ul> */}
      </div>
    </div>
    // </div>
  );
}

export default MobileSidebar;
