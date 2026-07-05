import { Router } from "express";
import { db } from "../db";
import { newsletterTable } from "../db";
import { SubscribeNewsletterBody } from "../api-zod";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/newsletter", async (req, res) => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  try {
    const [sub] = await db
      .insert(newsletterTable)
      .values({
        email: parsed.data.email,
        name: parsed.data.name ?? null,
      })
      .onConflictDoNothing()
      .returning();

    if (!sub) {
      const [existing] = await db
        .select()
        .from(newsletterTable)
        .where(eq(newsletterTable.email, parsed.data.email));

      if (!existing) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      return res.status(201).json({
        ...existing,
        createdAt: existing.createdAt.toISOString(),
      });
    }

    return res.status(201).json({ ...sub, createdAt: sub.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe newsletter");
    return res.status(500).json({ error: "Failed to subscribe" });
  }
});

export default router;
