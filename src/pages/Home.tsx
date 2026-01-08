import { useProfile, useSkills, useProjects, useExperience, useEducation } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Mail, ChevronDown, GraduationCap, Code2, Terminal, Database, Layers } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useProfile();
  const { data: skills, isLoading: isSkillsLoading } = useSkills();
  const { data: projects, isLoading: isProjectsLoading } = useProjects();
  const { data: experience, isLoading: isExperienceLoading } = useExperience();
  const { data: education, isLoading: isEducationLoading } = useEducation();

  if (isProfileLoading || isSkillsLoading || isProjectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-md px-8">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-8">
          <h1 className="text-2xl font-bold text-foreground">Unable to load content</h1>
          <p className="text-muted-foreground">
            {profileError ? String(profileError) : "No profile data available"}
          </p>
          <p className="text-sm text-muted-foreground">
            Please ensure the API server is running and accessible.
          </p>
        </div>
      </div>
    );
  }

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryIcons: Record<string, any> = {
    Frontend: Layers,
    Backend: Database,
    Tools: Terminal,
    Languages: Code2
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation - Simple transparent header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-tight">{profile.name}</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <Button size="sm" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="about" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background image */}
        <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/bg.png')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 z-10 bg-white/40" />

          {/* Background decorative elements */}
          <div className="relative z-20 min-h-screen flex items-center justify-center pt-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                    Software Engineering Graduate
                  </span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground mb-6">
                    Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{profile.name}</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {profile.bio}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {profile.githubUrl && (
                      <Button variant="outline" size="lg" className="rounded-full h-12 px-6 border-2 hover:border-primary/50 hover:bg-primary/5" asChild>
                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-5 w-5" /> GitHub
                        </a>
                      </Button>
                    )}
                    {profile.linkedinUrl && (
                      <Button variant="outline" size="lg" className="rounded-full h-12 px-6 border-2 hover:border-primary/50 hover:bg-primary/5" asChild>
                        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                        </a>
                      </Button>
                    )}
                    {profile.resumeUrl && (
                      <Button variant="outline" size="lg" className="rounded-full h-12 px-6 border-2 hover:border-primary/50 hover:bg-primary/5" asChild>
                        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-5 w-5" /> Resume
                        </a>
                      </Button>
                    )}
                    <Button size="lg" className="rounded-full h-12 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all" asChild>
                      <a href="#contact">
                        <Mail className="mr-2 h-5 w-5" /> Get in Touch
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
                <ChevronDown className="h-6 w-6" />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Technical Arsenal" 
              subtitle="Technologies and tools I've worked with during my academic and personal projects."
              align="center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skillsByCategory || {}).map(([category, items], index) => {
                const Icon = categoryIcons[category] || Code2;
                return (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map(skill => (
                        <span 
                          key={skill.id} 
                          className="px-3 py-1 bg-background rounded-md text-sm font-medium border border-border text-muted-foreground"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Experience Column */}
              <div>
                <SectionHeading title="Experience" />
                {experience && <ExperienceTimeline items={experience} />}
              </div>

              {/* Education Column */}
              <div>
                <SectionHeading title="Education" />
                <div className="space-y-8">
                  {education?.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-all"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                      
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-1">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-display">{edu.school}</h3>
                          <p className="text-lg font-medium text-foreground/80 mt-1">{edu.degree}</p>
                          <p className="text-muted-foreground">{edu.field}</p>
                          <p className="text-sm font-medium text-primary mt-2 inline-block px-2 py-0.5 rounded bg-primary/5">
                            {edu.year}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Featured Projects" 
              subtitle="From university projects to personal experiments, here's what I've worked on."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading 
                  title="Let's Connect" 
                  subtitle="I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
                />
                
                <div className="space-y-6 mt-8">
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-lg">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <span className="text-lg">Open to work in {profile.location}</span>
                  </div>
                </div>
              </div>
              
              {/*   <ContactForm />  */}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
