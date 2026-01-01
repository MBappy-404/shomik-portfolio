"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex  flex-col items-center">
      <main className="flex-1 w-full pt-16   flex flex-col items-center justify-center">
        {/* Hero Section */}

        <section className="py-10 md:py-16 w-full container lg:py-20 bg-gray-100 dark:bg-gray-900">
          <div className=" px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  My Services
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Comprehensive solutions to elevate your brand's digital presence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16 flex flex-col items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {[
                {
                  title: "SEO Blog Writing",
                  description:
                    "High-quality, search-optimized blog content that ranks and engages.",
                  features: [
                    "Keyword research and topic selection",
                    "SEO-optimized structure and formatting",
                    "Meta descriptions and title tags",
                    "Internal linking strategy",
                    "Readability optimization",
                  ],
                  cta: "Get Started",
                },
                {
                  title: "On-Page SEO Optimization",
                  description:
                    "Technical improvements to boost your search visibility and rankings.",
                  features: [
                    "Comprehensive site audit",
                    "Meta tag optimization",
                    "Header structure improvements",
                    "Image optimization",
                    "Schema markup implementation",
                  ],
                  cta: "Learn More",
                  featured: true,
                },
                {
                  title: "Content Creation for Socials",
                  description:
                    "Engaging posts that stop the scroll and drive meaningful engagement.",
                  features: [
                    "Platform-specific content strategy",
                    "Carousel and meme creation",
                    "Caption and hook writing",
                    "Hashtag research",
                    "Engagement optimization",
                  ],
                  cta: "Get Started",
                },
                {
                  title: "Content Calendars & Strategy",
                  description:
                    "Comprehensive planning for consistent brand messaging and growth.",
                  features: [
                    "Content audit and gap analysis",
                    "Editorial calendar development",
                    "Content pillar identification",
                    "Trend research and implementation",
                    "Performance tracking framework",
                  ],
                  cta: "Learn More",
                },
                {
                  title: "Video Editing for Reels & Shorts",
                  description:
                    "Attention-grabbing short-form video content that drives engagement.",
                  features: [
                    "Concept development",
                    "Retention-optimized editing",
                    "Music selection and syncing",
                    "Text overlay and captions",
                    "Platform-specific optimization",
                  ],
                  cta: "Get Started",
                },
                {
                  title: "Photography & Visual Design",
                  description:
                    "Professional visuals that elevate your brand identity and messaging.",
                  features: [
                    "Product photography",
                    "Lifestyle content creation",
                    "Brand asset development",
                    "Social media graphics",
                    "Visual identity consistency",
                  ],
                  cta: "Learn More",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className={service.featured ? "border-primary shadow-md" : ""}
                >
                  {/* {service.featured && (
                    <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Popular
                    </div>
                  )} */}
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/contact">
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-16 bg-muted/30 flex flex-col items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  My Process
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  How I work with clients to deliver exceptional results.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-4 justify-center">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "Understanding your brand, goals, audience, and current challenges.",
                },
                {
                  step: "02",
                  title: "Strategy",
                  description:
                    "Developing a tailored plan based on research and best practices.",
                },
                {
                  step: "03",
                  title: "Creation",
                  description:
                    "Producing high-quality content and implementing optimizations.",
                },
                {
                  step: "04",
                  title: "Refinement",
                  description:
                    "Analyzing performance and making data-driven improvements.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 flex flex-col items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Let's discuss how I can help your brand grow with strategic
                  content and SEO.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center items-center">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Contact Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/portfolio">View My Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
