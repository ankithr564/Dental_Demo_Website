import React from "react";
import { useListServices } from "../api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const { data: services, isLoading, error } = useListServices();

  return (
    <div className="w-full flex flex-col py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-lg text-slate-600">
            Comprehensive dental care tailored to your unique needs, using the most advanced techniques available.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">Failed to load services. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Array.isArray(services) ? services : []).map((service) => (
              <div key={service.id} className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">No Image</div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-teal-600 font-medium px-3 py-1 rounded-full text-sm">
                    {service.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="text-xl font-heading font-bold text-slate-900">{service.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 flex-grow line-clamp-3">{service.description}</p>
                  <Button variant="outline" className="w-full rounded-full border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
                    <Link href={`/book?service=${encodeURIComponent(service.name)}`}>Book Now</Link>
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
