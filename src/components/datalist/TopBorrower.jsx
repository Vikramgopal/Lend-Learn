import React, { useState, useEffect } from "react";

const TopBorrower = ({ transactionsList, members }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7); // Default to current month and year
    setSelectedMonth(currentMonth);
  }, []);

  const getTopBorrowers = () => {
    if (!selectedMonth) return [];

    // Filter transactions for the selected month and "Issued" status
    const filteredTransactions = transactionsList.filter((transaction) => {
      const issueMonth = new Date(transaction.issueDate)
        .toISOString()
        .slice(0, 7);
      return issueMonth === selectedMonth && transaction.status === "Issued";
    });

    // Group transactions by memberId and include book names
    const borrowDetails = {};
    filteredTransactions.forEach((transaction) => {
      if (!borrowDetails[transaction.memberId]) {
        borrowDetails[transaction.memberId] = {
          count: 0,
          books: [],
        };
      }
      borrowDetails[transaction.memberId].count += 1;
      borrowDetails[transaction.memberId].books.push(transaction.bookName);
    });

    // Map memberId to member details and sort by borrow count
    const sortedBorrowers = Object.entries(borrowDetails)
      .map(([memberId, { count, books }]) => {
        const member = members.find((m) => m.memberId === memberId);
        return {
          memberId,
          name: member?.name || "Unknown",
          email: member?.email || "Unknown",
          phone: member?.phoneNumber || "N/A",
          borrowCount: count,
          books, // Including borrowed books here
        };
      })
      .sort((a, b) => b.borrowCount - a.borrowCount)
      .slice(0, 10); // Get top 10 members

    return sortedBorrowers;
  };

  const toggleExpandRow = (memberId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const topBorrowers = getTopBorrowers();

  return (
    <main className="flex flex-col bg-black bg-opacity-40 rounded-md text-white h-full w-full">
      {/* Heading Section */}
      <section className="h-[8vh] flex justify-center items-center bg-opacity-70 bg-black font-merriweather rounded-t-md uppercase tracking-widest px-4">
        Top Borrowers
      </section>

      {/* Borrowers section */}
      <section className="h-[80vh]  font-montserrat px-6  py-4">
        <div className="max-w-4xl   mx-auto">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2">
              Select Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-3 bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato rounded-md focus:outline-none text-white custom-date-input"
            />
          </div>

          {topBorrowers.length > 0 ? (
            <div className=" overflow-y-scroll overflow-x-scroll   scrollbar-hide ">
              <table className="min-w-full text-white bg-black bg-opacity-50">
                <thead className="font-playfair text-lg bg-black">
                  <tr>
                    <th className="border-2 border-neutral-light border-opacity-50 px-4 whitespace-nowrap py-2">
                      #
                    </th>
                    <th className="border-2 border-neutral-light border-opacity-50 px-4 whitespace-nowrap py-2">
                      Member ID
                    </th>
                    <th className="border-2 border-neutral-light border-opacity-50 px-4 whitespace-nowrap py-2">
                      Name
                    </th>
                    <th className="border-2 border-neutral-light border-opacity-50 px-4 whitespace-nowrap py-2">
                      Email
                    </th>
                    <th className="border-2 border-neutral-light border-opacity-50 px-4 whitespace-nowrap py-2">
                      Phone
                    </th>
                    <th className="border-2 border-neutral-light border-opacity-50 px-4 whitespace-nowrap py-2">
                      Borrow Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topBorrowers.map((borrower, index) => (
                    <tr
                      key={borrower.memberId}
                      className="bg-black bg-opacity-5 hover:bg-opacity-40 font-lato     text-center"
                    >
                      <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                        {index + 1}
                      </td>{" "}
                      <td className="border-2 border-neutral-light border-opacity-50   whitespace-nowrap  px-4 py-2">
                        {borrower.memberId}
                      </td>
                      <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                        {borrower.name}
                      </td>
                      <td className="border-2 border-neutral-light border-opacity-50   whitespace-nowrap  px-4 py-2">
                        {borrower.email}
                      </td>
                      <td className="border-2 border-neutral-light border-opacity-50   whitespace-nowrap  px-4 py-2">
                        {borrower.phone}
                      </td>
                      <td className="border-2 border-neutral-light border-opacity-50   whitespace-nowrap  px-4 py-2">
                        {borrower.borrowCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-300  font-sans text-2xl text-center">
              No transactions found for the selected month.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default TopBorrower;
