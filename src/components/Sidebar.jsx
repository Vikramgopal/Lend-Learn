import { useAuth } from "../contexts/FakeAuthContext";
import { NavLink } from "react-router";
function Sidebar() {
  const { user } = useAuth();

  function SidebarLink({ to, children }) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "flex items-center xl:text-lg text-md text-white p-2 bg-black bg-opacity-50 rounded"
            : "flex items-center xl:text-lg text-md text-gray-300 hover:text-white p-2"
        }
      >
        {children}
      </NavLink>
    );
  }
  const sidebarSections = [
    {
      title: "Members",
      links: [
        { label: "Members List", to: "memberslist" },
        { label: "Add Members", to: "memberform" },
      ],
    },
    {
      title: "Books",
      links: [
        { label: "Books List", to: "bookslist" },
        { label: "Add Books", to: "bookform" },
      ],
    },
    {
      title: "Transaction",
      links: [
        { label: "Transactions List", to: "transactionslist" },
        ...(user.role === "Librarian" || user.role === "Admin"
          ? [{ label: "Add Transactions", to: "transactionform" }]
          : []),
      ],
    },
    {
      title: "Staffs",
      links: [
        { label: "Staff List", to: "staffslist" },
        ...(user.role === "Admin"
          ? [{ label: "Add Staff", to: "addstaff" }]
          : []),
      ],
    },
    {
      title: "Data",
      links: [
        { label: "Pie Chart", to: "piechart" },
        { label: "Top Borrowers", to: "topborrower" },
        { label: "Overdues", to: "overduetransaction" },
      ],
    },
  ];
  return (
    <div className=" h-full p-4 rounded-md flex flex-col justify-around bg-accent-sidebar overflow-y-scroll scrollbar-hide font-playfair text-white w-[20vw]">
      {sidebarSections.map((section) => (
        <div key={section.title} className="py-3">
          <h2 className="xl:text-2xl text-xl pb-2 font-bold uppercase">
            {section.title}
          </h2>
          <ul className="font-montserrat font-semibold xl:px-4 px-2">
            {section.links.map((link) => (
              <SidebarLink key={link.to} to={link.to}>
                {link.label}
              </SidebarLink>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
