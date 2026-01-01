/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

 
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Button } from "@heroui/button";

const Dashboard = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-start">
        <Sidebar open={open} />

        <Button
          isIconOnly
          radius="sm"
          color="primary"
          variant="flat"
          onPress={() => setOpen(!open)}
          className="lg:hidden -translate-y-5  w-8 h-9 z-[999] fixed top-[36px] left-[10px]   cursor-pointer    flex items-center justify-center  outline-none transition-all duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 fill-gray-800 dark:fill-gray-300"
            viewBox="0 0 55.752 55.752"
          >
            <path
              d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
              data-original="#000000"
            />
          </svg>
        </Button>

        <section className="  w-full ">
          <Header session={session} />

          <div className="my-10 px-2">{children}</div>
          
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
