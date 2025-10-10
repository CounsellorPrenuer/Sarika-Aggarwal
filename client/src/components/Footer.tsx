import { Linkedin, Instagram, Facebook, Mail, Phone } from "lucide-react";
import logoUrl from "@assets/logo-2_1759995760996.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-8 sm:py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vibrant-orange via-vibrant-yellow to-vibrant-teal" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <img src={logoUrl} alt="DreamBridge" className="h-16 sm:h-20 w-auto brightness-0 invert" />
              <span className="text-lg sm:text-xl font-bold text-primary-foreground" data-testid="text-footer-brand">
                DreamBridge
              </span>
            </div>
            <p className="text-sm sm:text-base text-primary-foreground/80 mb-3 sm:mb-4">
              Your Path from Aspirations to Achievements
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/in/sarika-agrawal-713b3821a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover-elevate"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/sarika6605"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover-elevate"
                data-testid="link-footer-instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover-elevate"
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm sm:text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                  data-testid="button-footer-about"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm sm:text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                  data-testid="button-footer-services"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="text-sm sm:text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                  data-testid="button-footer-blog"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm sm:text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                  data-testid="button-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm sm:text-base text-primary-foreground/80">Career Guidance</li>
              <li className="text-sm sm:text-base text-primary-foreground/80">Workshops & Seminars</li>
              <li className="text-sm sm:text-base text-primary-foreground/80">Admission Guidance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <a
                  href="mailto:agrawalsarika20@gmail.com"
                  className="text-xs sm:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors break-all"
                  data-testid="link-footer-email"
                >
                  agrawalsarika20@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <a
                  href="tel:+919910043394"
                  className="text-xs sm:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="link-footer-phone"
                >
                  +91 99100 43394
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} DreamBridge. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-primary-foreground/80 mt-2">
            In partnership with Mentoria for enhanced career guidance services.
          </p>
        </div>
      </div>
    </footer>
  );
}
