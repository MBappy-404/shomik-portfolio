"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right"
  delay?: number
  duration?: number
  threshold?: string
  className?: string
}

const ScrollAnimation = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  threshold = "80%",
  className = "",
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let animationProps = {}

    switch (animation) {
      case "fade-up":
        animationProps = { opacity: 0, y: 50 }
        break
      case "fade-in":
        animationProps = { opacity: 0 }
        break
      case "scale":
        animationProps = { opacity: 0, scale: 0.8 }
        break
      case "slide-left":
        animationProps = { opacity: 0, x: -50 }
        break
      case "slide-right":
        animationProps = { opacity: 0, x: 50 }
        break
      default:
        animationProps = { opacity: 0, y: 50 }
    }

    gsap.fromTo(
      element,
      animationProps,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${threshold}`,
          toggleActions: "play none none none",
        },
      }
    )
  }, [animation, delay, duration, threshold])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default ScrollAnimation
