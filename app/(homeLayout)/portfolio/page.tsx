"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TProject } from "@/types" // Assuming you have this type defined
import { ArrowRight } from "lucide-react"

const PortfolioPage = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://shomik-server.vercel.app/api/projects");
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }
        const data = await res.json();
        if (data?.data && Array.isArray(data.data)) {
          setProjects(data.data);
          const uniqueCategories = Array.from(new Set(data.data.map((p: TProject) => p.category).filter(Boolean))) as string[];
          setCategories(uniqueCategories);
        } else {
          setProjects([]);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getBadgeVariant = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "seo":
        return "default";
      case "content":
        return "secondary";
      case "visual":
        return "outline";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-center px-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="flex-1 pt-16 w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
    

        <section className="py-12 md:py-16 w-full container lg:py-20 bg-gray-100 dark:bg-gray-900">
          <div className=" px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                My Work
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                A showcase of my projects across SEO, content creation, and visual design..
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Tabs Section */}
        <section className="py-12 md:py-16 flex flex-col items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <Tabs defaultValue="all" className="w-full">
              {projects.length > 0 && (
                <div className="flex justify-center mb-8">
                  <TabsList className={`grid grid-cols-1 md:grid-cols-4 ${categories.length > 1 ? `sm:grid-cols-${Math.min(categories.length + 1, 4)}` : 'sm:grid-cols-2'} dark:bg-gray-800 bg-gray-100 w-full max-w-3xl`}>
                    <TabsTrigger value="all" className="text-sm ">All Work</TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category.toLowerCase()} className="text-sm">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              )}

              {/* All Work Tab */}
              <TabsContent value="all" className="space-y-8">
                {projects.length === 0 && !loading && (
                  <p className="text-center text-muted-foreground">No projects found.</p>
                )}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects?.slice()?.reverse()?.map((project) => (
                    <Link key={project._id} href={`/projects/${project._id}`} className="block h-full">
                      <Card className="overflow-hidden group h-full flex flex-col">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={project.projectImage || "/placeholder.png"}
                            alt={project.projectName}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg md:text-xl   group-hover:text-primary transition-colors">{project.projectName}</h3>
                            {project.category && (
                              <Badge variant={getBadgeVariant(project.category)} className="text-xs md:text-sm  ">
                                {project.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                            {project.projectDescription?.replace(/<[^>]*>/g, "") || "No description available."}
                          </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-2 mt-auto">
                          <span className="text-xs md:text-sm  text-primary font-medium group-hover:underline flex items-center gap-1">
                            View Details
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 xl:w-5 xl:h-5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              {/* Category Specific Tabs */}
              {categories.map((category) => (
                <TabsContent key={category} value={category.toLowerCase()} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.filter(p => p.category?.toLowerCase() === category.toLowerCase()).map((project) => (
                       <Link key={project._id} href={`/projects/${project._id}`} className="block h-full">
                        <Card className="overflow-hidden group h-full flex flex-col">
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={project.projectImage || "/placeholder.png"}
                              alt={project.projectName}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4 flex-grow">
                             <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg md:text-xl xl:text-2xl group-hover:text-primary transition-colors">{project.projectName}</h3>
                              {project.category && (
                                <Badge variant={getBadgeVariant(project.category)} className="text-xs md:text-sm xl:text-base">
                                  {project.category}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm md:text-base xl:text-lg text-muted-foreground line-clamp-2">
                              {project.projectDescription?.replace(/<[^>]*>/g, "") || "No description available."}
                            </p>
                          </CardContent>
                          <CardFooter className="p-4 pt-2 mt-auto">
                            <span className="text-xs md:text-sm xl:text-base text-primary font-medium group-hover:underline flex items-center gap-1">
                              View Details
                              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 xl:w-5 xl:h-5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                    {projects.filter(p => p.category?.toLowerCase() === category.toLowerCase()).length === 0 && (
                       <p className="col-span-full text-center text-muted-foreground">No projects found in this category.</p>
                    )}
                          </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
       
    </div>
  )
}

export default PortfolioPage;
