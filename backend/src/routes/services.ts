import { Router } from "express";
import { db } from "../db";
import { servicesTable } from "../db";

const router = Router();

router.get("/services", async (req, res) => {
  try {
    const services = await db.select().from(servicesTable);
    res.json(
      services.map((s) => ({
        ...s,
        highlights: s.highlights ?? [],
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list services");
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

export default router;
