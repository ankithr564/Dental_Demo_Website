import { Router } from "express";
import { db } from "@workspace/db";
import { doctorsTable } from "@workspace/db";

const router = Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await db.select().from(doctorsTable);
    res.json(
      doctors.map((d) => ({
        ...d,
        languages: d.languages ?? [],
        social: {
          linkedin: d.linkedinUrl ?? null,
          twitter: d.twitterUrl ?? null,
        },
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list doctors");
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

export default router;
