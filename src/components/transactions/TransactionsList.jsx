import React, { useState } from "react";

const TransactionsList = ({ transactionsList }) => {
  const [filter, setFilter] = useState(""); // State for the filter input
  const [sortConfig, setSortConfig] = useState({
    key: "transactionId", // Default sort by transactionId
    direction: "asc", // Default direction is ascending
  });

  // Filter transactions based on the filter input
  const filteredTransactions = transactionsList.filter(
    (transaction) =>
      transaction.transactionId.toString().includes(filter) ||
      transaction.memberId.toString().includes(filter) ||
      transaction.bookId.toString().includes(filter) ||
      transaction.status.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.fineAmount.toString().includes(filter)
  );

  // Sorting function
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle special case for fineAmount (number)
    if (sortConfig.key === "fineAmount") {
      aValue = Number(a[sortConfig.key]);
      bValue = Number(b[sortConfig.key]);
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
      <section className=" h-[8vh] flex justify-between font-merriweather items-center px-4">
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Search by ID, Member, Book, Status, or Fine"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border   whitespace-nowrap bg-black bg-opacity-50 outline-none border-none text-sm text-white rounded-md w-1/3 focus:outline-none "
        />

        {/* Sorting Section */}
        <div className="flex items-center space-x-3">
          {/* <label htmlFor="sortOptions" className="text-lg font-medium">
            Sort by:
          </label> */}
          <select
            id="sortOptions"
            value={`${sortConfig.key}_${sortConfig.direction}`} // Bind the value to the current sortConfig
            onChange={handleSortChange}
            className="px-4 py-2 border max-sm:w-[8rem] w-[8rem]  bg-black bg-opacity-50 border-none text-white  rounded-md text-sm focus:outline-none "
          >
            <option value="transactionId_asc">Transaction ↑</option>{" "}
            {/* Ascending */}
            <option value="transactionId_desc">Transaction ↓</option>{" "}
            {/* Descending */}
            <option value="issueDate_asc">Issue Date ↑</option>{" "}
            {/* Ascending */}
            <option value="issueDate_desc">Issue Date ↓</option>{" "}
            {/* Descending */}
            <option value="dueDate_asc">Due Date ↑</option> {/* Ascending */}
            <option value="dueDate_desc">Due Date ↓</option> {/* Descending */}
            <option value="status_asc">Status ↑</option> {/* Ascending */}
            <option value="status_desc">Status ↓</option> {/* Descending */}
            <option value="fineAmount_asc">Fine ↑</option> {/* Ascending */}
            <option value="fineAmount_desc">Fine ↓</option> {/* Descending */}
          </select>
        </div>
      </section>
      {/* Table Section */}
      <section className=" h-[80vh] overflow-y-scroll px-2  scrollbar-hide">
        <table className="min-w-full text-white   bg-black bg-opacity-50 ">
          <thead className="font-playfair text-lg  bg-black  ">
            <tr>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Transaction ID
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Member ID
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Book ID
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Issue Date
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Due Date
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Return Date
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Status
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Fine
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <tr
                key={transaction.transactionId}
                className="bg-black bg-opacity-5 hover:bg-opacity-40  text-center font-lato"
              >
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.transactionId}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.memberId}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.bookId}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.issueDate}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.dueDate}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.returnDate}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.status}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {transaction.fineAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default TransactionsList;
