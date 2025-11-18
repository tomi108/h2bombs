import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Invalid email address" 
        });
      }

      // Check if email already exists
      const existing = await storage.getWaitlistEntryByEmail(result.data.email);
      if (existing) {
        return res.status(400).json({ 
          message: "This email is already on the waitlist" 
        });
      }

      const entry = await storage.addToWaitlist(result.data);
      return res.status(201).json(entry);
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return res.status(500).json({ 
        message: "Failed to join waitlist. Please try again." 
      });
    }
  });

  // Get all waitlist entries (for admin purposes)
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      return res.json(entries);
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      return res.status(500).json({ 
        message: "Failed to fetch waitlist entries" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
