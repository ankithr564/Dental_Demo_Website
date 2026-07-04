import React from "react";
import { useListBlogPosts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function BlogPage() {
  const { data: posts, isLoading, error } = useListBlogPosts();

  return (
    <div className="w-full flex flex-col py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Dental Health Insights</h1>
          <p className="text-lg text-slate-600">
            Expert advice, clinic news, and insights to help you maintain a bright, healthy smile.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">Failed to load blog posts. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <div key={post.id} className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-56 bg-slate-200 overflow-hidden relative">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-teal-500 text-white font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-slate-500 mb-3 gap-4">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    {post.readTime && <span>{post.readTime} min read</span>}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-medium text-slate-900 text-sm">By {post.author}</span>
                    <Link href={`/blog/${post.id}`} className="text-teal-600 font-medium text-sm hover:underline">
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
