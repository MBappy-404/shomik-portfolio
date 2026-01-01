"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://shomik-server.vercel.app/api/projects/${projectId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch project: ${res.status}`);
        }
        const data = await res.json();
        setProject(data?.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching project.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <Link href="/portfolio">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Project not found</p>
          <Link href="/portfolio">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pt-10 md:pt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/portfolio">
            <Button variant="ghost" className="gap-2 hover:bg-muted">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-video md:aspect-[21/9]">
            <Image
              src={project.projectImage}
              alt={project.projectName}
              fill
              className="object-cover border-4 dark:border-gray-800/50 rounded-xl transition-all duration-300 border-primary/20"
              priority
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.category && (
                <Badge variant="secondary" className="text-sm">
                  {project.category}
                </Badge>
              )}
              {project.createdAt && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(project.createdAt), "MMMM d, yyyy")}
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {project.projectName}
            </h1>
            <p className="text-sm md:text-base 2xl:text-lg text-muted-foreground mb-6">
              {project.projectDescription}
            </p>
            {/* Only show project.link if present */}
            {project.link && (
              <div className="mb-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 text-primary font-medium transition-colors border border-primary/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Link
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Only: Features and Technologies if present */}
        <div className="space-y-8">
          {/* Features Section */}
          {project.features && project.features.length > 0 && (
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Section */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
