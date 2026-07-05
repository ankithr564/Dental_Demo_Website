import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const doctorsTable = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  education: text("education").notNull(),
  experience: integer("experience").notNull(),
  languages: text("languages").array(),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
});

export const insertDoctorSchema = createInsertSchema(doctorsTable).omit({ id: true });
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type Doctor = typeof doctorsTable.$inferSelect;
