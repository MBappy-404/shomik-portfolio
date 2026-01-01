"use client"

import { useState, useEffect } from "react"
import { ArrowUp, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import Link from "next/link"

const FloatingMenu = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  useEffect(() => {
    const menu = document.querySelector(".floating-menu")
    if (!menu) return

    if (isVisible) {
      gsap.to(menu, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      })
    } else {
      gsap.to(menu, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
      })
      setIsMenuOpen(false)
    }
  }, [isVisible])

  useEffect(() => {
    const menuItems = document.querySelectorAll(".menu-item")

    if (isMenuOpen) {
      gsap.to(menuItems, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
    } else {
      gsap.to(menuItems, {
        opacity: 0,
        scale: 0.8,
        y: 10,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.out",
      })
    }
  }, [isMenuOpen])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="floating-menu fixed bottom-8 right-8 z-50 opacity-0 scale-75">
      <div className="flex flex-col items-end space-y-3">
        {/* Menu Items */}
        <div className="flex flex-col space-y-2">
          <Button
            asChild
            className="menu-item h-12 w-12 rounded-full bg-green-600 hover:bg-green-700 shadow-lg opacity-0 scale-75"
            size="icon"
            aria-label="WhatsApp"
          >
            <Link href="https://wa.me/your-number" target="_blank">
              <MessageCircle className="h-5 w-5 text-white" />
            </Link>
          </Button>

          <Button
            asChild
            className="menu-item h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg opacity-0 scale-75"
            size="icon"
            aria-label="Email"
          >
            <Link href="/contact">
              <Mail className="h-5 w-5 text-white" />
            </Link>
          </Button>

          <Button
            onClick={scrollToTop}
            className="menu-item h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg opacity-0 scale-75"
            size="icon"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Main Button */}
        <Button
          onClick={toggleMenu}
          className={`h-14 w-14 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 ${
            isMenuOpen ? "rotate-45" : ""
          }`}
          size="icon"
          aria-label="Toggle menu"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-0.5 bg-white rounded-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-90">
              <div className="w-5 h-0.5 bg-white rounded-full" />
            </div>
          </div>
        </Button>
      </div>
    </div>
  )
};

export default FloatingMenu;
