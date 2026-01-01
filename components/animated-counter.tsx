"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return

    const counter = { value: 0 }

    gsap.to(counter, {
      value: end,
      duration,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(counter.value)),
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
  }, [end, duration])

  return (
    <span ref={counterRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
};

export default AnimatedCounter;
