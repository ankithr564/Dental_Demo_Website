import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 text-center">About BrightSmile</h1>
        
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="lead text-xl text-slate-600 text-center mb-12">
            Founded on the principle that dental care should be an experience of comfort, not anxiety, BrightSmile has redefined what it means to visit the dentist.
          </p>
          
          <div className="bg-slate-50 p-8 rounded-2xl mb-12 border border-slate-100">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4 mt-0">Our Mission</h2>
            <p className="text-slate-600 m-0">
              To provide elite, comprehensive dental care in a serene environment, empowering our patients with confident, healthy smiles through advanced technology and compassionate practice.
            </p>
          </div>

          <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">Our Philosophy</h2>
          <p>
            We believe that your oral health is deeply connected to your overall well-being. Our approach is holistic—we don't just treat teeth; we treat people. From the moment you walk into our clinic, you'll notice the difference. The pristine air, the warm lighting, the unhurried consultations. Every detail is curated to make you feel safe and cared for.
          </p>
          
          <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Excellence in Practice</h2>
          <p>
            Our clinicians are leaders in their respective fields, continuously advancing their education to bring the latest, most effective techniques to our practice. We invest heavily in cutting-edge diagnostic and therapeutic technology to ensure your treatments are minimally invasive and maximally effective.
          </p>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8" asChild>
              <Link href="/doctors">Meet Our Doctors</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
