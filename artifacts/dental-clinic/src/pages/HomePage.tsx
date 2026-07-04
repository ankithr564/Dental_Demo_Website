import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-teal-900/5 z-0"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading font-bold text-slate-900 tracking-tight max-w-4xl"
          >
            Elite Dentistry Meets <span className="text-teal-600">Compassionate Care</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl"
          >
            Experience a new standard of dental care. Serene, expert, and unhurried. 
            Because your smile deserves the absolute best.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto" asChild>
              <Link href="/book">Book Your Visit</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg w-full sm:w-auto" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold text-slate-900">The BrightSmile Difference</h2>
            <p className="mt-4 text-slate-600">We've redesigned the dental experience from the ground up to be calm, comfortable, and completely focused on you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "World-Class Experts", desc: "Our team consists of top-tier specialists dedicated to clinical excellence." },
              { title: "Advanced Technology", desc: "We utilize the latest innovations for precise, painless, and effective treatments." },
              { title: "Spa-Like Comfort", desc: "Relax in our serene environment designed to melt away dental anxiety." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-6">Ready for your best smile?</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">Join thousands of patients who have discovered the BrightSmile difference. Schedule your comprehensive consultation today.</p>
          <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-10 py-6 text-lg" asChild>
            <Link href="/book">Schedule Appointment</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
