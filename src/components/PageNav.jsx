import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import User from "./User";
import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
// import styles from "./PageNav.module.css";

function PageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <main className="">
      <nav className="flex items-center px-[2%]  bg-violet-400 justify-between h-[12vh]">
        <Logo />
        <div className="max-lg:hidden">
          <User />
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden flex items-center text-white pr-4 text-2xl"
        >
          {isMenuOpen ? <RxCross1 size={30} /> : <GiHamburgerMenu size={30}/>}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="bg-violet-400 ">
          {" "}
          <MobileSidebar closeMenu={toggleMenu} />
        </div>
      )}
    </main>
  );
}

export default PageNav;
