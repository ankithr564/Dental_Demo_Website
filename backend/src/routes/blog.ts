import { Router } from "express";
import { db } from "../db";
import { blogPostsTable } from "../db";
import { ListBlogPostsQueryParams, GetBlogPostParams } from "../api-zod";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/blog", async (req, res) => {
  const parsed = ListBlogPostsQueryParams.safeParse(req.query);
  const limit = parsed.success && parsed.data.limit ? parsed.data.limit : 100;
  try {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .orderBy(desc(blogPostsTable.publishedAt))
      .limit(limit);
    const mapped = posts.map((p) => ({
      ...p,
      publishedAt: p.publishedAt.toISOString(),
    }));
    return res.json(mapped);
  } catch (err) {
    req.log.error({ err }, "Failed to list blog posts");
    return res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/blog/:id", async (req, res) => {
  const parsed = GetBlogPostParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, parsed.data.id));
    if (!post) return res.status(404).json({ error: "Not found" });
    return res.json({ ...post, publishedAt: post.publishedAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to get blog post");
    return res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

export default router;
