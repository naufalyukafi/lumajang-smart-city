import React from "react";
import { NavLink } from "react-router-dom";

const SidebarPertanahan = ({ open }) => {
  return (
    <div
      className={`${
        open && "hidden"
      } laptop:flex laptop:overflow-hidden bg-white pt-14`}
    >
      <aside
        id="sidebar"
        className="fixed z-20 min-h-full top-0 left-0 pt-16 laptop:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <NavLink
                    to="/saran-aduan"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Fasilitasi Pertanahan
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SidebarPertanahan;
