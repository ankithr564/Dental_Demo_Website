import React from "react";
import { Link } from "wouter";

export default function GalleryPage() {
  return (
    <div className="w-full flex flex-col py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Smile Gallery</h1>
          <p className="text-lg text-slate-600">
            See the transformative results we've achieved for our patients, and take a look inside our state-of-the-art clinic.
          </p>
        </div>

        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-lg">Gallery images are being updated. Please check back later.</p>
        </div>
      </div>
    </div>
  );
}
