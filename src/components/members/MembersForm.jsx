import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com"; // Import emailjs
import Select from "react-select";

// // export default MembersForm;
const MembersForm = ({ membersList, setMembersList }) => {
  const [formData, setFormData] = useState({
    name: "",
    memberId: "",
    password: "",
    email: "",
    phoneNumber: "",
    membershipStartDate: new Date().toISOString().split("T")[0],
    membershipType: "Basic",
    maxBooksAllowed: 2,
  });

  // const generateMemberId = () => `MB-${uuidv4().slice(0, 8)}`; // Generate a unique ID
  const generateMemberId = () => `MB-${membersList.length + 1}`; // Generate a unique ID

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      memberId: generateMemberId(),
    }));
  }, [membersList]);

  const handleMembershipTypeChange = (value) => {
    const maxBooks = value === "Basic" ? 2 : value === "Premium" ? 5 : 10;
    setFormData({
      ...formData,
      membershipType: value,
      maxBooksAllowed: maxBooks,
    });
  };
  // Function to send a welcome email using EmailJS
  const sendWelcomeEmail = (email) => {
    console.log("sending emai id", email);
    const templateParams = {
      // from_email: "madara28022003@gmail.com", // Add the desired "From" email
      to_email: email, // Recipient's email
      subject: "Welcome to the Library", // Subject line
      name: formData.name, // Dynamic value for {{name}}
      membershipType: formData.membershipType, // Dynamic value for {{membershipType}}
      membershipStartDate: formData.membershipStartDate, // Dynamic value for {{membershipStartDate}}
      maxBooksAllowed: formData.maxBooksAllowed, // Dynamic value for {{maxBooksAllowed}}
    };
    emailjs
      .send(
        "service_zge9xdb", // Replace with your service ID
        "template_9pcyrnc", // Replace with your template ID
        templateParams,
        "hPz4nGpY6lMZvDDfQ" // Replace with your user ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.error("Error sending email:", error);
        }
      );
  };
  /////////////////////////////////

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
  };

  const membershipOptions = [
    { value: "Basic", label: "Basic" },
    { value: "Premium", label: "Premium" },
    { value: "Elite", label: "Elite" },
  ];
  /////////////////////////////////

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedEmail = membersList.some(
      (mails) => mails.email === formData.email
    );

    if (selectedEmail) {
      alert("Email is Already Exists.");
      return;
    }

    setMembersList([...membersList, formData]);
    // / Send welcome email
    sendWelcomeEmail(formData.email);
    setFormData({
      memberId: generateMemberId(),
      name: "",
      email: "",
      phoneNumber: "",
      membershipStartDate: new Date().toISOString().split("T")[0],
      membershipType: "Basic",
      maxBooksAllowed: 2,
    });

    alert("Member added successfully!");
  };

  return (
    <main className=" flex flex-col bg-black bg-opacity-40    rounded-md text-white h-full w-full">
      <section className=" h-[8vh] flex justify-center items-center bg-opacity-70 bg-black font-merriweather rounded-t-md uppercase tracking-widest px-4">
        Member Form
      </section>
      <section className="h-[80vh] font-montserrat flex justify-between items-center  px-4 overflow-y-auto scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-around space-y-6"
        >
          <div className="">
            <label className="block text-xl uppercase font-bold">
              Member ID : {formData.memberId}
            </label>
            {/* <p className="text-gray-600">{formData.memberId}</p> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg  font-semibold text-white mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3  bg-black bg-opacity-40 font-lato focus:bg-opacity-80 border-none rounded-md focus:outline-none "
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full p-3  bg-black bg-opacity-40 font-lato focus:bg-opacity-80 border-none rounded-md focus:outline-none "
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: Number(e.target.value),
                  })
                }
                maxLength="10"
                pattern="\d{10}"
                required
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Membership Start Date
              </label>
              <input
                type="date"
                className="w-full p-3 text-gray-400 cursor-not-allowed bg-black bg-opacity-40 font-lato focus:bg-opacity-80 border-none rounded-md focus:outline-none "
                value={formData.membershipStartDate}
                readOnly
                disabled
              />
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <label className="block text-lg font-semibold text-white mb-2">
                Membership Type
              </label>
              <Select
                options={membershipOptions}
                value={
                  membershipOptions.find(
                    (option) => option.value === formData.membershipType
                  ) || null
                }
                onChange={(selectedOption) =>
                  handleMembershipTypeChange(selectedOption?.value || "")
                }
                className="w-full font-lato "
                placeholder="Select Membership Type"
                isSearchable={false}
                required
                styles={customStyles}
                menuPlacement="auto" // Automatically adjust placement
                menuPortalTarget={document.body} // Attach dropdown to body to prevent clipping
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Max Books Allowed
              </label>
              <input
                type="number"
                className="w-full p-3 text-gray-400 cursor-not-allowed bg-black font-lato bg-opacity-40 focus:bg-opacity-80 border-none rounded-md focus:outline-none "
                value={formData.maxBooksAllowed}
                readOnly
                disabled
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3  bg-black bg-opacity-80 hover:bg-opacity-40 text-white text-lg font-bold font-mono tracking-widest rounded-md  transition duration-200"
          >
            Add Member
          </button>
        </form>
      </section>
    </main>
  );
};

export default MembersForm;
