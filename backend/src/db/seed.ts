import "dotenv/config";
import { db } from "./index";
import { servicesTable, doctorsTable, testimonialsTable } from "./schema/index";

async function main() {
  console.log("Seeding database...");

  // Seed Services
  await db.insert(servicesTable).values([
    {
      name: "General Checkup",
      description: "Comprehensive dental examination and cleaning.",
      icon: "Activity",
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=300&fit=crop",
      price: "$99",
      duration: "45 mins",
      highlights: ["X-Ray included", "Deep cleaning"],
    },
    {
      name: "Teeth Whitening",
      description: "Professional whitening for a brighter smile.",
      icon: "Sparkles",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      price: "$199",
      duration: "60 mins",
      highlights: ["Instant results", "Safe for enamel"],
    },
    {
      name: "Orthodontics",
      description: "Clear aligners and traditional braces.",
      icon: "Shield",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=300&fit=crop",
      price: "From $2000",
      duration: "Varies",
      highlights: ["Free consultation", "Flexible plans"],
    }
  ]).onConflictDoNothing();

  // Seed Doctors
  await db.insert(doctorsTable).values([
    {
      name: "Dr. Sarah Jenkins",
      specialty: "Cosmetic Dentist",
      bio: "Dr. Jenkins specializes in smile makeovers and advanced cosmetic dentistry.",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      experience: 12,
      education: "Harvard School of Dental Medicine",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Orthodontist",
      bio: "An expert in clear aligners and complex orthodontic treatments.",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      experience: 8,
      education: "UCSF School of Dentistry",
    }
  ]).onConflictDoNothing();

  // Seed Testimonials
  const now = new Date().toISOString();
  await db.insert(testimonialsTable).values([
    {
      name: "Emily R.",
      review: "The best dental experience I've ever had! So gentle and professional.",
      rating: 5,
      treatment: "Teeth Whitening",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      date: now,
    },
    {
      name: "Mark T.",
      review: "Dr. Chen fixed my smile in record time. Highly recommend!",
      rating: 5,
      treatment: "Orthodontics",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      date: now,
    }
  ]).onConflictDoNothing();

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
