import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import TreatmentsPage from "@/pages/TreatmentsPage";
import DoctorsPage from "@/pages/DoctorsPage";
import GalleryPage from "@/pages/GalleryPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import FaqsPage from "@/pages/FaqsPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ContactPage from "@/pages/ContactPage";
import BookPage from "@/pages/BookPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/treatments" component={TreatmentsPage} />
        <Route path="/doctors" component={DoctorsPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/testimonials" component={TestimonialsPage} />
        <Route path="/faqs" component={FaqsPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:id" component={BlogPostPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/book" component={BookPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
