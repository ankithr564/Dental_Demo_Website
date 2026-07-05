import React from "react";
import { useListDoctors } from "../api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function DoctorsPage() {
  const { data: doctors, isLoading, error } = useListDoctors();

  return (
    <div className="w-full flex flex-col py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Meet Our Experts</h1>
          <p className="text-lg text-slate-600">
            Our team of internationally recognized specialists is dedicated to providing you with the highest standard of care.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">Failed to load doctors. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(Array.isArray(doctors) ? doctors : []).map((doctor) => (
              <div key={doctor.id} className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-64 bg-slate-200 overflow-hidden relative">
                  {doctor.imageUrl ? (
                    <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">Photo</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-1">{doctor.name}</h3>
                  <p className="text-teal-600 font-medium text-sm mb-4">{doctor.specialty}</p>
                  <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">{doctor.bio}</p>
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href={`/book?doctor=${encodeURIComponent(doctor.name)}`}>Book with {doctor.name.split(' ')[0]}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
