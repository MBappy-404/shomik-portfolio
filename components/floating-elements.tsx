"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = containerRef.current?.children
    if (!elements) return

    Array.from(elements).forEach((element, index) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500/20 rounded-full" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-blue-500/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-pink-500/20 rounded-full" />
      <div className="absolute top-60 left-1/2 w-1 h-1 bg-green-500/20 rounded-full" />
      <div className="absolute top-80 right-1/3 w-2 h-2 bg-yellow-500/20 rounded-full" />
    </div>
  )
};

export default FloatingElements;
