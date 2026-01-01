import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/page-transition";
import ScrollAnimation from "@/components/scroll-animation";
import SocialLinks from "@/components/social-links";
import ParallaxSection from "@/components/parallax-section";

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <main className="flex-1 pt-16 w-full flex flex-col items-center justify-center">
          {/* Hero Section */}
   

          <section className="py-12 md:py-16 lg:py-20 w-full container   bg-gray-100 dark:bg-gray-900">
            <div className=" px-4 md:px-6 flex flex-col items-center">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    About Me
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Get to know the person behind the content and SEO strategies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
                <ScrollAnimation
                  animation="slide-right"
                  className="relative aspect-square overflow-hidden rounded-lg    md:order-last"
                >
                  <Image
                    src="/shomikAbout.jpg"
                    width={600}
                    height={600}
                    alt="Shomik Ujzaman"
                    className="object-cover"
                  />
                </ScrollAnimation>
                <ScrollAnimation animation="slide-left" className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter">
                      Shomik Ujzaman
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Content Creator</Badge>
                      <Badge>SEO Specialist</Badge>
                      <Badge>Visual Storyteller</Badge>
                    </div>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      I'm a passionate digital creative who blends storytelling
                      with SEO. My journey started with content creation and
                      visual design, and now I'm focused on helping brands grow
                      through organic search.
                    </p>
                    <p>
                      Whether it's crafting a high-ranking blog or producing an
                      engaging reel, I focus on the sweet spot where visibility
                      meets creativity. I work best at the intersection of
                      content, performance, and aesthetics — creating strategies
                      that get seen and remembered.
                    </p>
                  </div>
                  <SocialLinks />
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Fun Facts Section */}
          <ParallaxSection speed={0.2}>
            <section className="py-12 md:py-16 bg-muted/30">
              <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <ScrollAnimation animation="fade-up" className="space-y-4">
                    <h3 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold">Fun Facts</h3>
                    <ul className="space-y-3 text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground">
                      <li className="flex items-start">
                        <svg
                          className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        Coffee enthusiast with a preference for light roasts
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        Amateur photographer who never leaves home without a
                        camera
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        Avid reader with a growing collection of marketing books
                      </li>
                    </ul>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animation="fade-up"
                    delay={0.2}
                    className="space-y-4"
                  >
                    <h3 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold">My Tools</h3>
                    <ul className="space-y-3 text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground">
                      <li className="flex items-start">
                        <svg
                          className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        SEO: Ahrefs, Ubersuggest, Surfer SEO, RankMath
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        Design: Canva, Adobe Photoshop, Figma
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        Video: Adobe Premiere Pro, CapCut, InShot
                      </li>
                    </ul>
                  </ScrollAnimation>
                </div>
              </div>
            </section>
          </ParallaxSection>

          {/* Journey Timeline */}
          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <ScrollAnimation
                animation="fade-up"
                className="flex flex-col items-center text-center space-y-4 mb-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tighter">
                    My Creative Journey
                  </h2>
                  <p className="text-sm md:text-base xl:text-lg 2xl:text-xl text-muted-foreground">
                    The path that led me to where I am today.
                  </p>
                </div>
              </ScrollAnimation>
              <div className="relative mx-auto max-w-3xl border-l dark:border-gray-700  border-muted-foreground/20 pl-8 md:pl-12">
                {[
                  {
                    year: "2018",
                    title: "Started Content Creation",
                    description:
                      "Began creating content for social media platforms and developing my visual style.",
                  },
                  {
                    year: "2019",
                    title: "Discovered SEO",
                    description:
                      "Learned the fundamentals of search engine optimization and began applying them to content.",
                  },
                  {
                    year: "2020",
                    title: "Expanded to Video Content",
                    description:
                      "Started creating short-form video content for brands across multiple platforms.",
                  },
                  {
                    year: "2021",
                    title: "Specialized in SEO Strategy",
                    description:
                      "Focused on developing comprehensive SEO strategies for content marketing.",
                  },
                  {
                    year: "Present",
                    title: "Full-Service Content & SEO",
                    description:
                      "Providing end-to-end content creation and SEO services for brands across industries.",
                  },
                ].map((item, index) => (
                  <ScrollAnimation
                    key={index}
                    animation="fade-up"
                    delay={index * 0.1}
                    className="mb-10 relative"
                  >
                    <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border border-primary bg-background" />
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
