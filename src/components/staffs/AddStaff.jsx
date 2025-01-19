import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import Select from "react-select"; // Import react-select
import emailjs from "emailjs-com"; // Import emailjs

// eslint-disable-next-line react/prop-types
const AddStaff = ({ setStaffList, staffList }) => {
  const [formData, setFormData] = useState({
    staffId: "", // Auto-generated
    name: "",
    email: "",
    role: "Librarian", // Default role
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Password criteria validation state
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  // Function to generate Staff ID
  const generateStaffId = () => `ST-${staffList.length + 1}`;

  // Update the staffId when the staffList changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      staffId: generateStaffId(),
    }));
  }, [staffList]);

  // Validate password criteria dynamically
  useEffect(() => {
    const { password } = formData;
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  // Function to send a welcome email using EmailJS
  const sendWelcomeEmail = (email) => {
    console.log("sending emai id", email);
    const templateParams = {
      // from_email: "madara28022003@gmail.com", // Add the desired "From" email
      to_email: email, // Recipient's email
      subject: "Welcome to the Library", // Subject line
      staffName: formData.name, // Dynamic value for {{name}}
      // membershipType: formData.membershipType, // Dynamic value for {{membershipType}}
      // membershipStartDate: formData.membershipStartDate, // Dynamic value for {{membershipStartDate}}
      // maxBooksAllowed: formData.maxBooksAllowed, // Dynamic value for {{maxBooksAllowed}}
      role: formData.role,
      password: formData.password,
    };
    emailjs
      .send(
        "service_zge9xdb", // Your EmailJS service ID
        "template_oggiyc8", // Your EmailJS template ID
        templateParams,
        "hPz4nGpY6lMZvDDfQ" // Your EmailJS user ID
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

  //////////////////////////////////////////////
  const roleOptions = [
    { value: "Librarian", label: "Librarian" },
    { value: "Assistant", label: "Assistant" },
  ];

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

  ////////////////////////////////
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number for 10 digits
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Validate email format
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    // Ensure password meets all criteria
    if (!Object.values(passwordCriteria).every(Boolean)) {
      alert("Please ensure the password meets all criteria.");
      return;
    }

    // Check for duplicate passwords in staffList
    const isDuplicatePassword = staffList.some(
      (staff) => staff.password === formData.password
    );
    if (isDuplicatePassword) {
      alert("Password must be unique for each staff member.");
      return;
    }

    // Add the current form data to the staffList
    setStaffList([
      ...staffList,
      {
        ...formData,
      },
    ]);
    sendWelcomeEmail(formData.email);

    // Reset the form with a new auto-generated staffId
    setFormData({
      staffId: generateStaffId(),
      name: "",
      email: "",
      role: "Librarian",
      phoneNumber: "",
      password: "",
    });
    alert("Staff member added successfully!");
  };

  return (
    <main className=" flex flex-col bg-black bg-opacity-40    rounded-md text-white h-full w-full">
      <section className=" h-[8vh] flex justify-center items-center bg-opacity-70 bg-black font-merriweather rounded-t-md uppercase tracking-widest px-4">
        Staff Form
      </section>
      <section className="h-[80vh] font-montserrat flex justify-between items-center max-lg:py-4  px-4 overflow-y-auto scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-around space-y-6"
        >
          <div className="">
            <label className="block text-xl uppercase font-bold">
              Staff ID: {formData.staffId}
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg  font-semibold text-white mb-2">
                Name:
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
                Email:
              </label>
              <input
                type="email"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <label className="block text-lg font-semibold text-white mb-2">
                Role:
              </label>
              <Select
                options={roleOptions}
                value={
                  roleOptions.find((r) => r.value === formData.role) || null
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    role: selectedOption?.value || "",
                  })
                }
                className="w-full font-lato"
                placeholder="Select Role"
                isSearchable={false}
                required
                styles={customStyles}
                menuPlacement="auto"
                menuPortalTarget={document.body}
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Phone Number:
              </label>
              <input
                type="text"
                className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <label className="block text-lg font-semibold  text-white mb-2">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3  bg-black bg-opacity-40 focus:bg-opacity-80 border-none font-lato  rounded-md focus:outline-none "
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute top-[50%] translate-y-[-50%] right-[3%] text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="col-span-1  flex flex-col gap-2">
              <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:gap-3 gap-4 max-lg:p-3 p-4  ">
                <div className="flex justify-start items-center">
                  <span
                    className={` ${
                      passwordCriteria.length
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <FaCircle size={12} />
                  </span>
                  <p className="xl:text-md lg:text-sm max-md:text-md  font-mono pl-3 font-semibold ">
                    Atleast 8 characters
                  </p>
                </div>

                <div className="flex justify-start items-center">
                  <span
                    className={` ${
                      passwordCriteria.uppercase
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <FaCircle size={12} />
                  </span>
                  <p className="xl:text-md lg:text-sm max-md:text-md  font-mono pl-3 font-semibold ">
                    Atleast 1 uppercase letter
                  </p>
                </div>

                <div className="flex justify-start items-center">
                  <span
                    className={` ${
                      passwordCriteria.number
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <FaCircle size={12} />
                  </span>
                  <p className="xl:text-md lg:text-sm max-md:text-md  font-mono pl-3 font-semibold ">
                    Atleast 1 number
                  </p>
                </div>

                <div className="flex justify-start items-center">
                  <span
                    className={` ${
                      passwordCriteria.symbol
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <FaCircle size={12} />
                  </span>
                  <p className="xl:text-md lg:text-sm max-md:text-md  font-mono pl-3 font-semibold ">
                    Atleast 1 symbol
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3  bg-black bg-opacity-80 hover:bg-opacity-40 text-white text-lg font-bold font-mono tracking-widest rounded-md  transition duration-200"
          >
            Add Staff
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddStaff;

// import React, { useState } from "react";
// import emailjs from "emailjs-com";

// export default function AddStaff({ staffList, setStaffList }) {
//   const [staffName, setStaffName] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");

//   // Function to handle staff addition and send email
//   const handleAddStaff = (e) => {
//     e.preventDefault();

//     // Add new staff to the staff list
//     const newStaff = { name: staffName, role, password };
//     setStaffList([...staffList, newStaff]);

//     // Prepare email template data
//     const templateParams = {
//       staffName,
//       role,
//       password,
//     };

//     // Send email using EmailJS
//     emailjs
//       .send(
//         "service_zge9xdb", // Your EmailJS service ID
//         "template_oggiyc8", // Your EmailJS template ID
//         templateParams,
//         "hPz4nGpY6lMZvDDfQ" // Your EmailJS user ID
//       )
//       .then(
//         (response) => {
//           console.log("Email successfully sent!", response);
//         },
//         (error) => {
//           console.error("Failed to send email:", error);
//         }
//       );
//   };

//   return (
//     <div>
//       <h2>Add Staff</h2>
//       <form onSubmit={handleAddStaff}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={staffName}
//             onChange={(e) => setStaffName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Role:</label>
//           <input
//             type="text"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add Staff</button>
//       </form>
//     </div>
//   );
// }
