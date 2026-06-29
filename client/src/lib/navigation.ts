import { useLocation } from "wouter";
import { SITE_BASE } from "@/lib/config";

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** On home, scroll to packages; otherwise client-navigate to /plans under SITE_BASE. */
export function usePlansNavigation() {
  const [location, setLocation] = useLocation();

  const goToPlans = () => {
    if (location === "/" || location === "") {
      scrollToSection("packages");
      return;
    }
    setLocation("/plans");
  };

  return { goToPlans, isHome: location === "/" || location === "" };
}

export function ensureSiteBasePath() {
  const base = SITE_BASE.endsWith("/") ? SITE_BASE.slice(0, -1) : SITE_BASE;
  const { pathname } = window.location;

  if (pathname === base || pathname.startsWith(`${base}/`)) return;

  const segment = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (segment === "/plans" || segment === "/pricing" || segment.startsWith("/blog") || segment === "/testimonials") {
    window.location.replace(`${base}${segment}${window.location.search}${window.location.hash}`);
  }
}
