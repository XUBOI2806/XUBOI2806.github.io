import { db } from "./db";
import { 
  profile, skills, projects, experience, education, messages,
  type Profile, type InsertProfile,
  type Skill, type InsertSkill,
  type Project, type InsertProject,
  type Experience, type InsertExperience,
  type Education, type InsertEducation,
  type Message, type InsertMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Read-only for portfolio content (except messages)
  getProfile(): Promise<Profile | undefined>;
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  
  // Write for contact form
  createMessage(message: InsertMessage): Promise<Message>;

  // Seed methods
  createProfile(profile: InsertProfile): Promise<Profile>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createProject(project: InsertProject): Promise<Project>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  createEducation(education: InsertEducation): Promise<Education>;
}

// In-memory storage for development when DATABASE_URL is not set
class InMemoryStorage implements IStorage {
  private profileData: Profile | undefined;
  private skillsData: Skill[] = [];
  private projectsData: Project[] = [];
  private experienceData: Experience[] = [];
  private educationData: Education[] = [];
  private messagesData: Message[] = [];
  private nextId = 1;

  async getProfile(): Promise<Profile | undefined> {
    return this.profileData;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skillsData;
  }

  async getProjects(): Promise<Project[]> {
    return this.projectsData;
  }

  async getExperience(): Promise<Experience[]> {
    return this.experienceData;
  }

  async getEducation(): Promise<Education[]> {
    return this.educationData;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.nextId++,
      ...insertMessage,
      createdAt: new Date(),
    };
    this.messagesData.push(message);
    return message;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const profile: Profile = {
      id: this.nextId++,
      ...insertProfile,
    };
    this.profileData = profile;
    return profile;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const skill: Skill = {
      id: this.nextId++,
      ...insertSkill,
    };
    this.skillsData.push(skill);
    return skill;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      id: this.nextId++,
      ...insertProject,
    };
    this.projectsData.push(project);
    return project;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const experience: Experience = {
      id: this.nextId++,
      ...insertExperience,
    };
    this.experienceData.push(experience);
    return experience;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const education: Education = {
      id: this.nextId++,
      ...insertEducation,
    };
    this.educationData.push(education);
    return education;
  }
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.select().from(profile).limit(1);
    return result;
  }

  async getSkills(): Promise<Skill[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(skills);
  }

  async getProjects(): Promise<Project[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(projects);
  }

  async getExperience(): Promise<Experience[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(experience);
  }

  async getEducation(): Promise<Education[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(education);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(messages).values(insertMessage).returning();
    return result;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(profile).values(insertProfile).returning();
    return result;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(skills).values(insertSkill).returning();
    return result;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(projects).values(insertProject).returning();
    return result;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(experience).values(insertExperience).returning();
    return result;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(education).values(insertEducation).returning();
    return result;
  }
}

// Use in-memory storage if DATABASE_URL is not set (for development)
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new InMemoryStorage();
