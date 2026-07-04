import { Router } from "express";
import { db } from "@workspace/db";
import { appointmentsTable, doctorsTable } from "@workspace/db";
import { count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req, res) => {
  try {
    const [doctorCount] = await db.select({ count: count() }).from(doctorsTable);
    res.json({
      patientsServed: 15420,
      yearsExperience: 18,
      doctorsCount: doctorCount?.count ?? 4,
      satisfactionRate: 98.7,
      awardsWon: 12,
    });
  } catch (err) {
    res.json({
      patientsServed: 15420,
      yearsExperience: 18,
      doctorsCount: 4,
      satisfactionRate: 98.7,
      awardsWon: 12,
    });
  }
});

export default router;
