"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Play, Star, Users, Award, TrendingUp, MousePointer, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PageTransition from "@/components/page-transition"
import FloatingElements from "@/components/floating-elements"
import SocialLinks from "@/components/social-links"
import FloatingAnimation from "@/components/floating-animation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)


  // State for profile image
  const [profileImage, setProfileImage] = useState<string>("")
  const [isImageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    // Fetch profile image from API
    const fetchProfileImage = async () => {
      try {
        const response = await fetch("https://shomik-server.vercel.app/api/profile")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Check different possible response structures
        if (data.data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].profileImage) {
          setProfileImage(data.data[0].profileImage)
        } else if (data.data && data.data.profileImage) {
          setProfileImage(data.data.profileImage)
        } else if (data.profileImage) {
          setProfileImage(data.profileImage)
        } else if (Array.isArray(data) && data.length > 0 && data[0].profileImage) {
          setProfileImage(data[0].profileImage)
        }
      } catch (error) {
        console.error("Error fetching profile image:", error)
        // Keep using default image if API fails
      } finally {
        setImageLoading(false)
      }
    }

    fetchProfileImage()

    // Hero animations
    const tl = gsap.timeline()
    tl.fromTo(".hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(
        ".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-social", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.8, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", repeat: -1, yoyo: true },
        "-=0.4",
      )

    // Skills animation
    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Stats animation
    gsap.fromTo(
      ".stat-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Continuous hero image animation
    gsap.to(".hero-image", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Parallax background effect
    gsap.to(".parallax-bg", {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    // Text reveal animation for headings
    gsap.utils.toArray(".reveal-text").forEach((text: any) => {
      gsap.fromTo(
        text,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col  overflow-hidden">
        <main className="flex-1">
          {/* Hero Section */}
          <section ref={heroRef} className="relative min-h-screen py-20 lg:py-28 flex items-center justify-center overflow-hidden">
            <FloatingElements />

            {/* Parallax Background */}
            <div className="absolute inset-0 parallax-bg bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="flex flex-col gap-8">
                  <div className="space-y-6">
                    <Badge className="hero-badge w-fit bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-primary/20 hover:bg-gradient-to-r hover:from-primary/20 hover:to-purple-600/20">
                      <Star className="w-3 h-3 mr-1" />
                      Content Creator & SEO Specialist
                    </Badge>

                    <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tighter">
                      <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                        Shomik
                      </span>
                      <br />
                      <span className="text-foreground">Ujzaman</span>
                    </h1>

                    <p className="hero-subtitle text-base md:text-xl xl:text-2xl 2xl:text-3xl text-muted-foreground font-medium">
                      I help brands <span className="text-primary font-semibold">rank</span>,{" "}
                      <span className="text-purple-600 font-semibold">engage</span>, and{" "}
                      <span className="text-pink-600 font-semibold">grow</span> — one scroll, one search at a time.
                    </p>
                  </div>

                  <p className="hero-description text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground leading-relaxed">
                    I'm a Creative Content Creator, SEO Specialist, and Visual Storyteller. I blend SEO strategy with
                    visual creativity to help brands stand out in search and social.
                  </p>

                  <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="/portfolio">
                        <Play className="mr-2 h-4 w-4" />
                        View My Work
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-2 hover:bg-primary/5 border-gray-200 dark:border-gray-700 transition-all duration-300"
                    >
                      <Link href="/contact">Let's Collaborate</Link>
                    </Button>
                  </div>

                  <div className="hero-social">
                    <SocialLinks />
                  </div>
                </div>

                <div className="relative">
                  <FloatingAnimation distance={20} duration={4}>
                    <div className="hero-image relative mx-auto aspect-square w-full max-w-lg">
                      {/* Gradient Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 p-1 animate-pulse">
                        <div className="h-full w-full rounded-full bg-background" />
                      </div>

                      {/* Profile Image - Dynamic */}
                      <div className="absolute inset-2 rounded-full overflow-hidden">
                        {isImageLoading ? (
                          // Simple loading state - same design as before
                          <div className="h-full w-full bg-gradient-to-br from-primary/10 via-purple-600/10 to-pink-600/10 flex items-center justify-center">
                            <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
                          </div>
                        ) : (
                          <Image
                            src={profileImage || "/shomik.png"}
                            width={600}
                            height={600}
                            alt="Shomik Ujzaman"
                            className="h-full w-full object-cover"
                            priority
                            onError={(e) => {
                              // If API image fails to load, fallback to default
                              e.currentTarget.src = "/shomik.png"
                            }}
                          />
                        )}
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        Available for hire
                      </div>
                    </div>
                  </FloatingAnimation>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div
              ref={scrollIndicatorRef}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground"
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <MousePointer className="h-5 w-5 animate-bounce" />
            </div>
          </section>

        </main>
      </div>
    </PageTransition>
  )
}

export default Home