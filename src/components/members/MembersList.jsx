import React, { useState } from "react";

const MembersList = ({ membersList }) => {
  const [filter, setFilter] = useState(""); // State for the filter input
  const [sortConfig, setSortConfig] = useState({
    key: "name", // Default sort by name
    direction: "asc", // Default direction is ascending
  });

  // Filter members based on the filter input
  const filteredMembers = membersList.filter(
    (member) =>
      member.memberId.toString().includes(filter) ||
      member.name.toLowerCase().includes(filter.toLowerCase()) ||
      member.email.toLowerCase().includes(filter.toLowerCase()) ||
      // member.phone.toString().includes(filter) ||
      member.membershipType.toLowerCase().includes(filter.toLowerCase()) ||
      member.membershipStartDate.toString().includes(filter)
  );

  // Sorting function
  const sortedMembers = filteredMembers.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle special case for membershipStartDate (date)
    if (sortConfig.key === "membershipStartDate") {
      aValue = new Date(a.membershipStartDate);
      bValue = new Date(b.membershipStartDate);
    }

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
          placeholder="Search by ID, Name, Email, Membership Type, or Start Date"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border  bg-black bg-opacity-50 outline-none border-none text-sm text-white rounded-md w-1/3 focus:outline-none "
        />

        {/* Sorting Section */}
        <div className="flex items-center space-x-3">
          {/* <label
            htmlFor="sortOptions"
            className="text-xl font-bold font-playfair "
          >
            Sort by: */}
          {/* </label> */}
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
            <option value="membershipType_asc">Membership ↑</option>{" "}
            {/* Ascending */}
            <option value="membershipType_desc">Membership ↓</option>{" "}
            {/* Descending */}
            <option value="membershipStartDate_asc">Start Date ↑</option>{" "}
            {/* Ascending */}
            <option value="membershipStartDate_desc">Start Date ↓</option>{" "}
            {/* Descending */}
          </select>
        </div>
      </section>

      {/* Table Section */}
      <section className="h-[80vh] overflow-y-scroll overflow-x-scroll px-2 scrollbar-hide">
        <table className="min-w-full text-white bg-black bg-opacity-50">
          <thead className="font-playfair sm:text-lg text-md bg-black">
            <tr>
              <th className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                ID
              </th>
              <th className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                Name
              </th>
              <th className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                Email
              </th>
              <th className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                Phone
              </th>
              <th className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                Membership Type
              </th>
              <th className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                Start Date
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member) => (
              <tr
                key={member.memberId}
                className="bg-black bg-opacity-5 hover:bg-opacity-40 font-lato text-center"
              >
                <td className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                  {member.memberId}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                  {member.name}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                  {member.email}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                  {member.phoneNumber}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                  {member.membershipType}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50 px-4 py-2 whitespace-nowrap">
                  {member.membershipStartDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default MembersList;
