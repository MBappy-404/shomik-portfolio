"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  useEffect(() => {
    const button = document.querySelector(".scroll-to-top-btn")
    if (!button) return

    if (isVisible) {
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    } else {
      gsap.to(button, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isVisible])

  const scrollToTop = () => {
    // Add a little bounce animation when clicked
    const button = document.querySelector(".scroll-to-top-btn")
    if (button) {
      gsap.to(button, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      className="scroll-to-top-btn fixed bottom-8 right-8 z-50 h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 scale-75"
      size="icon"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 text-white" />
    </Button>
  )
}

export default ScrollToTop
