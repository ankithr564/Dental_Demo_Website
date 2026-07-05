import React from "react";
import { Link } from "wouter";

export default function TreatmentsPage() {
  return (
    <div className="w-full flex flex-col py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Treatments</h1>
        <p className="text-lg text-slate-600 mb-12">Detailed information about specific procedures is coming soon.</p>
        <Link href="/services" className="text-teal-600 font-medium hover:underline">Return to Services</Link>
      </div>
    </div>
  );
}
