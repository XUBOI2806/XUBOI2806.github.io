import { type Project } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden border-border/50 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
          {/* <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.repoUrl && (
              <Button size="sm" variant="secondary" asChild className="rounded-full">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> Code
                </a>
              </Button>
            )}
            {project.projectUrl && (
              <Button size="sm" asChild className="rounded-full">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Demo
                </a>
              </Button>
            )}
          </div> */}
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold font-display">{project.title}</h3>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
