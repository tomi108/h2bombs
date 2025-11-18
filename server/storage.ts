import { type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  addToWaitlist(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
}

export class MemStorage implements IStorage {
  private waitlistEntries: Map<string, WaitlistEntry>;

  constructor() {
    this.waitlistEntries = new Map();
  }

  async addToWaitlist(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const id = randomUUID();
    const entry: WaitlistEntry = { 
      ...insertEntry, 
      id,
      createdAt: new Date()
    };
    this.waitlistEntries.set(id, entry);
    return entry;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlistEntries.values()).find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlistEntries.values());
  }
}

export const storage = new MemStorage();
