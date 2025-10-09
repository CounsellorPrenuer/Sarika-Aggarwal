import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/logo-2_1759995760996.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-background/95 backdrop-blur-lg shadow-lg"
          : "bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3" data-testid="link-home">
            <img src={logoUrl} alt="DreamBridge Logo" className="h-14 sm:h-16 w-auto" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-vibrant-blue to-vibrant-teal bg-clip-text text-transparent">
              DreamBridge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base"
              data-testid="button-nav-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base"
              data-testid="button-nav-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base"
              data-testid="button-nav-blog"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base"
              data-testid="button-nav-contact"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection("packages")}
              className="bg-gradient-to-r from-vibrant-orange to-vibrant-yellow hover:shadow-lg transition-all text-sm lg:text-base"
              data-testid="button-nav-cta"
              size="sm"
            >
              Start Your Journey
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover-elevate transition-all rounded-lg"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left py-2 px-3 text-foreground hover:text-primary transition-colors rounded-lg hover-elevate"
                data-testid="button-mobile-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left py-2 px-3 text-foreground hover:text-primary transition-colors rounded-lg hover-elevate"
                data-testid="button-mobile-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-left py-2 px-3 text-foreground hover:text-primary transition-colors rounded-lg hover-elevate"
                data-testid="button-mobile-blog"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 px-3 text-foreground hover:text-primary transition-colors rounded-lg hover-elevate"
                data-testid="button-mobile-contact"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("packages")}
                className="bg-gradient-to-r from-vibrant-orange to-vibrant-yellow w-full mt-2"
                data-testid="button-mobile-cta"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
