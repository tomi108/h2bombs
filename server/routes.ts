import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import axios from "axios";
import crypto from "crypto";

// Mailchimp configuration
const MAILCHIMP_LIST_ID = "c44d59cb72";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist endpoint with Mailchimp integration
  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Invalid email address" 
        });
      }

      const email = result.data.email;

      // Check if email already exists in our storage
      const existing = await storage.getWaitlistEntryByEmail(email);
      if (existing) {
        return res.status(400).json({ 
          message: "This email is already on the waitlist" 
        });
      }

      // Add to Mailchimp (with graceful degradation)
      const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      if (mailchimpApiKey) {
        try {
          // Extract datacenter from API key (format: key-datacenter)
          const datacenter = mailchimpApiKey.split('-').pop();
          if (!datacenter) {
            throw new Error("Invalid Mailchimp API key format - missing datacenter suffix");
          }

          const mailchimpApiUrl = `https://${datacenter}.api.mailchimp.com/3.0`;

          // Add subscriber to Mailchimp list
          const subscriberHash = crypto
            .createHash("md5")
            .update(email.toLowerCase())
            .digest("hex");

          await axios.put(
            `${mailchimpApiUrl}/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
            {
              email_address: email,
              status_if_new: "subscribed",
              tags: ["early-bird"],
            },
            {
              auth: {
                username: "anystring",
                password: mailchimpApiKey,
              },
            }
          );
          console.log(`Successfully added ${email} to Mailchimp with early-bird tag`);
        } catch (mailchimpError: any) {
          console.error("Mailchimp API error:", mailchimpError?.response?.data || mailchimpError?.message);
          // Don't fail the whole request if Mailchimp fails, but log it
          // Continue to add to our storage
        }
      } else {
        console.warn("MAILCHIMP_API_KEY not set - skipping Mailchimp sync");
      }

      // Add to local storage
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
