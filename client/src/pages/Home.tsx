import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Mentoria from "@/components/Mentoria";
import Footer from "@/components/Footer";
import { useCms } from "@/hooks/useCms";

export default function Home() {
  const { data } = useCms();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services cmsServices={data?.services} />
      <Packages />
      <Testimonials cmsTestimonials={data?.testimonials} />
      <Blog cmsPosts={data?.blogPosts} />
      <Contact />
      <Mentoria />
      <Footer />
    </div>
  );
}
