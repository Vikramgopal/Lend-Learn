import React, { useState } from "react";

const StaffsList = ({ staffList }) => {
  const [filter, setFilter] = useState(""); // State for the filter input
  const [sortConfig, setSortConfig] = useState({
    key: "name", // Default sort by name
    direction: "asc", // Default direction is ascending
  });

  const filteredStaffs = staffList.filter(
    (staff) =>
      staff.staffId.toString().includes(filter) ||
      staff.name.toLowerCase().includes(filter.toLowerCase()) ||
      staff.email.toLowerCase().includes(filter.toLowerCase()) ||
      staff.role.toLowerCase().includes(filter.toLowerCase())
  );

  // Sorting function
  const sortedStaffs = filteredStaffs.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Sorting based on direction
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sort option change
  const handleSortChange = (event) => {
    const value = event.target.value;
    const [key, direction] = value.split("_");
    setSortConfig({ key, direction });
  };

  return (
    <main className=" flex flex-col bg-black bg-opacity-50    rounded-md text-white h-full w-full">
      {/* Sorting and Filter Section */}
      <section className=" h-[8vh] flex justify-between items-center font-merriweather  px-4">
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Search by ID, Name, Email and Role"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border  bg-black bg-opacity-50 outline-none border-none text-sm text-white rounded-md w-1/3 focus:outline-none "
        />

        {/* Sorting Section */}
        <div className="flex items-center space-x-3">
          <select
            id="sortOptions"
            value={`${sortConfig.key}_${sortConfig.direction}`} // Bind the value to the current sortConfig
            onChange={handleSortChange}
            className="px-4 py-2 border max-sm:w-[8rem] w-[8rem]  bg-black bg-opacity-50 border-none text-white  rounded-md text-sm focus:outline-none "
          >
            <option value="name_asc">Name ↑</option> {/* Ascending */}
            <option value="name_desc">Name ↓</option> {/* Descending */}
            <option value="email_asc">Email ↑</option> {/* Ascending */}
            <option value="email_desc">Email ↓</option> {/* Descending */}
            <option value="phone_asc">Phone ↑</option> {/* Ascending */}
            <option value="phone_desc">Phone ↓</option> {/* Descending */}
            <option value="role_asc">Role ↑</option> {/* Ascending */}
            <option value="role_desc">Role ↓</option> {/* Descending */}
          </select>
        </div>
      </section>

      {/* Table Section */}
      <section className=" h-[80vh] overflow-y-scroll px-2  scrollbar-hide">
        <table className="min-w-full text-white   bg-black bg-opacity-50 ">
          <thead className="font-playfair text-lg  bg-black  ">
            <tr>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                ID
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Name
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Email
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Phone
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Role
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {sortedStaffs.map((staff) => (
              <tr
                key={staff.staffId}
                className="bg-black bg-opacity-5 hover:bg-opacity-40 font-lato   text-center"
              >
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {staff.staffId}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {staff.name}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {staff.email}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {staff.phoneNumber}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {staff.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default StaffsList;
