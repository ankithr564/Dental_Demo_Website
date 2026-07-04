import { Router } from "express";
import { db } from "@workspace/db";
import { faqsTable } from "@workspace/db";

const router = Router();

router.get("/faqs", async (req, res) => {
  try {
    const faqs = await db.select().from(faqsTable);
    res.json(faqs);
  } catch (err) {
    req.log.error({ err }, "Failed to list FAQs");
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

export default router;
