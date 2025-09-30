import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    //todo: remove mock functionality - Implement actual form submission
    console.log("Form submitted:", formData);
    toast({
      title: "Thank you!",
      description: "Your message has been received. We'll get back to you shortly.",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your journey? Reach out to us and let's make your dreams a reality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-8 border-card-border" data-testid="card-contact-form">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-vibrant-orange to-vibrant-yellow"
                data-testid="button-submit-contact"
              >
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-8 border-card-border" data-testid="card-contact-info">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href="mailto:agrawalsarika20@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-email"
                    >
                      agrawalsarika20@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a
                      href="tel:+919910043394"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-phone"
                    >
                      +91 99100 43394
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-card-border" data-testid="card-social">
              <h3 className="text-2xl font-bold text-foreground mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/sarika-agrawal-713b3821a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/sarika6605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-6 h-6 text-secondary" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
                  data-testid="link-facebook"
                >
                  <Facebook className="w-6 h-6 text-accent" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
