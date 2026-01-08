import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className={`h-1.5 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full mt-4 ${align === "center" ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
