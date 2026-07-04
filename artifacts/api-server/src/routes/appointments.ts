import { Router } from "express";
import { db } from "@workspace/db";
import { appointmentsTable } from "@workspace/db";
import { CreateAppointmentBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await db.select().from(appointmentsTable).orderBy(appointmentsTable.createdAt);
    const mapped = appointments.map((a) => ({
      ...a,
      status: a.status as "pending" | "confirmed" | "cancelled",
      createdAt: a.createdAt.toISOString(),
    }));
    res.json(mapped);
  } catch (err) {
    req.log.error({ err }, "Failed to list appointments");
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  try {
    const [appointment] = await db
      .insert(appointmentsTable)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        doctor: parsed.data.doctor ?? null,
        date: parsed.data.date,
        time: parsed.data.time,
        message: parsed.data.message ?? null,
        status: "pending",
      })
      .returning();
    res.status(201).json({
      ...appointment,
      status: appointment.status as "pending" | "confirmed" | "cancelled",
      createdAt: appointment.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create appointment");
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

export default router;
