"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";
import parse from "html-react-parser";

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<any>(null);
  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch main project
        const projectRes = await fetch(`https://shomik-server.vercel.app/api/projects/${projectId}`);
        if (!projectRes.ok) throw new Error(`Failed to load project: ${projectRes.status}`);
        const projectData = await projectRes.json();
        setProject(projectData.data);

        // Fetch all projects for suggestions
        const allProjectsRes = await fetch(`https://shomik-server.vercel.app/api/projects`);
        if (allProjectsRes.ok) {
          const allProjectsData = await allProjectsRes.json();
          if (allProjectsData.data && Array.isArray(allProjectsData.data)) {
            const filtered = allProjectsData.data
              .filter((p: any) => p._id !== projectId)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            setSuggestedProjects(filtered);
          }
        }
      } catch (err: any) {
        console.error('Error fetching project data:', err);
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-2">{error || "Project Not Found"}</h2>
        <Link href="/projects" className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <section className="relative pt-24 pb-10 min-h-[80vh]">
      <div className="mx-auto px-2 md:px-8">
        <div className="relative max-w-5xl xl:max-w-7xl mx-auto rounded-3xl overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 animate-fade-in-up">
          <div className="relative z-10 p-2 md:p-10 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Badge
                variant="secondary"
                className="w-fit px-3 py-1.5 text-xs md:text-sm font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground hover:bg-primary/90 transition-all duration-300 uppercase tracking-wide animate-fade-in"
              >
                {project.category || "Case Study"}
              </Badge>
              {project.createdAt && (
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(project.createdAt), "MMMM d, yyyy")}
                </span>
              )}
            </div>

            <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm text-left animate-fade-in delay-100">
              {project.projectName}
            </h1>

            <div className="w-full md:aspect-[13/6] rounded-xl overflow-hidden shadow-sm animate-fade-in delay-200">
              <Image
                src={project.projectImage}
                alt={project.projectName}
                className="object-cover w-full h-full"
                width={1200}
                height={600}
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-4 mt-2 animate-fade-in delay-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200 shadow-md">
                  {project.projectName?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Shomik Ujzaman
                  </span>
                  <span className="block text-xs text-gray-400">Author</span>
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-sm hover:shadow-primary/30 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </a>
              )}
            </div>

            <hr className="my-2 border-t border-gray-200 dark:border-gray-700 animate-fade-in delay-400" />

            <div className="prose max-w-none leading-8 text-[#4A4A4A] dark:prose-invert dark:text-[#E0E0E0]">
              <div className="blog-content text-gray-800 dark:text-gray-200">
                {project.projectDescription && parse(project.projectDescription)}
              </div>
            </div>

            {/* Suggested Projects section */}
            <div className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-purple-600 w-2 h-8 rounded-full"></span>
                You may also like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {suggestedProjects.length > 0 ? (
                  suggestedProjects.map((sProject: any) => (
                    <Link href={`/projects/${sProject._id}`} key={sProject._id}>
                      <div className="group rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={sProject.projectImage}
                            alt={sProject.projectName}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
                          <div className="absolute top-4 left-4">
                            <span className="inline-block rounded-full bg-white/90 dark:bg-gray-900/90 text-xs font-semibold text-gray-700 dark:text-gray-300 px-3 py-1 shadow-md">
                              {sProject.category || "Project"}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {sProject.projectName}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                            Learn more about this case study and findings.
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No other projects available at this time.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
