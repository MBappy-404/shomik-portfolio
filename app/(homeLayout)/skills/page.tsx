import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SkillsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="flex-1 pt-16 w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="py-12 md:py-16 w-full container lg:py-20 bg-gray-100 dark:bg-gray-900">
          <div className=" px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  My Skills
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  A comprehensive overview of my professional capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Tabs Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <Tabs defaultValue="seo" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full dark:bg-gray-800 bg-gray-100 max-w-2xl">
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="content">Content Creation</TabsTrigger>
                  <TabsTrigger value="video">Video Editing</TabsTrigger>
                  <TabsTrigger value="design">Visual Design</TabsTrigger>
                </TabsList>
              </div>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Keyword Research & SERP Analysis",
                      description:
                        "Finding high-value keywords and analyzing search results to optimize content strategy.",
                      proficiency: 90,
                    },
                    {
                      title: "SEO Copywriting & Content Structure",
                      description:
                        "Creating search-optimized content that ranks well and engages readers.",
                      proficiency: 85,
                    },
                    {
                      title: "On-page Optimization",
                      description:
                        "Optimizing meta tags, headers, and content structure for better search visibility.",
                      proficiency: 95,
                    },
                    {
                      title: "Internal Linking & Content Clusters",
                      description:
                        "Building strategic content relationships to boost topical authority.",
                      proficiency: 80,
                    },
                    {
                      title: "SEO Tools Proficiency",
                      description:
                        "Expert with Ubersuggest, Ahrefs, Surfer SEO, RankMath, and more.",
                      proficiency: 85,
                    },
                    {
                      title: "Technical SEO",
                      description:
                        "Understanding and implementing technical optimizations for better crawling and indexing.",
                      proficiency: 75,
                    },
                  ].map((skill, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{skill.title}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Proficiency
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Content Creation Tab */}
              <TabsContent value="content" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Meme-based Carousels",
                      description:
                        "Creating engaging, shareable carousel content with meme-inspired visuals.",
                      proficiency: 95,
                    },
                    {
                      title: "Captions & Hook Writing",
                      description:
                        "Crafting attention-grabbing hooks and compelling captions that drive engagement.",
                      proficiency: 90,
                    },
                    {
                      title: "Trend Research & Content Planning",
                      description:
                        "Identifying and leveraging trending topics for timely, relevant content.",
                      proficiency: 85,
                    },
                    {
                      title: "Storytelling",
                      description:
                        "Weaving narratives that connect with audiences and reinforce brand messaging.",
                      proficiency: 90,
                    },
                    {
                      title: "Content Strategy",
                      description:
                        "Developing comprehensive content plans aligned with business objectives.",
                      proficiency: 80,
                    },
                    {
                      title: "Social Media Management",
                      description:
                        "Managing content calendars and engagement across multiple platforms.",
                      proficiency: 85,
                    },
                  ].map((skill, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{skill.title}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Proficiency
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Video Editing Tab */}
              <TabsContent value="video" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Reels & Shorts",
                      description:
                        "Creating engaging short-form video content for Instagram and YouTube.",
                      proficiency: 90,
                    },
                    {
                      title: "Syncing & Transitions",
                      description:
                        "Implementing smooth transitions and beat-synced edits for dynamic videos.",
                      proficiency: 85,
                    },
                    {
                      title: "Retention-based Edits",
                      description:
                        "Structuring videos to maximize viewer retention and engagement.",
                      proficiency: 80,
                    },
                    {
                      title: "Video Color Grading",
                      description:
                        "Applying consistent color styles to enhance visual appeal.",
                      proficiency: 75,
                    },
                    {
                      title: "Motion Graphics",
                      description:
                        "Creating simple animations and text effects to enhance video content.",
                      proficiency: 70,
                    },
                    {
                      title: "Video Optimization",
                      description:
                        "Optimizing video content for different platforms and search visibility.",
                      proficiency: 85,
                    },
                  ].map((skill, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{skill.title}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Proficiency
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Visual Design Tab */}
              <TabsContent value="design" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Social Media Graphics",
                      description:
                        "Creating eye-catching visuals optimized for social media platforms.",
                      proficiency: 90,
                    },
                    {
                      title: "Thumbnails & Banners",
                      description:
                        "Designing clickable thumbnails and branded channel assets.",
                      proficiency: 85,
                    },
                    {
                      title: "Aesthetic Posts",
                      description:
                        "Creating visually cohesive content that aligns with brand identity.",
                      proficiency: 90,
                    },
                    {
                      title: "Canva & Photoshop",
                      description:
                        "Expert with design tools for creating professional visual content.",
                      proficiency: 85,
                    },
                    {
                      title: "Lifestyle Photography",
                      description:
                        "Capturing authentic moments that tell a brand's story.",
                      proficiency: 80,
                    },
                    {
                      title: "Product Photography",
                      description:
                        "Showcasing products in their best light with professional composition.",
                      proficiency: 75,
                    },
                  ].map((skill, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{skill.title}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Proficiency
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SkillsPage;
