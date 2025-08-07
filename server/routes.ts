import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, id: contact.id });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to submit contact form. Please check your input and try again." 
      });
    }
  });

  // Get contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Download resume endpoint
  app.get("/api/resume/download", (req, res) => {
    try {
      // In a real implementation, this would serve the actual PDF file
      // For now, we'll return the resume data as text
      const resumeContent = `
JITENDRA GORIA
Product and Engineering Leader
Email: jit.goria159@gmail.com
Phone: +91-9875694452
LinkedIn: in/jit-goria-3a489415a

SUMMARY
Product and Engineering Leader with expertise in product GTM strategy, data analytics, and cross-functional execution. Currently an Engineering Manager with a track record of driving end-to-end product delivery from concept to launch in edtech and SaaS sectors. Skilled in ideating & implementing Dev-ops Agentic workflow, optimizing KPIs such as user engagement and retention, leading teams through Agile methodologies, and utilizing tools like Google Analytics, Big Query, and Tableau.

EXPERIENCE
Product & Engineering Manager - Creamcollar (May 2024 - Present)
• Led an 18-member team for the development and release of a multi-sided B2B SaaS platform
• Research and implementation of Dev-ops and SDLC operation-specific agentic system with MCP architecture
• Implementation of microservice-specific data logging through ELK and alert mechanisms
• Reduced unnecessary downtime by 30% at an early release stage

Project Manager - Govt. Accounts - Embibe-Jio (November 2023 - April 2024)
• Collaborated with cross-functional teams to deliver 3 major product releases
• Led product quality initiatives resulting in 30% reduction in post-release defects
• Led product initiatives for self-onboarding platform serving 20,000+ schools

Product Specialist - GTM - Embibe-Jio (July 2019 - November 2023)
• Devised go-to-market strategies by collaborating with sales, marketing, and engineering teams
• Defined and implemented first monetization model for multi-sided platform
• Led team of 4 in training and executing UAT for AR/VR simulation-based learning platform

EDUCATION
Master of Science in Biochemistry - Indian Academy Degree College, Bangalore University (2019)

SKILLS
Product Management: Figma, Balsamiq, Whimsical, OKR/KPI Tracking, Agile methodology
Data Analytics: Google Analytics, Tableau, Looker Studio, Mixpanel, Google BigQuery, SQL
Technical: Linux, Oracle, Java, C#, Python, VB.NET, ASP.NET
      `;

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment; filename="Jit_Goria_Resume.txt"');
      res.send(resumeContent);
    } catch (error) {
      console.error("Error downloading resume:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to download resume" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
