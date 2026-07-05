import { Router } from "express";
import { db } from "../db";
import { contactsTable } from "../db";
import { SubmitContactBody } from "../api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  try {
    const [contact] = await db
      .insert(contactsTable)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      })
      .returning();
    return res.status(201).json({
      ...contact,
      createdAt: contact.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact");
    return res.status(500).json({ error: "Failed to submit contact form" });
  }
});

export default router;
