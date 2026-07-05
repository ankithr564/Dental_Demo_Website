import React from "react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-white font-heading">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-4-2-4-6.5C8 10 7 7 12 7c5 0 4 8.5 4 8.5 0 4.5-4 6.5-4 6.5Z"/>
                <path d="M12 7c0-3-2-5-5-5S2 4 2 7c0 4 4 6.5 4 6.5"/>
                <path d="M12 7c0-3 2-5 5-5s5 2 5 5c0 4-4 6.5-4 6.5"/>
                <path d="M12 22V7"/>
              </svg>
            </div>
            BrightSmile
          </div>
          <p className="text-slate-400">
            Elite dentistry meets compassionate care in a serene, modern clinic setting.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-heading font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-teal-400 transition-colors">Services</Link></li>
            <li><Link href="/doctors" className="hover:text-teal-400 transition-colors">Our Doctors</Link></li>
            <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-heading font-semibold text-lg mb-4">Services</h4>
          <ul className="space-y-2">
            <li><Link href="/services" className="hover:text-teal-400 transition-colors">General Dentistry</Link></li>
            <li><Link href="/services" className="hover:text-teal-400 transition-colors">Cosmetic Dentistry</Link></li>
            <li><Link href="/services" className="hover:text-teal-400 transition-colors">Orthodontics</Link></li>
            <li><Link href="/services" className="hover:text-teal-400 transition-colors">Dental Implants</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-heading font-semibold text-lg mb-4">Contact Info</h4>
          <ul className="space-y-2 text-slate-400">
            <li>123 Prestige Ave, Suite 400</li>
            <li>Beverly Hills, CA 90210</li>
            <li className="pt-2"><a href="tel:+13105550123" className="hover:text-teal-400 transition-colors">+1 (310) 555-0123</a></li>
            <li><a href="mailto:hello@brightsmile.com" className="hover:text-teal-400 transition-colors">hello@brightsmile.com</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}

