"use client"

import { TProject } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"
import { useState, useEffect } from "react"
import { stripHtmlTags } from "@/lib/utils"

const ProjectsPage = () => {
  const [data, setData] = useState<TProject[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetch("https://shomik-server.vercel.app/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`)
        }
        return res.json()
      })
      .then((json) => {
        if (isMounted) setData(json.data ?? [])
      })
      .catch((err) => {
        console.error(err)
        if (isMounted) setError("Failed to load projects.")
      })
    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <main className="flex-1 pt-16 w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20 w-full container bg-gray-100 dark:bg-gray-900">
          <div className="px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase">
                  Featured Projects
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  A showcase of my recent work in content strategy, SEO optimization, and visual storytelling for global brands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Cards Section */}
        <section className="py-20 w-full flex justify-center items-center">
          <div className="container px-4 md:px-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              {data?.slice()?.reverse().map((project, idx) => {
                const excerpt = stripHtmlTags(project.projectDescription);
                const truncatedExcerpt = excerpt.length > 100 ? excerpt.slice(0, 100) + "..." : excerpt;

                return (
                  <ScrollAnimation key={project._id} animation="fade-up" delay={idx * 0.1} className="h-full">
                    <Link href={`/projects/${project._id}`} className="block h-full">
                      <div className="group bg-card border dark:bg-gray-900 border-border/20 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={
                              project.projectImage ||
                              `/placeholder.svg?height=360&width=640&text=${encodeURIComponent(project.projectName)}`
                            }
                            width={640}
                            height={360}
                            alt={project.projectName}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400 ease-in-out"
                          />
                        </div>
                        <div className="p-5 md:p-6 flex flex-col flex-1">
                          <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1.5">
                            {project.category || "General"}
                          </p>
                          <h2 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {project.projectName}
                          </h2>
                          <p className="text-sm xl:text-base text-muted-foreground mb-5 flex-1 line-clamp-3 leading-relaxed">
                            {truncatedExcerpt || "No description available."}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/20 dark:border-gray-700">
                             <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                               Case Study
                             </span>
                            <span className="text-sm 2xl:text-base text-primary font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all duration-300">
                              View Project
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectsPage
