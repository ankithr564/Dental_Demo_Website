import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  readTime: integer("read_time"),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
