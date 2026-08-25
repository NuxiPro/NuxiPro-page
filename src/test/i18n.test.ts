import { describe, expect, it } from "vitest";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";

describe("i18n", () => {
  it("EN and FR have the same top-level keys", () => {
    const enKeys = Object.keys(en).sort();
    const frKeys = Object.keys(fr).sort();
    expect(enKeys).toEqual(frKeys);
  });

  it("EN and FR have the same nested keys for legal", () => {
    const enLegal = JSON.stringify(en.legal, null, 2);
    const frLegal = JSON.stringify(fr.legal, null, 2);

    const enKeys = Object.keys(JSON.parse(enLegal)).sort();
    const frKeys = Object.keys(JSON.parse(frLegal)).sort();

    expect(enKeys).toEqual(frKeys);
  });

  it("EN and FR have the same nested keys for footer", () => {
    const enFooter = Object.keys(en.footer).sort();
    const frFooter = Object.keys(fr.footer).sort();
    expect(enFooter).toEqual(frFooter);
  });

  it("EN and FR have the same nested keys for contact", () => {
    const enContact = Object.keys(en.contact).sort();
    const frContact = Object.keys(fr.contact).sort();
    expect(enContact).toEqual(frContact);
  });

  it("All required legal keys exist in EN", () => {
    const requiredKeys = [
      "legal.center.title",
      "legal.center.subtitle",
      "legal.privacy.title",
      "legal.privacy.desc",
      "legal.cgu.title",
      "legal.cgu.desc",
      "legal.notices.title",
      "legal.notices.desc",
    ];

    for (const key of requiredKeys) {
      const parts = key.split(".");
      let value: unknown = en;
      for (const part of parts) {
        value = (value as Record<string, unknown>)?.[part];
      }
      expect(value, `Missing key: ${key}`).toBeDefined();
    }
  });

  it("All required contact keys exist in EN", () => {
    const requiredKeys = [
      "contact.title",
      "contact.subtitle",
      "contact.email",
      "contact.emailValue",
      "contact.github",
      "contact.githubValue",
      "contact.twitter",
      "contact.twitterValue",
      "contact.back",
    ];

    for (const key of requiredKeys) {
      const parts = key.split(".");
      let value: unknown = en;
      for (const part of parts) {
        value = (value as Record<string, unknown>)?.[part];
      }
      expect(value, `Missing key: ${key}`).toBeDefined();
    }
  });
});
