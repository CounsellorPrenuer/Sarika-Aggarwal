import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Thank you!",
          description: "Your message has been received. We'll get back to you shortly.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-vibrant-blue/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to start your journey? Reach out to us and let's make your dreams a reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 sm:p-8 border-card-border" data-testid="card-contact-form">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    data-testid="input-name"
                    className="transition-all focus:ring-2 focus:ring-vibrant-orange"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    data-testid="input-email"
                    className="transition-all focus:ring-2 focus:ring-vibrant-orange"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="input-phone"
                    className="transition-all focus:ring-2 focus:ring-vibrant-orange"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your career goals..."
                    rows={5}
                    required
                    data-testid="input-message"
                    className="transition-all focus:ring-2 focus:ring-vibrant-orange resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-vibrant-orange to-vibrant-yellow hover:shadow-xl transition-all"
                  data-testid="button-submit-contact"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 sm:p-8 border-card-border" data-testid="card-contact-info">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-4 sm:space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">Email</p>
                    <a
                      href="mailto:agrawalsarika20@gmail.com"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                      data-testid="link-email"
                    >
                      agrawalsarika20@gmail.com
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">Phone</p>
                    <a
                      href="tel:+919910043394"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-phone"
                    >
                      +91 99100 43394
                    </a>
                  </div>
                </motion.div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 border-card-border" data-testid="card-social">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <motion.a
                  href="https://www.linkedin.com/in/sarika-agrawal-713b3821a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  data-testid="link-linkedin"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/sarika6605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
                  data-testid="link-instagram"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
                  data-testid="link-facebook"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
