"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      setScrollProgress(scrollPercent)
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  useEffect(() => {
    const button = document.querySelector(".scroll-progress-btn")
    const progressRing = document.querySelector(".progress-ring")

    if (!button || !progressRing) return

    if (isVisible) {
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
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

    // Update progress ring
    const circumference = 2 * Math.PI * 18 // radius = 18
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

    gsap.to(progressRing, {
      strokeDashoffset,
      duration: 0.1,
      ease: "none",
    })
  }, [isVisible, scrollProgress])

  const scrollToTop = () => {
    const button = document.querySelector(".scroll-progress-btn")
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
    <div className="scroll-progress-btn fixed bottom-8 right-8 z-50 opacity-0 scale-75">
      <div className="relative">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 transform -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground/20"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 18}`}
            strokeDashoffset={`${2 * Math.PI * 18}`}
            className="progress-ring transition-all duration-300"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Button */}
        <Button
          onClick={scrollToTop}
          className="relative h-10 w-10 md:w-12 md:h-12  rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 text-white transition-transform group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </div>
  )
};

export default ScrollProgress;
