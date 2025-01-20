import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoFingerPrint, IoPerson } from "react-icons/io5";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Login() {
  const [email, setEmail] = useState("vikram@login.com");
  const [password, setPassword] = useState("Vikram@123");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className="h-screen bg-violet-400">
      {/* Logo positioned in the top left corner */}
      <div className="absolute top-5 left-5">
        <Logo />
      </div>

      <section className=" h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-50 px-12 py-8 flex flex-col gap-6 transition-all duration-150 shadow-md rounded-md lg:px-24 lg:py-12 md:px-16 md:py-8 w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
        >
          <h1 className="font-semibold text-2xl text-white  md:text-3xl">
            User Login
          </h1>

          {/* Username Field */}
          <div className="flex flex-col">
            <label
              className="text-white text-xs font-semibold uppercase pb-2"
              htmlFor="email"
            >
              Username
            </label>
            <div className="flex items-center h-12">
              <div className=" flex items-center justify-center h-full w-14 rounded-l-sm bg-black text-white">
                <IoPerson size={24} />
              </div>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full p-2 h-full focus:outline-none border-black text-black border-2 text-md rounded-r-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label
              className="text-white text-xs font-semibold uppercase pb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center h-12">
              <div className=" flex items-center justify-center h-full w-14 rounded-l-sm bg-black text-white">
                <IoFingerPrint size={24} />
              </div>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full p-2  focus:outline-none border-black h-12 text-black border-2 text-md rounded-r-sm"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-150 text-black"
                >
                  {passwordVisible ? (
                    <LuEyeClosed size={20} />
                  ) : (
                    <LuEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="uppercase text-sm font-semibold font-lato tracking-widest bg-white mt-3 w-[40%] py-3 rounded-sm text-black hover:bg-black hover:text-white transition-colors duration-150"
          >
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}
