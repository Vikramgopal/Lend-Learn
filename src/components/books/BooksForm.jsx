import { useState, useEffect } from "react";
// import Select from "react-select";

import Select from "react-select";

const BooksForm = ({ booksList, setBooksList }) => {
  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    availableCopies: "",
    rating: "",
  });

  // const generateBookId = () => `BK-${Date.now()}`;
  const generateBookId = () => `BK-${booksList.length + 1}`;

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bookId: generateBookId(),
    }));
  }, [booksList]);

  // Define more than 100 genres here
  const genres = [
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Biography", label: "Biography" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Mystery", label: "Mystery" },
    { value: "Thriller", label: "Thriller" },
    // Add more genres as needed...
  ];

  /////////////////////////
  // Custom styles for react-select
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

  //////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    setBooksList([...booksList, formData]);

    setFormData({
      bookId: generateBookId(),
      title: "",
      author: "",
      genre: "",
      publicationYear: "",
      availableCopies: "",
      rating: "",
    });
    alert("Book added successfully!");
  };

  return (
    <main className=" flex flex-col bg-black bg-opacity-40    rounded-md text-white h-full w-full">
      <section className=" h-[8vh] flex justify-center items-center bg-opacity-70 bg-black rounded-t-md font-merriweather uppercase tracking-widest px-4">
        Book Form
      </section>
      <section className="h-[80vh] font-montserrat flex justify-between items-center  px-4 overflow-y-auto scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-around space-y-6"
        >
          <div className="">
            <label className="block text-xl uppercase font-bold">
              Book ID : {formData.bookId}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg  font-semibold text-white mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Author
              </label>
              <input
                type="text"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <label className="block text-lg font-semibold text-white mb-2">
                Genre
              </label>
              <Select
                options={genres}
                value={
                  formData.genre
                    ? genres.find((g) => g.value === formData.genre)
                    : null // If formData.genre is empty, explicitly set to null to show the placeholder
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    genre: selectedOption?.value || "",
                  })
                }
                required
                className="w-full font-lato"
                placeholder="Select Genre"
                isSearchable
                styles={customStyles} // Apply custom styles here
                menuPlacement="auto" // Automatically adjust placement
                menuPortalTarget={document.body} // Attach dropdown to body to prevent clipping
              />
            </div>

            {/* Publication Year and Available Copies */}
            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Publication Year
              </label>
              <input
                placeholder={`1900-${new Date().getFullYear()}`}
                type="number"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.publicationYear}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publicationYear: Number(e.target.value),
                  })
                }
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Available Copies
              </label>
              <input
                type="number"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.availableCopies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableCopies: Number(e.target.value),
                  })
                }
                min="0"
                required
              />
            </div>

            {/* Rating */}
            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Rating
              </label>
              <input
                type="number"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                min="1"
                max="5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black bg-opacity-80 hover:bg-opacity-40 text-white text-lg font-bold font-mono tracking-widest rounded-md  transition duration-200"
          >
            Add Book
          </button>
        </form>
      </section>
    </main>
  );
};

export default BooksForm;
