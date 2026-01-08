import { type Experience } from "@shared/schema";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceTimelineProps {
  items: Experience[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  // Sort by ID assuming higher ID is more recent, or we could sort by date string parsing if needed
  // For now we assume the API returns them in correct order or reverse order of creation
  const sortedItems = [...items].reverse();

  return (
    <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-12 py-4">
      {sortedItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-primary/20">
            <Briefcase className="h-2.5 w-2.5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-bold font-display text-foreground">{item.position}</h3>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mt-1 sm:mt-0">
              {item.period}
            </span>
          </div>
          
          <div className="text-lg font-medium text-muted-foreground mb-4">
            {item.company}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
