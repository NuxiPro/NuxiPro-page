import type { ReactNode } from "react";
import { useTranslation } from "../i18n";

function BenefitIcon({ labelKey, children }: { labelKey: string; children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0d9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={t(labelKey)}
    >
      {children}
    </svg>
  );
}

export function ScrollChevron() {
  const { t } = useTranslation();
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={t("scroll.tooltip")}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function BenefitsOne() {
  return (
    <BenefitIcon labelKey="svg.workflow">
      <path d="M 2 12 C 3 8, 4 8, 5 12 C 6 16, 7 16, 8 12 C 9 10, 10 10, 11 12 C 12 13, 13 13, 14 12 L 22 12" />
      <path d="M 19 9 L 22 12 L 19 15" />
    </BenefitIcon>
  );
}

export function BenefitsTwo() {
  return (
    <BenefitIcon labelKey="svg.target">
      <path d="M 2 12 C 5 5, 19 5, 22 12 C 19 19, 5 19, 2 12 Z" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" fill="#0d9488" />
    </BenefitIcon>
  );
}

export function BenefitsThree() {
  return (
    <BenefitIcon labelKey="svg.metrics">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </BenefitIcon>
  );
}

export function BenefitsFour() {
  return (
    <BenefitIcon labelKey="svg.noUseless">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </BenefitIcon>
  );
}

export function BenefitsFive() {
  return (
    <BenefitIcon labelKey="svg.quickStart">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </BenefitIcon>
  );
}
