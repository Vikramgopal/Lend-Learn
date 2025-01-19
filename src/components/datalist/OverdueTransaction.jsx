import { useState, useEffect } from "react";

const OverdueTransaction = ({ members, books, transactionsList }) => {
  const [overdueTransactions, setOverdueTransactions] = useState([]);

  // Calculate the fine (for example: 2 rupees per day overdue)
  const calculateFine = (dueDate) => {
    const currentDate = new Date();
    const due = new Date(dueDate);
    const timeDifference = currentDate - due; // in milliseconds
    const daysOverdue = timeDifference / (1000 * 3600 * 24); // Convert to days
    return daysOverdue > 0 ? Math.ceil(daysOverdue) * 2 : 0; // 2 rupees per day overdue
  };

  useEffect(() => {
    const currentDate = new Date();

    // Filter transactions where the due date is before the current date and status is "Issued"
    const overdue = transactionsList
      .filter((transaction) => {
        const dueDate = new Date(transaction.dueDate);
        return dueDate < currentDate && transaction.status === "Issued";
      })
      .map((transaction) => {
        // Get member and book details
        const member =
          members.find((m) => m.memberId === transaction.memberId) || {};
        const book = books.find((b) => b.bookId === transaction.bookId) || {};

        return {
          transactionId: transaction.transactionId,
          memberId: transaction.memberId,
          memberName: member.name || "Unknown",
          memberPhone: member.phoneNumber || "N/A",
          bookId: transaction.bookId,
          bookName: book.title || "Unknown",
          fine: calculateFine(transaction.dueDate),
          dueDate: transaction.dueDate,
          presentDate: currentDate.toISOString().slice(0, 10), // Current date formatted as YYYY-MM-DD
        };
      });

    setOverdueTransactions(overdue);
  }, [transactionsList, members, books]); // Run every time the transactionsList, members, or books change

  return (
    <main className="flex flex-col bg-black bg-opacity-40 rounded-md text-white h-full w-full">
      {/* Heading Section */}
      <section className="h-[8vh] flex justify-center items-center bg-opacity-70 bg-black font-merriweather rounded-t-md uppercase tracking-widest px-4">
        Overdue Transactions
      </section>

      {/* Overdue Transactions section */}
      <section className=" h-[80vh] overflow-y-scroll overflow-x-scroll px-6 py-4 scrollbar-hide">
        {overdueTransactions.length > 0 ? (
          <table className="min-w-full text-white   bg-black bg-opacity-50 ">
            <thead className="font-playfair text-lg bg-black">
              <tr>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Transaction ID
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Member ID
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Member Name
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Phone
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Book ID
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Book Name
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Fine
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Due Date
                </th>
                <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                  Present Date
                </th>
              </tr>
            </thead>
            <tbody>
              {overdueTransactions.map((transaction) => (
                <tr
                  key={transaction.transactionId}
                  className="bg-black bg-opacity-5 hover:bg-opacity-40 font-lato text-center"
                >
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.transactionId}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.memberId}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.memberName}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.memberPhone}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.bookId}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.bookName}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    ₹{transaction.fine}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.dueDate}
                  </td>
                  <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap   px-4 py-2">
                    {transaction.presentDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-300  font-sans text-2xl text-center">
            No overdue transactions found.
          </p>
        )}
      </section>
    </main>
  );
};

export default OverdueTransaction;
