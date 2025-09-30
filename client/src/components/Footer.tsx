import { Linkedin, Instagram, Facebook, Mail, Phone } from "lucide-react";
import logoUrl from "@assets/logo_1759214045918.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logoUrl} alt="DreamBridge" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/80 mb-4">
              Your Path from Aspirations to Achievements
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/sarika-agrawal-713b3821a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/sarika6605"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                data-testid="link-footer-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="button-footer-about"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="button-footer-services"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="button-footer-blog"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="button-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Career Guidance</li>
              <li className="text-primary-foreground/80">Workshops & Seminars</li>
              <li className="text-primary-foreground/80">Admission Guidance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:agrawalsarika20@gmail.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  data-testid="link-footer-email"
                >
                  agrawalsarika20@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+919910043394"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  data-testid="link-footer-phone"
                >
                  +91 99100 43394
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © {new Date().getFullYear()} DreamBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
