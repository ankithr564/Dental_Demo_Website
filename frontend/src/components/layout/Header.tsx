import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/doctors", label: "Doctors" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900 font-heading">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
            {/* Tooth icon simplified */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-4-2-4-6.5C8 10 7 7 12 7c5 0 4 8.5 4 8.5 0 4.5-4 6.5-4 6.5Z"/>
              <path d="M12 7c0-3-2-5-5-5S2 4 2 7c0 4 4 6.5 4 6.5"/>
              <path d="M12 7c0-3 2-5 5-5s5 2 5 5c0 4-4 6.5-4 6.5"/>
              <path d="M12 22V7"/>
            </svg>
          </div>
          BrightSmile
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                location === link.href ? "text-teal-600" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6">
            <Link href="/book">Book Appointment</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium px-4 py-2 rounded-md ${
                      location === link.href ? "bg-teal-50 text-teal-600" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 px-4">
                  <Button asChild className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full">
                    <Link href="/book">Book Appointment</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

