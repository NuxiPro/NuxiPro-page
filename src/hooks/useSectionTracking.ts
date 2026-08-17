import posthog from "posthog-js";
import { useEffect } from "react";

const isDev = import.meta.env.DEV;

interface UseSectionTrackingOptions {
  sectionId: string;
  threshold?: number;
}

export function useSectionTracking({
  sectionId,
  threshold = 0.5,
}: UseSectionTrackingOptions) {
  useEffect(() => {
    if (isDev) return;

    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          posthog.capture("section_view", { section: sectionId });
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, threshold]);
}

export function trackClick(location: string) {
  if (isDev) return;
  posthog.capture("cta_click", { location });
}
