import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "../api-client-react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitContact.mutate({ data: values }, {
      onSuccess: () => {
        toast.success("Message Sent", {
          description: "Thank you for reaching out. We will get back to you soon.",
        });
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
      }
    });
  };

  return (
    <div className="w-full flex flex-col py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Contact Us</h1>
            <p className="text-lg text-slate-600">
              We're here to answer any questions you have about our services, insurance, or your dental health.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Clinic Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
                    <p className="text-slate-600">123 Prestige Ave, Suite 400<br/>Beverly Hills, CA 90210</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Contact Details</h4>
                    <p className="text-slate-600">Phone: <a href="tel:+13105550123" className="text-teal-600 hover:underline">+1 (310) 555-0123</a></p>
                    <p className="text-slate-600">Email: <a href="mailto:hello@brightsmile.com" className="text-teal-600 hover:underline">hello@brightsmile.com</a></p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Hours of Operation</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li className="flex justify-between"><span>Monday - Friday</span> <span>8:00 AM - 6:00 PM</span></li>
                      <li className="flex justify-between"><span>Saturday</span> <span>9:00 AM - 2:00 PM</span></li>
                      <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write your message here..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-6" disabled={submitContact.isPending}>
                    {submitContact.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
