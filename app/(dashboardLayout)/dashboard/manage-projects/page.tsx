/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */

import ManageProject from "@/components/Dashboard/Projects/ManageProject";

const ManageProjectPage = async () => {
  const res = await fetch("https://shomik-server.vercel.app/api/projects");
  const data = await res.json();
  
   
  
  return (
    <div>
      <ManageProject data={data} />
    </div>
  );
};

export default ManageProjectPage;
