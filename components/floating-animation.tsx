"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface FloatingAnimationProps {
  children: React.ReactNode
  duration?: number
  distance?: number
  delay?: number
  className?: string
}

const FloatingAnimation = ({
  children,
  duration = 3,
  distance = 15,
  delay = 0,
  className = "",
}: FloatingAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    gsap.to(element, {
      y: `-=${distance}`,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    })
  }, [distance, duration, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
};

export default FloatingAnimation;
