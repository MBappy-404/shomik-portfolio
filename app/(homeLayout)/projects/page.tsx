/* eslint-disable padding-line-between-statements */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import ProjectsCards from "@/components/ProjectCard/ProjectsCards";
import { TProject } from "@/types";

/* eslint-disable react/jsx-sort-props */
const ProjectsPage = async () => {
  const res = await fetch("https://shomik-server.vercel.app/api/projects");
  const data = await res.json();
  return (
    <div className="bg-white dark:bg-gray-950 md:px-5 px-3 py-10">
      <div className=" mx-auto max-w-[1300px] md:px-5">
      <div className="text-center">
            <h3 className="text-[35px] md:text-4xl font-semibold text-gray-900 dark:text-gray-300">
              PROJECTS
            </h3>
            <div className="flex mt-1 justify-center">
              <div className="w-20 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-5">
          {data?.data?.slice().reverse()?.map((project : TProject, index : number) => (
            <ProjectsCards project={project} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
