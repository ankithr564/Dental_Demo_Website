import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  useListServices,
  useListDoctors,
  useListTestimonials,
  useListBlogPosts,
  useGetStats,
} from "@workspace/api-client-react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Phone,
  Calendar,
  Award,
  Users,
  Clock,
  ThumbsUp,
  Quote,
  MapPin,
  Shield,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";

/* ─── helpers ───────────────────────────────────────────────────────────── */

function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return value;
}

function StatCard({ icon: Icon, value, suffix, label, trigger }: { icon: React.ElementType; value: number; suffix: string; label: string; trigger: boolean }) {
  const count = useCountUp(value, 2000, trigger);
  return (
    <div className="flex flex-col items-center text-center px-8">
      <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-teal-300" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-teal-100 text-sm font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ─── Hero images ────────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&h=900&fit=crop",
    heading: "Elite Dentistry Meets",
    accent: "Compassionate Care",
    sub: "Experience a new standard of dental care. Serene, expert, and unhurried — because your smile deserves the absolute best.",
  },
  {
    img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1800&h=900&fit=crop",
    heading: "Your Perfect Smile",
    accent: "Starts Here",
    sub: "State-of-the-art treatments delivered by specialists who genuinely care. Join 15,000+ patients who trust BrightSmile.",
  },
  {
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1800&h=900&fit=crop",
    heading: "Advanced Technology,",
    accent: "Human Touch",
    sub: "From same-day crowns to Invisalign, we blend cutting-edge precision with warm, patient-centred care.",
  },
];

/* ─── Why Choose Us data ─────────────────────────────────────────────────── */
const WHY_CARDS = [
  {
    icon: Shield,
    title: "20+ Years of Excellence",
    desc: "Trusted by families for two decades. Our board-certified specialists uphold the highest clinical standards.",
    img: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=600&h=400&fit=crop",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    desc: "Digital 3D scans, CEREC same-day crowns, laser dentistry and AI-assisted diagnostics.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop",
  },
  {
    icon: Heart,
    title: "Anxiety-Free Experience",
    desc: "Sedation options, a spa-like environment, and a team trained in compassionate, gentle care.",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop",
  },
];

