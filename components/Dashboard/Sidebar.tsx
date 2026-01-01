/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaEnvelopeOpenText, FaTable } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { UploadCloudIcon } from "lucide-react";

const Sidebar = ({ open }: { open: boolean }) => {
  const pathname = usePathname();
  const sidebarItems = [
    {
      title: "Manage Projects",
      link: "/dashboard/manage-projects",
      icon: <FaListAlt className="md:text-[18px] dark:text-gray-200 text-gray-500 mr-2" />,
    },
    {
      title: "Manage Blogs",
      link: "/dashboard/manage-blogs",
      icon: <FaTable className="md:text-[18px] dark:text-gray-200 text-gray-500 mr-2" />,
    },
    {
      title: "Manage Messages",
      link: "/dashboard/manage-message",
      icon: <FaEnvelopeOpenText className="md:text-[18px] dark:text-gray-200 text-gray-500 mr-2" />,
    },
    {
      title: "Upload Profile",
      link: "/dashboard/upload-profile",
      icon: <UploadCloudIcon className="md:text-[18px] dark:text-gray-200 text-gray-500 mr-2" />,
    },
  ];

  return (
    <div>
      <nav className="lg:min-w-[250px]">
        <div
          className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[10] 
          lg:min-w-[250px] lg:w-max transition-transform duration-300 ease-in-out 
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="pt-8 pb-2 px-6 sticky top-0 bg-white dark:bg-gray-900 min-h-[80px] z-[100]">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              Dashboard
            </h2>
          </div>

          <div className="py-6 px-6">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index + 1}>
                  <Link href={item.link} className={`flex items-center px-3 py-3 rounded-md text-sm 
                    ${pathname === item.link ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"} text-gray-800 dark:text-gray-200`}
                  >
                    {item.icon}
                    <span className="text-gray-900 dark:text-gray-100">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

