"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";


// Define a type for the expected URL parameters
type PageParams = { id: string };

const BlogDetailsPage = () => {
  const params = useParams<PageParams>(); // Get params using the hook
  const id = params?.id; // Extract id, params can be null initially or if not found

  const [blog, setBlog] = useState<any>(null);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Don't fetch if ID is not available

      try {
        setLoading(true);
        setError(null);

        // Fetch main blog
        const blogRes = await fetch(
          `https://shomik-server.vercel.app/api/blogs/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: "no-store",
          }
        );

        if (!blogRes.ok) {
          throw new Error(`Failed to load blog: ${blogRes.status}`);
        }

        const blogData = await blogRes.json();

        if (!blogData.data) {
          throw new Error('Blog data not found');
        }

        setBlog(blogData.data);

        // Fetch all blogs for suggestions
        const allBlogsRes = await fetch(
          `https://shomik-server.vercel.app/api/blogs`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: "no-store",
          }
        );

        if (allBlogsRes.ok) {
          const allBlogsData = await allBlogsRes.json();
          if (allBlogsData.data && Array.isArray(allBlogsData.data)) {
            // Filter out current blog and get random 3 blogs
            const filteredBlogs = allBlogsData.data
              .filter((b: any) => b._id !== id)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            setSuggestedBlogs(filteredBlogs);
          } else {
            console.warn('Suggested blogs data is not in expected format:', allBlogsData);
            setSuggestedBlogs([]);
          }
        } else {
          console.warn(`Failed to fetch suggested blogs: ${allBlogsRes.status}`);
          setSuggestedBlogs([]); // Set to empty if fetch fails
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Dependency array ensures this effect runs when `id` changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Blog Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400">
          The blog you are looking for does not exist.
        </p>
        <Link
          href="/blogs"
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Blogs
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
                className="w-fit px-3 py-1.5 text-xs md:text-sm font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90  text-primary-foreground hover:bg-primary/90 transition-all duration-300 uppercase tracking-wide animate-fade-in"
              >
                {blog?.category ?? "Uncategorized"}
              </Badge>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {blog?.createdAt
                  ? format(new Date(blog.createdAt), "d MMMM yyyy")
                  : "Unknown date"}{" "}
                &nbsp;|&nbsp; BY{" "}
                <span className="font-semibold uppercase tracking-wide">
                  {blog?.author ?? "Unknown"}
                </span>
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm animate-fade-in delay-100 text-left">
              {blog?.title ?? "No Title Available"}
            </h1>
            <div className="w-full md:aspect-[13/6] rounded-xl overflow-hidden   animate-fade-in delay-200">
              <Image
                src={blog?.blogImage}
                alt={blog?.title ?? "Blog image"}
                className="object-cover w-full h-full"
                width={900}
                height={400}
                priority
              />
            </div>
            <div className="flex items-center gap-3 mt-2 animate-fade-in delay-300">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200 shadow-md">
                {blog?.author?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {blog?.author ?? "Unknown"}
                </span>
                <span className="block text-xs text-gray-400">Author</span>
              </div>
            </div>
            <hr className="my-2 border-t border-gray-200 dark:border-gray-700 animate-fade-in delay-400" />
            <div className="prose max-w-none leading-8 text-[#4A4A4A] dark:prose-invert dark:text-[#E0E0E0]">
              <div className="blog-content text-gray-800 dark:text-gray-200">
                {parse(blog.description)}
              </div>
            </div>

            {/* Suggestion blogs section */}
            <div className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-purple-600 w-2 h-8 rounded-full"></span>
                You may also like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {suggestedBlogs.length > 0 ? (
                  suggestedBlogs.map((suggestedBlog: any) => (
                    <Link href={`/blogs/${suggestedBlog._id}`} key={suggestedBlog._id}>
                      <div className="group rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={suggestedBlog.blogImage}
                            alt={suggestedBlog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
                          <div className="absolute top-4 left-4">
                            <span className="inline-block rounded-full bg-white/90 dark:bg-gray-900/90 text-xs font-semibold text-gray-700 dark:text-gray-300 px-3 py-1 shadow-md">
                              {suggestedBlog.category || "Uncategorized"}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 md:p-6">
                          <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors duration-300">
                            {suggestedBlog.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                            {suggestedBlog.description?.replace(/<[^>]*>/g, '').slice(0, 150)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200">
                                {suggestedBlog.author?.[0]?.toUpperCase() || "?"}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{suggestedBlog.author || "Unknown"}</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {suggestedBlog.createdAt ? format(new Date(suggestedBlog.createdAt), "MMM d, yyyy") : "Unknown date"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No suggested blogs available</p>
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

export default BlogDetailsPage;