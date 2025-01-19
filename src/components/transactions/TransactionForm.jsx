import React, { useState, useEffect } from "react";
import Select from "react-select";

const generateTransactionId = (length) => `T-${length + 1}`;

const TransactionForm = ({
  books,
  setBooksList,
  members,
  transactionsList,
  setTransactionsList,
}) => {
  const [formData, setFormData] = useState({
    transactionId: "",

    memberId: "",
    bookId: "",
    status: "Issued", // Default to "Issued"
    issueDate: "",
    dueDate: "",
    returnDate: "",
    fineAmount: 0,
  });

  // Generate Transaction ID
  const generateTransactionId = () => `TX-${transactionsList.length + 1}`;

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      transactionId: generateTransactionId(),
    }));
  }, [transactionsList]);

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (formData.status === "Issued") {
      const today = new Date();
      const defaultDueDate = new Date();
      defaultDueDate.setDate(today.getDate() + 7);

      setFormData((prev) => ({
        ...prev,
        issueDate: today.toISOString().split("T")[0],
        dueDate: defaultDueDate.toISOString().split("T")[0],
        returnDate: "",
        fineAmount: 0,
      }));
    } else if (formData.status === "Return") {
      const lastIssued = [...transactionsList]
        .reverse()
        .find(
          (t) =>
            t.memberId === formData.memberId &&
            t.bookId === formData.bookId &&
            t.status === "Issued"
        );

      if (lastIssued) {
        setFormData((prev) => ({
          ...prev,
          issueDate: lastIssued.issueDate,
          dueDate: lastIssued.dueDate,
          returnDate: new Date().toISOString().split("T")[0],
          fineAmount: calculateFine(
            lastIssued.dueDate,
            new Date().toISOString().split("T")[0]
          ),
        }));
      } else {
        setErrorMessage(
          "No issued transaction found for this book and member."
        );
      }
    }
  }, [formData.status, formData.memberId, formData.bookId]);

  const calculateFine = (dueDate, returnDate) => {
    const due = new Date(dueDate);
    const returned = new Date(returnDate);
    if (returned > due) {
      const overdueDays = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));
      return overdueDays * 2; // $2 per day fine
    }
    return 0;
  };

  const validateTransaction = () => {
    const issuedCount = transactionsList.filter(
      (t) =>
        t.memberId === formData.memberId &&
        t.bookId === formData.bookId &&
        t.status === "Issued"
    ).length;

    const returnedCount = transactionsList.filter(
      (t) =>
        t.memberId === formData.memberId &&
        t.bookId === formData.bookId &&
        t.status === "Return"
    ).length;

    if (formData.status === "Issued" && issuedCount > returnedCount) {
      setErrorMessage("The book is already issued to this member.");
      return false;
    }

    if (formData.status === "Return" && issuedCount <= returnedCount) {
      setErrorMessage("No Book is Issued to this Member");
      return false;
    }

    setErrorMessage("");
    return true;
  };
  /////////////////////

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      border: "none",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.2)"
        : "transparent",
      color: "white",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.6)",
    }),
    input: (base) => ({
      ...base,
      color: "#fff", // Text color for typing in search
    }),
  };

  const memberOptions = members.map((m) => ({
    value: m.memberId,
    label: m.name,
  }));
  const bookOptions = books.map((b) => ({
    value: b.bookId,
    label: b.title,
  }));
  const statusOptions = [
    { value: "Issued", label: "Issue" },
    { value: "Return", label: "Return" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the transaction
    if (!validateTransaction()) {
      // alert("Transaction validation failed. Please check your inputs.");
      return;
    }

    // Update the book's available copies
    const updatedBooks = books.map((book) => {
      if (book.bookId === formData.bookId) {
        const newAvailableCopies =
          formData.status === "Issued"
            ? book.availableCopies - 1
            : book.availableCopies + 1;

        // Ensure availableCopies doesn't go below zero
        if (newAvailableCopies < 0) {
          alert(`No more copies available for the book: ${book.title}`);
          throw new Error("Insufficient copies for the selected book.");
        }

        return {
          ...book,
          availableCopies: newAvailableCopies,
        };
      }
      return book;
    });

    // Update the books list state
    setBooksList(updatedBooks);

    // Add the transaction to the transactions list
    const newTransaction = {
      ...formData,
      transactionId: generateTransactionId(transactionsList.length),
      fineAmount: calculateFine(formData), // Optional fine calculation
    };

    setTransactionsList([...transactionsList, newTransaction]);

    // Reset the form
    setFormData({
      transactionId: generateTransactionId(),

      memberId: "",
      bookId: "",
      status: "Issued",
      issueDate: "",
      dueDate: "",
      returnDate: "",
      fineAmount: 0,
    });

    // Success message
    alert("Transaction added successfully!");
  };

  return (
    <main className=" flex flex-col bg-black bg-opacity-40    rounded-md text-white h-full w-full">
      <section className=" h-[8vh] flex justify-center items-center bg-opacity-70 bg-black rounded-t-md font-merriweather uppercase tracking-widest px-4">
        Transaction Form
      </section>

      {errorMessage && (
        <p className="text-center p-2 text-red-500 bg-white font-mono">
          {errorMessage}
        </p>
      )}

      <section className="h-[80vh] font-montserrat flex justify-between items-center  px-4 overflow-y-auto scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-around space-y-6"
        >
          <div className="">
            <label className="bloc text-xl uppercase font-bold">
              Transaction ID : {formData.transactionId}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg  font-semibold text-white mb-2">
                Member
              </label>
              <Select
                options={memberOptions} // Options for dropdown
                value={
                  formData.memberId
                    ? memberOptions.find((m) => m.value === formData.memberId)
                    : null
                } // Selected value
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    memberId: selectedOption?.value || "",
                  })
                }
                className="w-full font-lato"
                placeholder="Select Member"
                isSearchable
                required
                styles={customStyles} // Apply custom styles here
                menuPlacement="auto" // Automatically adjust placement
                menuPortalTarget={document.body} // Attach dropdown to body to prevent clipping
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg  font-semibold text-white mb-2">
                Book
              </label>
              <Select
                options={bookOptions}
                value={
                  formData.bookId
                    ? bookOptions.find((b) => b.value === formData.bookId)
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    bookId: selectedOption?.value || "",
                  })
                }
                className="w-full font-lato"
                placeholder="Select Book"
                isSearchable
                required
                styles={customStyles}
                menuPlacement="auto" // Automatically adjust placement
                menuPortalTarget={document.body} // Attach dropdown to body to prevent clipping
              />
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <label className="block text-lg font-semibold text-white mb-2">
                Status
              </label>
              <Select
                options={statusOptions}
                value={
                  statusOptions.find((s) => s.value === formData.status) || null
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    status: selectedOption?.value || "",
                  })
                }
                className="w-full font-lato"
                placeholder="Select Status"
                isSearchable={false}
                required
                styles={customStyles}
                menuPlacement="auto" // Automatically adjust placement
                menuPortalTarget={document.body} // Attach dropdown to body to prevent clipping
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Issue Date
              </label>
              <input
                type="date"
                id="issueDate"
                value={formData.issueDate}
                readOnly
                disabled
                className="w-full p-3 text-gray-400 cursor-not-allowed bg-black bg-opacity-40 font-lato focus:bg-opacity-80 border-none rounded-md focus:outline-none "
              />
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <label className="block text-lg font-semibold text-white mb-2">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) =>
                  formData.status === "Issued" &&
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                className={`w-full p-3 bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato rounded-md focus:outline-none ${
                  formData.status === "Return"
                    ? "cursor-not-allowed text-gray-400"
                    : "text-white"
                } custom-date-input`}
                readOnly={formData.status === "Return"}
                disabled={formData.status === "Return"}
              />
            </div>

            {formData.status === "Return" && (
              <div className="col-span-1  flex flex-col gap-2">
                <label className="block text-lg font-semibold  text-white mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  value={formData.returnDate}
                  readOnly
                  disabled
                  className="w-full p-3 text-gray-400 cursor-not-allowed bg-black bg-opacity-40 font-lato focus:bg-opacity-80 border-none rounded-md focus:outline-none "
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black bg-opacity-80 hover:bg-opacity-40 text-white text-lg font-bold font-mono tracking-widest rounded-md  transition duration-200"
          >
            Add Transaction
          </button>
        </form>
      </section>
    </main>
  );
};

export default TransactionForm;
