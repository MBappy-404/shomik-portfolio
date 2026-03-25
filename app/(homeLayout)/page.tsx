"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Play, Star, Users, Award, TrendingUp, MousePointer, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PageTransition from "@/components/page-transition"
import ParallaxSection from "@/components/parallax-section"
import ScrollAnimation from "@/components/scroll-animation"
import AnimatedCounter from "@/components/animated-counter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Hero from "@/components/Hero/Hero"


gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const skillsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [selectedCert, setSelectedCert] = useState<{ image: string; title: string } | null>(null)

  useEffect(() => {

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
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col  overflow-hidden">
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Stats Section */}
          <ParallaxSection speed={0.3}>
            <section ref={statsRef} className="py-20 bg-muted/30 dark:bg-muted/10 flex justify-center">
              <div className="container px-4 md:px-6">
                <ScrollAnimation animation="fade-up">
                  <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter text-center mb-12 reveal-text">
                    The <span className="text-primary">Numbers</span> Speak for Themselves
                  </h2>
                </ScrollAnimation>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { icon: Users, value: 15, suffix: "+", label: "Happy Clients" },
                    { icon: Award, value: 10, suffix: "+", label: "Projects Done" },
                    { icon: TrendingUp, value: 95, suffix: "%", label: "Success Rate" },
                    { icon: Star, value: 5, suffix: "/5", label: "Client Rating" },
                  ].map((stat, index) => (
                    <div key={index} className="stat-item text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white mb-4">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ParallaxSection>

          {/* Skills Section */}
          <section ref={skillsRef} className="py-24 relative flex justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container px-4 md:px-6 relative z-10">
              <ScrollAnimation animation="fade-up">
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-primary/20">
                    My Expertise
                  </Badge>
                  <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter mb-4 reveal-text">
                    Where{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Creativity
                    </span>{" "}
                    Meets Strategy
                  </h2>
                  <p className="text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground max-w-3xl mx-auto">
                    I combine technical SEO knowledge with creative content production to deliver results that both rank
                    and resonate.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "SEO Expertise",
                    description:
                      "From keyword research to on-page optimization, I help your content climb the search rankings.",
                    icon: "🔍",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Content Creation",
                    description:
                      "Engaging social media content, captivating blogs, and scroll-stopping visuals that convert.",
                    icon: "✨",
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Visual Storytelling",
                    description: "Video editing, photography, and graphic design that tells your brand's unique story.",
                    icon: "🎬",
                    gradient: "from-orange-500 to-red-500",
                  },
                ].map((skill, index) => (
                  <ScrollAnimation key={index} animation="scale" delay={index * 0.2}>
                    <Card className="skill-card h-full group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <CardContent className="p-8 relative z-10 h-full flex flex-col">
                        <div className="text-4xl mb-4">{skill.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                          {skill.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section with Parallax */}
          <ParallaxSection speed={0.2} direction="horizontal">
            <section className="py-24 relative overflow-hidden flex justify-center bg-muted/20">
              <div className="container px-4 md:px-6">
                <ScrollAnimation animation="fade-up">
                  <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-primary/20">
                      My Process
                    </Badge>
                    <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter mb-4 reveal-text">
                      How I <span className="text-primary">Work</span>
                    </h2>
                    <p className="text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground max-w-2xl mx-auto">
                      A streamlined approach to delivering exceptional results for your brand
                    </p>
                  </div>
                </ScrollAnimation>

                <div className="grid gap-8 md:grid-cols-4">
                  {[
                    {
                      step: "01",
                      title: "Research",
                      description: "Deep dive into your industry, audience, and competitors",
                      delay: 0,
                    },
                    {
                      step: "02",
                      title: "Strategy",
                      description: "Develop a tailored plan based on data-driven insights",
                      delay: 0.2,
                    },
                    {
                      step: "03",
                      title: "Creation",
                      description: "Craft compelling content optimized for search and engagement",
                      delay: 0.4,
                    },
                    {
                      step: "04",
                      title: "Optimization",
                      description: "Continuously refine based on performance metrics",
                      delay: 0.6,
                    },
                  ].map((item, index) => (
                    <ScrollAnimation key={index} animation="fade-up" delay={item.delay}>
                      <div className="relative">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {item.step}
                          </div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -z-10 transform -translate-x-8" />
                        )}
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>
          </ParallaxSection>

          {/* Testimonials Section */}
          <section className="py-24 relative overflow-hidden flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

            <div className="container px-4 md:px-6 relative z-10">
              <ScrollAnimation animation="fade-up">
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-primary/20">
                    Testimonials
                  </Badge>
                  <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter mb-4 reveal-text">
                    What My <span className="text-primary">Clients</span> Say
                  </h2>
                  <p className="text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Don't just take my word for it — here's what clients have to say about working with me
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    quote:
                      "Shomik's SEO expertise transformed our online presence. Our organic traffic increased by 200% in just three months.",
                    name: "Sarah Johnson",
                    title: "Marketing Director",
                    company: "TechStart Inc.",
                  },
                  {
                    quote:
                      "The content strategy Shomik developed for us has been a game-changer. Our engagement rates have never been higher.",
                    name: "Michael Chen",
                    title: "Social Media Manager",
                    company: "Brand Elevate",
                  },
                  {
                    quote:
                      "Working with Shomik was effortless. He understood our vision immediately and delivered beyond our expectations.",
                    name: "Priya Patel",
                    title: "Founder",
                    company: "Wellness Collective",
                  },
                ].map((testimonial, index) => (
                  <ScrollAnimation key={index} animation="fade-up" delay={index * 0.2}>
                    <Card className="h-full bg-background/50 backdrop-blur-sm border border-muted dark:border-gray-700">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="text-4xl text-primary mb-4">"</div>
                        <p className="text-muted-foreground flex-grow italic mb-6">{testimonial.quote}</p>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}, {testimonial.company}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>

          {/* Certification Section */}
          <section className="py-24 flex justify-center items-center w-full ">
            <div className="container px-4 md:px-6">
              <ScrollAnimation animation="fade-up">
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-primary/20 mx-auto">
                    Certifications
                  </Badge>
                  <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter mb-4 reveal-text">
                    Professional <span className="text-primary">Certifications</span>
                  </h2>
                  <p className="text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Validated expertise through industry-recognized certifications
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Google Digital Marketing",
                    org: "HubSpot",
                    year: "2023",
                    image: "/Google-Digital-Marketing.png",
                    color: "from-orange-500 to-pink-500",
                    link: "https://www.coursera.org/account/accomplishments/professional-cert/A9UNPJO371TK"
                  },
                  {
                    title: "Adobe Digital Marketing",
                    org: "Google",
                    year: "2024",
                    image: "/Adobe-Digital-Marketing.png",
                    color: "from-blue-500 to-cyan-500",
                    link: "https://www.coursera.org/account/accomplishments/verify/QUPD1AFFUDNM"
                  },

                  {
                    title: "Increase SEO Traffic",
                    org: "Meta",
                    year: "2023",
                    image: "/Increase-SEO-Traffic.png",
                    color: "from-green-500 to-emerald-500",
                    link: "https://www.coursera.org/account/accomplishments/verify/MBJPFI93GZOZ"
                  },
                  {
                    title: "Google Technical Support",
                    org: "SEMRush",
                    year: "2023",
                    image: "/Technical-Support.png",
                    color: "from-purple-500 to-indigo-500",
                    link: "https://www.coursera.org/account/accomplishments/verify/7066L954M0AP"
                  },

                ].map((cert, idx) => (
                  <ScrollAnimation key={idx} animation="scale" delay={idx * 0.15}>
                    <Link href={cert?.link} target="_blank"

                      className="group block relative rounded-2xl overflow-hidden bg-background border border-muted dark:border-gray-700 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer"
                    >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                      {/* Content */}
                      <div className="p-6 flex flex-col items-center text-center">
                        {/* Image Container */}
                        <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-muted/50">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Text Content */}
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                          {cert.title}
                        </h3>
                        {/* <p className="text-sm text-muted-foreground mb-2">
                          {cert.org} &middot; {cert.year}
                        </p> */}

                        {/* Hover Effect Line */}
                        <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-500" />
                      </div>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>

              {/* Certificate Modal */}
              <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
                <DialogContent className="max-w-4xl w-[90vw] p-0 bg-transparent border-none">
                  <div className="relative w-full z-10   aspect-[4/3] rounded-2xl overflow-hidden bg-background/95 backdrop-blur-sm border border-white/20 shadow-2xl">
                    {selectedCert && (
                      <>
                        <button
                          onClick={() => setSelectedCert(null)}
                          className="absolute top-4 z-10  right-4 p-2 translate-x-[11px]  -translate-y-3 rounded-full dark:bg-gray-700 bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <Image
                          src={selectedCert.image}
                          alt={selectedCert.title}
                          fill
                          className="object-contain p-8"
                        />
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* CTA Section */}
          <ParallaxSection speed={0.2} scale={true} className="overflow-hidden">
            <section className="py-24 relative flex justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600" />
              <div className="absolute inset-0 bg-black/20" />

              <div className="container px-4 md:px-6 relative z-10 overflow-hidden">
                <ScrollAnimation className="overflow-hidden" animation="fade-up">
                  <div className="text-center text-white overflow-hidden">
                    <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter mb-6 reveal-text">
                      Ready to elevate your brand's digital presence?
                    </h2>
                    <p className="text-sm md:text-base xl:text-lg 2xl:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
                      Let's collaborate to create content that ranks, engages, and converts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="bg-white text-primary hover:bg-white/90 shadow-lg group"
                      >
                        <Link href="/contact">
                          Start Your Project
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-white/10 dark:text-white text-gray-600 hover:text-white hover:bg-white/10"
                      >
                        <Link href="/portfolio">View Portfolio</Link>
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </section>
          </ParallaxSection>
        </main>
      </div>
    </PageTransition>
  )
}

export default Home;
