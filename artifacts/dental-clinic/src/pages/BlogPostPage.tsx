import React from "react";
import { useParams, Link } from "wouter";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostPage() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  
  const { data: post, isLoading, error } = useGetBlogPost(id, {
    query: {
      enabled: id > 0,
      queryKey: getGetBlogPostQueryKey(id)
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl min-h-screen">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/2 mb-12" />
        <Skeleton className="h-96 w-full rounded-2xl mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-32 text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h1>
        <p className="text-slate-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link href="/blog" className="text-teal-600 font-medium hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-16 bg-white min-h-screen">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-teal-600 font-medium hover:underline mb-8">
          &larr; Back to all posts
        </Link>
        
        <div className="mb-8">
          <span className="inline-block bg-teal-100 text-teal-800 font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-slate-500 gap-4 text-sm md:text-base border-b border-slate-100 pb-8">
            <span className="font-medium text-slate-900">By {post.author}</span>
            <span>&bull;</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {post.readTime && (
              <>
                <span>&bull;</span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>
        </div>

        {post.imageUrl && (
          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 bg-slate-100">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-teal-600 prose-img:rounded-xl">
          {/* Mock rendering of markdown content */}
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">Ready to improve your smile?</h3>
            <p className="text-slate-600 mb-6">Schedule a consultation with our expert team today.</p>
            <Link href="/book" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full px-8 py-3 transition-colors">
              Book an Appointment
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
