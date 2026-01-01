"use client";

 
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
 
import { usePathname } from "next/navigation";
import ThemeSwitch from "./theme-switch";
import cn from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();
  const [scrollY, setScrollY] = useState(0);

  const sections = [
    {
      name: "Home",
      pathname: "/",
    },
 
    {
      name: "About",
      pathname: "/about",
    },
    {
      name: "Blogs",
      pathname: "/blogs",
    },
    {
      name: "SKills",
      pathname: "/skills",
    },
    {
      name: "Projects",
      pathname: "/portfolio",
    },
    {
      name: "Services",
      pathname: "/services",
    },
    {
      name: "Contact",
      pathname: "/contact",
    },
  ];

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrollY > 50
            ? "bg-background/80 backdrop-blur-sm border-b dark:border-none dark:shadow-md dark:shadow-gray-700 border-border/40 py-4"
            : "py-6"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold relative group">
            
            <span className="text-[#773fd8]">Shomik</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6c2bd9] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {sections.map((section: any) => (
              <Link
                key={section?.pathname}
                href={`${section?.pathname}`}
                className={cn(
                  "text-sm uppercase tracking-wider hover:text-[#6c2bd9] transition-colors relative",
                  pathName === section?.pathname
                    ? "text-[#6c2bd9]"
                    : "text-muted-[#0a0a0d]"
                )}
              >
                {section?.name}
                {pathName === section?.pathname && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6c2bd9]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeSwitch />

            {/* Mobile menu button */}
            <button
              className="md:hidden dark:text-white text-[#0a0a0d] p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {sections.map((section: any) => (
                <Link
                  key={section?.pathname}
                  href={`${section?.pathname}`}
                  className={cn(
                    "text-2xl font-medium hover:text-[#6c2bd9] transition-colors",
                    pathName === section?.pathname
                      ? "text-[#6c2bd9]"
                      : "text-muted-[#0a0a0d]"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {section?.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
