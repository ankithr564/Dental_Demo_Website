import { Router } from "express";
import { db } from "@workspace/db";
import { newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

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
      const [existing] = await db.select().from(newsletterTable).where(
        (await import("drizzle-orm")).eq(newsletterTable.email, parsed.data.email)
      );
      return res.status(201).json({
        ...existing,
        createdAt: existing!.createdAt.toISOString(),
      });
    }
    res.status(201).json({ ...sub, createdAt: sub.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe newsletter");
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

export default router;
