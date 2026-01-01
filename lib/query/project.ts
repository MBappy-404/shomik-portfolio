/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */

export async function addProject(formData: FormData) {
  const response = await fetch(
    "https://shomik-server.vercel.app/api/projects/create-project",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data;
}

export async function updateProject(formData: FormData, projectId: string) {
  const response = await fetch(
    `https://shomik-server.vercel.app/api/projects/${projectId}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteProject(projectId: string) {
  const response = await fetch(
    `https://shomik-server.vercel.app/api/projects/${projectId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
}
export async function addBlog(formData: FormData) {
  const response = await fetch("https://shomik-server.vercel.app/api/blogs/create-blog", {
    method: "POST",
    body: formData,
    credentials: "include", 
  });

  const data = await response.json();
  return data;
}

export async function updateBlog(formData: FormData, blogId: string) {
  const response = await fetch(`https://shomik-server.vercel.app/api/blogs/${blogId}`, {
    method: "PUT",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export async function deleteBlog(id: string) {
  const response = await fetch(`https://shomik-server.vercel.app/api/blogs/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

export async function addMessage(message : any) {
  const response = await fetch(
    "https://shomik-server.vercel.app/api/message/create-message",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );
  const data = await response.json();
  return data;
}
export async function getALlMessage() {
  const response = await fetch("https://shomik-server.vercel.app/api/message", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function createAdmin(adminData: any) {
  const response = await fetch("https://shomik-server.vercel.app/api/admin/create-admin", {
    method: "POST",
     headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
  });
  const data = await response.json();
  return data;
}
