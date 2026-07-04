import React, { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useListDoctors, useGetStats } from "@workspace/api-client-react";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  Heart,
  Shield,
  Zap,
  Star,
  Users,
  Clock,
  ThumbsUp,
  Quote,
  MapPin,
  Sparkles,
} from "lucide-react";

/* ─── static data ─────────────────────────────────────────────────────────── */
const MILESTONES = [
  { year: "2006", title: "Founded", desc: "Dr. Emily Chen opens BrightSmile Dental in Beverly Hills with a singular vision: dentistry without dread." },
  { year: "2011", title: "Expansion", desc: "Added orthodontics, oral surgery, and pediatric departments. Doubled clinic space to accommodate growing patient family." },
  { year: "2016", title: "Technology Pioneer", desc: "First clinic in the region to adopt full CEREC digital workflow — same-day crowns, digital impressions, AI-assisted diagnostics." },
  { year: "2020", title: "Award Recognition", desc: "Named Top Dental Practice in California by HealthGrades. Ranked #1 patient satisfaction score in the Beverly Hills district." },
  { year: "2024", title: "Today", desc: "15,000+ patients served. 4 world-class specialists. 18 years of smiles, trust, and clinical excellence." },
];

const VALUES = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "Every patient walks in with a story. We listen before we treat, and we care long after you leave the chair.",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: Shield,
    title: "Clinical Excellence",
    desc: "We hold ourselves to the highest standards — ongoing education, peer review, and evidence-based practice, always.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "If a better technology exists, we adopt it. Our patients deserve the most precise, minimally invasive care available.",
    color: "bg-amber-50 text-amber-500",
  },
  {
    icon: Users,
    title: "Inclusivity",
    desc: "Every age, every background, every level of dental anxiety is welcome here. Our clinic is a judgment-free space.",
    color: "bg-violet-50 text-violet-500",
  },
  {
    icon: Sparkles,
    title: "Artistry",
    desc: "Great dentistry is both science and art. We obsess over every millimetre because your smile is your first impression.",
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: Star,
    title: "Trust",
    desc: "We never upsell unnecessary treatment. Our recommendations are always honest, always in your best interest.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const AWARDS = [
  { label: "Top Dental Practice", org: "HealthGrades", year: "2024" },
  { label: "Best Cosmetic Dentist", org: "Beverly Hills Magazine", year: "2023" },
  { label: "Patient Choice Award", org: "Zocdoc", year: "2023" },
  { label: "Invisalign Diamond Provider", org: "Align Technology", year: "2022–24" },
  { label: "AACD Full Accreditation", org: "American Academy of Cosmetic Dentistry", year: "2019" },
  { label: "Top Doctor", org: "Castle Connolly", year: "2021–24" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=700&fit=crop",
  "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=700&fit=crop",
];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-6 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-teal-200 text-xs font-semibold uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { data: doctors } = useListDoctors();
  const { data: stats } = useGetStats();

  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&h=900&fit=crop"
          alt="BrightSmile Dental clinic interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-slate-900/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4" /> Trusted Since 2006
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                The Story<br /><span className="text-teal-400">Behind the Smile</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                Born from a belief that dentistry should feel like sanctuary, not surgery — BrightSmile has spent 18 years proving that elite clinical care and genuine human warmth are never mutually exclusive.
              </p>
            </motion.div>
          </div>
        </div>

        {/* stats bar overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-teal-800/90 to-transparent py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              <StatPill value={`${stats?.patientsServed?.toLocaleString() ?? "15,420"}+`} label="Patients" />
              <StatPill value={`${stats?.yearsExperience ?? 18}+`} label="Years" />
              <StatPill value={`${stats?.doctorsCount ?? 4}`} label="Specialists" />
              <StatPill value={`${stats?.satisfactionRate ?? 98.7}%`} label="Satisfaction" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* images */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=700&fit=crop&crop=face" alt="Dr Emily Chen" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-4 mt-10">
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=500&h=400&fit=crop" alt="Dental treatment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img src="https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=500&h=300&fit=crop" alt="Dental technology" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>

            {/* text */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Our Origin</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Founded on a Simple Belief</h2>
              <div className="mt-6 space-y-5 text-slate-600 leading-relaxed text-lg">
                <p>In 2006, Dr. Emily Chen walked away from a prestigious hospital post because she wanted to do something radical: build a dental practice where patients actually <em>wanted</em> to come back.</p>
                <p>She had seen too many people skip essential care because dentistry felt cold, rushed, and impersonal. So she designed BrightSmile from the floor plan up — wide chairs, warm lighting, unhurried appointments, and a clinical team trained as much in empathy as in enamel.</p>
                <p>Eighteen years later, BrightSmile is the trusted dental home for over 15,000 patients across Beverly Hills and beyond — a practice built on relationships, not transactions.</p>
              </div>

              {/* mission card */}
              <div className="mt-10 bg-teal-50 border border-teal-100 rounded-2xl p-7">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Our Mission</h3>
                    <p className="text-slate-600 leading-relaxed">To empower every patient with a healthy, confident smile — through clinical mastery, genuine compassion, and an experience that feels nothing like a dental visit.</p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 h-12 font-semibold" asChild>
                <Link href="/doctors">Meet Our Team <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-slate-50" ref={timelineRef}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Our Journey</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">18 Years of<br />Milestones</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-teal-200 -translate-x-1/2" />

            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row pl-16 md:pl-0`}
              >
                {/* dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-md -translate-x-1/2 mt-1.5 z-10" />

                {/* card — alternates sides on desktop */}
                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : "md:text-left"} bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
                  <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-3">{m.year}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{m.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                </div>

                {/* spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">What We Stand For</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Our Core Values</h2>
            <p className="mt-5 text-slate-500 text-lg">Six principles that guide every decision, every treatment, every interaction.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.12 }} className="group p-7 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${v.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE BREAK ────────────────────────────────────────── */}
      <section className="relative py-0 h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1800&h=600&fit=crop" alt="Modern dental equipment" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-800/50 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <Quote className="w-10 h-10 text-teal-300 mb-4" />
              <blockquote className="text-2xl md:text-3xl font-light text-white italic max-w-2xl leading-relaxed">
                "We don't just restore teeth. We restore confidence, comfort, and the simple joy of smiling without hesitation."
              </blockquote>
              <p className="mt-5 text-teal-200 font-semibold">— Dr. Emily Chen, Founder & Clinical Director</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AWARDS & ACCREDITATIONS ──────────────────────────────────────── */}
      <section className="py-28 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Recognition</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Awards &amp; Accreditations</h2>
            <p className="mt-5 text-slate-500 text-lg">We're humbled by the recognition — and driven to keep earning it.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {AWARDS.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm leading-snug">{a.label}</div>
                  <div className="text-teal-600 text-xs font-medium mt-1">{a.org}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{a.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTORS PREVIEW ──────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">The Team</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">World-Class Specialists,<br />Genuine Human Care</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(doctors ?? []).map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group text-center">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                  <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className="text-white text-xs leading-relaxed line-clamp-2">{doc.bio.substring(0, 80)}...</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{doc.experience}+ yrs</div>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                <p className="text-teal-600 text-xs font-medium mt-0.5">{doc.specialty}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 h-12 font-semibold" asChild>
              <Link href="/doctors">Full Team Profiles <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY STRIP ──────────────────────────────────────────── */}
      <section className="py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 h-72 md:h-80">
          {GALLERY.map((src, i) => (
            <div key={i} className="relative overflow-hidden group">
              <img src={src} alt="BrightSmile clinic" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-teal-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMITMENTS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Our Promise</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">What You Can Always<br />Expect From Us</h2>
              <div className="mt-8 space-y-4">
                {[
                  "Transparent pricing — no surprise bills",
                  "Honest treatment recommendations only",
                  "Same-day emergency appointments",
                  "Every question answered in plain English",
                  "Comfort-first: sedation always available",
                  "Guarantee on all cosmetic work",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl">
              <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=500&fit=crop" alt="Happy dental patient" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/40 to-transparent" />
              {/* floating badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-xl">
                <div className="text-3xl font-bold text-slate-900">98.7%</div>
                <div className="text-slate-500 text-sm mt-0.5">Patient satisfaction rate</div>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-0 h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1800&h=500&fit=crop" alt="BrightSmile invitation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">Ready to Experience<br />BrightSmile?</h2>
            <p className="text-slate-300 text-lg mb-8">Your first consultation is complimentary. No commitment, no pressure.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white rounded-full px-10 h-14 font-semibold shadow-lg shadow-teal-500/30" asChild>
                <Link href="/book">Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-semibold border-white/40 text-white hover:bg-white/10" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
