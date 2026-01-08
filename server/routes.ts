import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API ROUTES ===

  app.get(api.profile.get.path, async (_req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.experience.list.path, async (_req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "Felix Xu",
      title: "Software Engineer Graduate",
      bio: "Aspiring software engineer with strong software engineering fundamentals in Artificial Intelligence and problem solving. Passionate about creating immersive experiences with cutting edge technology and user focused design.",
      location: "Melbourne, Australia",
      email: "felixxu8@gmail.com",
      githubUrl: "https://github.com/XUBOI2806",
      linkedinUrl: "https://www.linkedin.com/in/felix-xu-eng/",
      resumeUrl: "https://drive.google.com/file/d/1LF798q2MsP5mEbUYdB211Ycu2qzXegXd/view?usp=drive_link",
    });

    const skills = [
      { name: "JavaScript", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Express", category: "Backend" },
      { name: "PostgreSQL", category: "Backend" },
      { name: "Python", category: "Languages" },
      { name: "C++", category: "Languages" },
      { name: "C#", category: "Languages" },
      { name: "Git", category: "Tools" },
      { name: "Docker", category: "Tools" },
    ];
    for (const skill of skills) {
      await storage.createSkill(skill);
    }

    const projects = [
      {
        title: "Valorant Chatbot",
        description: "A full-featured online store with product listings, cart functionality, and payment processing integration.",
        imageUrl: "/valorant_coach.png",
        technologies: ["LangChain", "Next.js", "PostgreSQL"],
        projectUrl: "#",
        repoUrl: "#"
      },
      {
        title: "TabSaver",
        description: "Collaborative task manager with real-time updates and team features.",
        imageUrl: "/tabsaver.png",
        technologies: ["Next.js", "PostgreSQL", "Stripe"],
        projectUrl: "#",
        repoUrl: "#"
      },
      {
        title: "NorthStar Website",
        description: "Developed a chatbot feature for QEERIAI's NorthStar, an AI-powered platform redefining career planning and workforce development.",
        imageUrl: "/northstar.png",
        technologies: ["Azure", "API", "Chart.js"],
        projectUrl: "#",
        repoUrl: "#"
      },
      {
        title: "Kitsunetic",
        description: "A roguelike game built using Unity where the player is a shape-shifting Kitsune who operates a cyber repair store by day and gathers materials at night.",
        imageUrl: "/kitsunetic.png",
        technologies: ["Unity", "Maya"],
        projectUrl: "#",
        repoUrl: "#"
      },
      {
        title: "VR Soccer Simulation",
        description: "Supported a PhD research study on VR sports training by creating a realistic soccer simulation environment.",
        imageUrl: "/vr.jpg",
        technologies: ["Unity", "VR", "Python"],
        projectUrl: "#",
        repoUrl: "#"
      },
      {
        title: "AR Shopping List",
        description: "An AR application prototype that identifies shopping items in real time and checks them off a virtual shopping list.",
        imageUrl: "/ar.jpg",
        technologies: ["YOLO", "a", "Unity"],
        projectUrl: "#",
        repoUrl: "#"
      }
    ];
    for (const project of projects) {
      await storage.createProject(project);
    }

    const experience = [
      {
        company: "Creative Plastering Group",
        position: "Technical Data Engineer",
        period: "06/2023 - 04/2025",
        description: "Entrusted with the responsibility of organizing and managing data to ensure streamlined operations and informed decision-making."
      }
    ];
    for (const exp of experience) {
      await storage.createExperience(exp);
    }

    const education = [
      {
        school: "Monash University",
        degree: "Bachelor of Software Engineering (Honours)",
        field: "Engineering",
        year: "2021-2025"
      }
    ];
    for (const edu of education) {
      await storage.createEducation(edu);
    }
  }
}
