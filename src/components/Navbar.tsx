import { Link, useLocation } from "react-router-dom";
import logoPng from "../assets/navLogo.png";
import logoTextPng from "../assets/textLogo.png";
import { useEffect, useState } from "react";
export default function Navbar() {
  const location = useLocation();
  const [arLanguage, setArLanguage] = useState<boolean>(
    JSON.parse(window.localStorage.getItem("ar") || "false")
  );
  useEffect(() => {
    setArLanguage(JSON.parse(window.localStorage.getItem("ar") || "false"));
  }, []);
  return (
    <nav
    dir="rtl"
    >
      <div className=" sm:px-8 px-3 py-5 flex justify-between items-center  bg-navy text-gold z-5">
        <div className="flex">
          <Link to={"/"}>
            <img src={logoPng} alt="logo" className="inline ml-4 h-8 sm:h-10" />
          </Link>
          <img
            src={logoTextPng}
            alt="logo"
            className="inline ml-2 h-8 mt-1 sm:h-10 sm:mt-0"
          />
        </div>
        <div>
          {location.pathname === "/manual-calculation" ? (
            <Link
              to={"/"}
              className="h-8 sm:h-10 py-2 px-4  rounded-lg bg-gold text-navy text-xs sm:text-lg hover:bg-orange-50 transition-all"
            >
              {arLanguage ? "الرئيسية" : "Back"}
            </Link>
          ) : (
            <Link
              to={"/manual-calculation"}
              className="h-8 sm:h-10 py-2 px-4  rounded-lg bg-gold text-navy text-xs sm:text-lg hover:bg-orange-50  transition-all"
            >
              {arLanguage ? "الحساب يدويََا " : "Manual Calculation"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
