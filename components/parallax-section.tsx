"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  scale?: boolean
}

const ParallaxSection = ({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical",
  reverse = false,
  scale = false,
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const directionMultiplier = reverse ? -1 : 1
    const moveAmount = 50 * speed * directionMultiplier

    const animationProps: any = {}

    if (direction === "vertical") {
      animationProps.y = -moveAmount
    } else {
      animationProps.x = -moveAmount
    }

    if (scale) {
      animationProps.scale = reverse ? 1.1 : 0.9
    }

    const toProps: any = {}

    if (direction === "vertical") {
      toProps.y = moveAmount
    } else {
      toProps.x = moveAmount
    }

    if (scale) {
      toProps.scale = reverse ? 0.9 : 1.1
    }

    gsap.fromTo(element, animationProps, {
      ...toProps,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [speed, direction, reverse, scale])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

export default ParallaxSection
