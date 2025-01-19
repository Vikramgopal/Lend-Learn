import React, { useState } from "react";

const BooksList = ({ booksList }) => {
  const [filter, setFilter] = useState(""); // State for the filter input
  const [sortConfig, setSortConfig] = useState({
    key: "title", // Default sort by title
    direction: "asc", // Default direction is ascending
  });

  // Filter books based on the filter input
  const filteredBooks = booksList.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase()) ||
      book.genre.toLowerCase().includes(filter.toLowerCase()) ||
      book.rating.toString().includes(filter) // Filter by rating (it may be a number)
  );

  // Sorting function
  const sortedBooks = filteredBooks.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle special case for publicationYear and rating (numbers)
    if (
      sortConfig.key === "publicationYear" ||
      sortConfig.key === "availableCopies" ||
      sortConfig.key === "rating"
    ) {
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
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Search by Title, Author, Genre, or Rating"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border  bg-black bg-opacity-50 outline-none border-none text-sm text-white rounded-md w-1/3 focus:outline-none "
          whitespace-nowrap
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
            <option value="title_asc">Title ↑</option> {/* Ascending */}
            <option value="title_desc">Title ↓</option> {/* Descending */}
            <option value="author_asc">Author ↑</option> {/* Ascending */}
            <option value="author_desc">Author ↓</option> {/* Descending */}
            <option value="publicationYear_asc">Year ↑</option>{" "}
            {/* Ascending */}
            <option value="publicationYear_desc">Year ↓</option>{" "}
            {/* Descending */}
            <option value="availableCopies_asc">Copies ↑</option>{" "}
            {/* Ascending */}
            <option value="availableCopies_desc">Copies ↓</option>{" "}
            {/* Descending */}
            <option value="rating_asc">Rating ↑</option> {/* Ascending */}
            <option value="rating_desc">Rating ↓</option> {/* Descending */}
          </select>
        </div>
      </section>

      {/* Table */}
      <section className=" h-[80vh] overflow-y-scroll px-2  scrollbar-hide">
        <table className="min-w-full text-white   bg-black bg-opacity-50 ">
          <thead className="font-playfair text-lg  bg-black  ">
            <tr>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                ID
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Title
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Author
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Genre
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Published Year
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Copies
              </th>
              <th className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book, index) => (
              <tr
                key={book.bookId}
                className="bg-black bg-opacity-5 hover:bg-opacity-40 font-lato text-center"
              >
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.bookId}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.title}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.author}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.genre}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.publicationYear}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.availableCopies}
                </td>
                <td className="border-2 border-neutral-light border-opacity-50  whitespace-nowrap px-4 py-2">
                  {book.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default BooksList;
