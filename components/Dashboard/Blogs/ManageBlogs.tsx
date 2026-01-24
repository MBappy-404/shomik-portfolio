/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */

"use client";

import BlogCard from "@/components/BlogCard/BlogCard";

import { TBlog } from "@/types";
import AddBlogsModal from "./AddBlogsModal";


const ManageBlogs = ({ data }: { data: { data: TBlog[] } }) => {
  return (
    <div className="dark:bg-gray-950 p-3 md:p-5 border border-gray-200 dark:border-gray-700 bg-white  rounded-md">
      <div className="  flex justify-between items-center">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Blogs
          </h2>

        </div>
        <AddBlogsModal />
      </div>
      <div className="">
        <div className="max-w-6xl  flex justify-start">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-lg:max-w-3xl max-md:max-w-md mx-auto">
            {data?.data?.slice().reverse().map((blog: TBlog) => <BlogCard blog={blog} key={blog._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
