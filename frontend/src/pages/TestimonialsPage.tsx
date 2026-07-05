import React from "react";
import { useListTestimonials } from "../api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialsPage() {
  const { data: testimonials, isLoading, error } = useListTestimonials();

  return (
    <div className="w-full flex flex-col py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Patient Stories</h1>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Read what our patients have to say about their BrightSmile experience.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">Failed to load testimonials.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Array.isArray(testimonials) ? testimonials : []).map((testimonial) => (
              <div key={testimonial.id} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < testimonial.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                    {testimonial.avatarUrl ? <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.treatment}</p>
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
