import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import axios from 'axios';
import crypto from 'crypto';

const insertWaitlistEntrySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const MAILCHIMP_LIST_ID = "c44d59cb72";

// In-memory storage for Vercel (NOTE: This won't persist between deployments!)
// For production, use Vercel KV, Neon, or another database
const waitlistStore = new Map<string, { id: string; email: string; createdAt: string }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Retrieve all waitlist entries
  if (req.method === 'GET') {
    try {
      const entries = Array.from(waitlistStore.values());
      return res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      return res.status(500).json({ message: 'Failed to fetch waitlist entries' });
    }
  }

  // POST - Add to waitlist
  if (req.method === 'POST') {
    try {
      const result = insertWaitlistEntrySchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: result.error.errors[0]?.message || 'Invalid email address',
        });
      }

      const email = result.data.email;

      // Check if email already exists
      const existing = Array.from(waitlistStore.values()).find(
        (entry) => entry.email.toLowerCase() === email.toLowerCase()
      );

      if (existing) {
        return res.status(400).json({
          message: 'This email is already on the waitlist',
        });
      }

      // Add to Mailchimp (with graceful degradation)
      const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      if (mailchimpApiKey) {
        try {
          const datacenter = mailchimpApiKey.split('-').pop();
          if (!datacenter) {
            throw new Error('Invalid Mailchimp API key format');
          }

          const mailchimpApiUrl = `https://${datacenter}.api.mailchimp.com/3.0`;
          const subscriberHash = crypto
            .createHash('md5')
            .update(email.toLowerCase())
            .digest('hex');

          await axios.put(
            `${mailchimpApiUrl}/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
            {
              email_address: email,
              status_if_new: 'subscribed',
              tags: ['early-bird'],
            },
            {
              auth: {
                username: 'anystring',
                password: mailchimpApiKey,
              },
            }
          );
          console.log(`Successfully added ${email} to Mailchimp with early-bird tag`);
        } catch (mailchimpError: any) {
          console.error('Mailchimp API error:', mailchimpError?.response?.data || mailchimpError?.message);
        }
      }

      // Add to in-memory storage
      const id = crypto.randomUUID();
      const entry = {
        id,
        email,
        createdAt: new Date().toISOString(),
      };

      waitlistStore.set(id, entry);
      return res.status(201).json(entry);
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return res.status(500).json({
        message: 'Failed to join waitlist. Please try again.',
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