/* ─── Before/After data ──────────────────────────────────────────────────── */
const BEFORE_AFTER = [
  {
    label: "Smile Makeover",
    before: "https://images.unsplash.com/photo-1570872626485-d8ffea69f463?w=600&h=700&fit=crop",
    after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=700&fit=crop",
  },
  {
    label: "Teeth Whitening",
    before: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=700&fit=crop",
    after: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=600&h=700&fit=crop",
  },
  {
    label: "Orthodontics",
    before: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=700&fit=crop",
    after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=700&fit=crop",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Shield, Sparkles, Sun: Sparkles, Zap, Repeat: CheckCircle2, Heart, Monitor: Zap, Activity: Users,
};

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [baIdx, setBaIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [baView, setBaView] = useState<"before" | "after">("after");

  /* stats trigger */
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  /* data */
  const { data: services } = useListServices();
  const { data: doctors } = useListDoctors();
  const { data: testimonials } = useListTestimonials();
  const { data: blogPosts } = useListBlogPosts({ limit: 3 });
  const { data: stats } = useGetStats();

  /* hero auto-advance */
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* testimonial auto-advance */
  useEffect(() => {
    if (!testimonials?.length) return;
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials]);

  const slide = HERO_SLIDES[heroIdx];

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] max-h-[900px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img src={slide.img} alt="BrightSmile Dental Clinic" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-900/20" />
          </motion.div>
        </AnimatePresence>

        {/* content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                  <Award className="w-4 h-4" /> Award-Winning Dental Excellence
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                  {slide.heading}<br />
                  <span className="text-teal-400">{slide.accent}</span>
                </h1>
                <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">{slide.sub}</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-teal-500/30 transition-all" asChild>
                    <Link href="/book"><Calendar className="w-5 h-5 mr-2" />Book Your Visit</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-white/40 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                    <Link href="/services">Explore Services <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
                {/* trust badges */}
                <div className="mt-12 flex flex-wrap gap-6 text-sm text-white/70">
                  {["AACD Accredited", "ADA Member Clinic", "Invisalign Diamond Provider"].map((b) => (
                    <span key={b} className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-400" />{b}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* dots + arrows */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} className={`h-2 rounded-full transition-all ${i === heroIdx ? "w-8 bg-teal-400" : "w-2 bg-white/40"}`} />
          ))}
        </div>
        <button onClick={() => setHeroIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* floating card */}
        <div className="absolute bottom-12 right-8 hidden xl:flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white max-w-xs">
          <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/60 mb-0.5">Call for Emergency</div>
            <div className="font-bold text-lg">(555) 123-4567</div>
            <div className="text-xs text-teal-300">Available 24/7</div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-teal-500/40">
            <StatCard icon={Users} value={stats?.patientsServed ?? 15420} suffix="+" label="Patients Served" trigger={statsInView} />
            <StatCard icon={Clock} value={stats?.yearsExperience ?? 18} suffix="+" label="Years of Excellence" trigger={statsInView} />
            <StatCard icon={Award} value={stats?.doctorsCount ?? 4} suffix="" label="Expert Specialists" trigger={statsInView} />
            <StatCard icon={ThumbsUp} value={Math.round(stats?.satisfactionRate ?? 98)} suffix="%" label="Satisfaction Rate" trigger={statsInView} />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Why BrightSmile</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">The Difference You'll Feel<br />From the First Visit</h2>
            <p className="mt-5 text-slate-500 text-lg">We've redesigned every moment of your dental experience — from the reception to the chair.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative overflow-hidden h-56">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-7 bg-white">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{card.desc}</p>
                    <div className="mt-5 text-teal-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Our Services</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Comprehensive Care<br />Under One Roof</h2>
            </div>
            <Button variant="outline" className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-slate-100 self-start md:self-auto" asChild>
              <Link href="/services">View All Services <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(services ?? []).slice(0, 8).map((service, i) => {
              const Icon = iconMap[service.icon] ?? Shield;
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.1 }} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400">
                  <div className="relative h-44 overflow-hidden">
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{service.price}</div>
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-base mb-2">{service.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{service.description}</p>
                    {service.duration && <div className="mt-3 text-teal-600 text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</div>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH BANNER ─────────────────────────────────────────────── */}
      <section className="relative py-0 overflow-hidden h-80 md:h-96">
        <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1800&h=600&fit=crop" alt="Modern dental clinic" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-teal-800/60 to-transparent flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Your Smile Journey<br />Begins Today</h2>
              <p className="mt-4 text-teal-100 text-lg">Personalized, premium dental care that fits your life. First consultations are always on us.</p>
              <Button className="mt-8 bg-white text-teal-700 hover:bg-teal-50 rounded-full px-8 h-12 font-semibold" asChild>
                <Link href="/book">Book Free Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Meet Your Specialists</h2>
            <p className="mt-5 text-slate-500 text-lg">World-class expertise, genuine care. Our doctors are as good with people as they are with teeth.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(doctors ?? []).map((doctor, i) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="group text-center">
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[3/4]">
                  <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-white text-sm text-left leading-relaxed line-clamp-3">{doctor.bio}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{doctor.experience}+ yrs</div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{doctor.name}</h3>
                <p className="text-teal-600 text-sm font-medium mt-1">{doctor.specialty}</p>
                <p className="text-slate-400 text-xs mt-2">{doctor.education?.split(';')[0]?.trim()}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full px-8 border-slate-300" asChild>
              <Link href="/doctors">Meet the Full Team <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
      <section className="py-28 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Transformations</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Real Results,<br />Real Patients</h2>
            <p className="mt-5 text-slate-500 text-lg">Every smile tells a story. These are just a few of the transformations our patients have experienced.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* tab selector */}
            <div className="flex justify-center gap-3 mb-10">
              {BEFORE_AFTER.map((ba, i) => (
                <button key={i} onClick={() => { setBaIdx(i); setBaView("after"); }} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${i === baIdx ? "bg-teal-500 text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  {ba.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {(["before", "after"] as const).map((view) => (
                <div key={view} className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <img src={view === "before" ? BEFORE_AFTER[baIdx].before : BEFORE_AFTER[baIdx].after} alt={`${view} treatment`} className="w-full h-full object-cover" />
                  <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest ${view === "before" ? "bg-slate-800/80 text-white" : "bg-teal-500 text-white"}`}>
                    {view}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8" asChild>
                <Link href="/gallery">View Full Gallery <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-teal-700 to-teal-900 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-teal-600/40" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-800/60" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-teal-300 text-sm font-semibold uppercase tracking-widest">Patient Stories</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">What Our Patients Say</h2>
          </motion.div>

          {testimonials && testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={testimonialIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12">
                  <Quote className="w-10 h-10 text-teal-300 mb-6" />
                  <p className="text-white text-xl md:text-2xl leading-relaxed font-light italic">"{testimonials[testimonialIdx].review}"</p>
                  <div className="mt-8 flex items-center gap-5">
                    <img src={testimonials[testimonialIdx].avatarUrl} alt={testimonials[testimonialIdx].name} className="w-14 h-14 rounded-full object-cover border-2 border-teal-400" />
                    <div>
                      <div className="text-white font-bold">{testimonials[testimonialIdx].name}</div>
                      <div className="text-teal-200 text-sm mt-0.5">{testimonials[testimonialIdx].treatment}</div>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className={`w-4 h-4 ${s < testimonials[testimonialIdx].rating ? "text-amber-400 fill-amber-400" : "text-white/30"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2 rounded-full transition-all ${i === testimonialIdx ? "w-8 bg-teal-300" : "w-2 bg-white/30"}`} />
                ))}
              </div>
            </div>
          )}

          {/* avatar row */}
          <div className="mt-14 flex flex-wrap justify-center items-center gap-4 opacity-70">
            {(testimonials ?? []).map((t, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)}>
                <img src={t.avatarUrl} alt={t.name} className={`w-10 h-10 rounded-full object-cover border-2 transition-all ${i === testimonialIdx ? "border-teal-300 scale-125" : "border-white/40"}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY STRIP ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Technology</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Precision-Driven,<br />Technology-Powered</h2>
              <p className="mt-5 text-slate-500 leading-relaxed">From AI-assisted diagnostics to same-day CEREC crowns, we invest in the technology that delivers better outcomes, faster recovery, and less discomfort.</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["3D Digital Scanning", "CEREC Same-Day Crowns", "Laser Dentistry", "Digital X-Rays", "AI Diagnostics", "Sedation Options"].map((tech) => (
                  <div key={tech} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /> {tech}
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8" asChild>
                <Link href="/treatments">View Treatments <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img src="https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=500&h=700&fit=crop" alt="Dental technology" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] mt-8">
                <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&h=700&fit=crop" alt="Dental equipment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ──────────────────────────────────────────────────── */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="py-28 bg-slate-50">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-teal-600 text-sm font-semibold uppercase tracking-widest">Dental Insights</span>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">From Our Experts</h2>
              </div>
              <Button variant="outline" className="rounded-full px-8 border-slate-300 self-start md:self-auto" asChild>
                <Link href="/blog">View All Posts <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400">
                  <div className="relative h-52 overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{post.category}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span>{post.author}</span>
                      {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`} className="mt-5 inline-flex items-center gap-1 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── APPOINTMENT CTA ───────────────────────────────────────────────── */}
      <section className="relative py-0 h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&h=600&fit=crop" alt="Book appointment" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Ready for the Smile<br />You've Always Wanted?</h2>
              <p className="mt-5 text-slate-300 text-lg">Join thousands of patients who made the decision. Your first consultation is complimentary.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white rounded-full px-8 h-14 font-semibold shadow-lg shadow-teal-500/30" asChild>
                  <Link href="/book"><Calendar className="w-5 h-5 mr-2" />Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-semibold border-white/40 text-white hover:bg-white/10" asChild>
                  <Link href="/contact"><Phone className="w-5 h-5 mr-2" />Call Us Now</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOCATION STRIP ────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            {[
              { icon: MapPin, label: "Find Us", value: "123 Dental Plaza, Beverly Hills, CA 90210" },
              { icon: Phone, label: "Call Us", value: "(555) 123-4567" },
              { icon: Clock, label: "Opening Hours", value: "Mon–Fri: 8am–7pm · Sat: 9am–5pm" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{label}</div>
                  <div className="text-slate-800 font-medium mt-0.5">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
