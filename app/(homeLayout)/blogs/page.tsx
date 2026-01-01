"use client"

import { TBlog } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"
import { useState, useEffect } from "react"

const BlogsPage = () => {
  const [data, setData] = useState<TBlog[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetch("https://shomik-server.vercel.app/api/blogs")
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
        if (isMounted) setError("Failed to load blogs.")
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
          <p className="text-muted-foreground text-sm">Loading blogs...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col items-center bg-background dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <main className="flex-1 pt-16 w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20 w-full container   bg-gray-100 dark:bg-gray-900">
          <div className=" px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Latest Blogs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Explore expert tips, industry insights, and creative inspiration for content, SEO, and digital marketing.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        {/* Blog Cards Section */}
        <section className="py-20 w-full flex justify-center items-center">
          <div className="container px-4 md:px-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              {data?.slice()?.reverse().map((blog, idx) => {
                const plainDescription = blog.description?.replace(/<[^>]*>/g, "") || "";
                const excerpt = plainDescription.length > 100 ? plainDescription.slice(0, 100) + "..." : plainDescription;

                return (
                <ScrollAnimation key={blog._id} animation="fade-up" delay={idx * 0.1} className="h-full">
                  <Link href={`/blogs/${blog._id}`} className="block h-full">
                  <div className="group bg-card border dark:bg-gray-900 border-border/20 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden"> {/* Changed aspect ratio */}
                      <Image
                        src={
                          blog.blogImage ||
                          `/placeholder.svg?height=360&width=640&text=${encodeURIComponent(blog.title)}`
                        }
                        width={640}
                        height={360}
                        alt={blog.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400 ease-in-out"
                      />
                      {/* Optional: Badge can be re-added here if desired, styled differently */}
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1.5">
                        {blog.category || "General"}
                      </p>
                      <h2 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-sm xl:text-base text-muted-foreground mb-5 flex-1 line-clamp-3 leading-relaxed">
                        {excerpt || "No description available."}
                      </p>
                      <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/20 dark:border-gray-700 ">
                        <div>
                          <p className="text-xs 2xl:text-sm font-medium text-foreground/90">{blog.author || "Shomik"}</p>
                          <p className="text-xs xl:text-sm text-muted-foreground">
                            {blog.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Date N/A"}
                          </p>
                        </div>
                        <span className="text-sm 2xl:text-base text-primary font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all duration-300">
                          Read
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                </ScrollAnimation>
              )})}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default BlogsPage
