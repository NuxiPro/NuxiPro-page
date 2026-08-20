import { describe, expect, it } from "vitest";

const PAGES = [
  {
    name: "Home",
    title: "NuxiPro - Your workspace cleans itself",
    description:
      "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
  },
  {
    name: "FAQ",
    title: "FAQ - NuxiPro",
    description:
      "Frequently asked questions about NuxiPro, the minimalist personal task manager with automatic archiving.",
  },
  {
    name: "Contact",
    title: "Contact - NuxiPro",
    description:
      "Get in touch with the NuxiPro team. Questions, feedback, or support — we're here to help.",
  },
  {
    name: "Legal Center",
    title: "Legal Center - NuxiPro",
    description:
      "Privacy policy, terms of use, and legal notices for NuxiPro — the minimalist personal task manager with automatic archiving.",
  },
  {
    name: "Privacy",
    title: "Privacy Policy - NuxiPro",
    description: "How we collect, use, and protect your personal data.",
  },
  {
    name: "Terms",
    title: "Terms of Use - NuxiPro",
    description: "Terms and conditions for using NuxiPro.",
  },
  {
    name: "Notices",
    title: "Legal Notices - NuxiPro",
    description: "Publisher information, hosting, and intellectual property.",
  },
];

describe("SEO - Meta descriptions", () => {
  it("all pages have unique titles", () => {
    const titles = PAGES.map((p) => p.title);
    const uniqueTitles = [...new Set(titles)];
    expect(uniqueTitles.length).toBe(titles.length);
  });

  it("all pages have unique descriptions", () => {
    const descriptions = PAGES.map((p) => p.description);
    const uniqueDescriptions = [...new Set(descriptions)];
    expect(uniqueDescriptions.length).toBe(descriptions.length);
  });

  it("no description is empty", () => {
    for (const page of PAGES) {
      expect(page.description.length, `${page.name} has empty description`).toBeGreaterThan(0);
    }
  });

  it("all descriptions are between 20-160 chars (SEO best practice)", () => {
    for (const page of PAGES) {
      expect(
        page.description.length,
        `${page.name} description is too short (${page.description.length} chars)`,
      ).toBeGreaterThanOrEqual(20);
      expect(
        page.description.length,
        `${page.name} description is too long (${page.description.length} chars)`,
      ).toBeLessThanOrEqual(160);
    }
  });

  it("all titles contain NuxiPro", () => {
    for (const page of PAGES) {
      expect(page.title, `${page.name} title doesn't contain NuxiPro`).toContain("NuxiPro");
    }
  });
});
