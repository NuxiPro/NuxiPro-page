import type { ReactNode } from "react";

export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-heading text-[20px] font-medium text-ink mb-4">{children}</h2>;
}

export function LegalText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-[15px] leading-[1.8] text-body ${className}`}>{children}</p>;
}

export function LegalSubHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h3 className={`font-medium text-ink text-[15px] ${className}`}>{children}</h3>;
}

export function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-teal mt-1">•</span>
      {children}
    </li>
  );
}

export function LegalList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul className={`list-none space-y-2 text-[15px] leading-[1.8] text-body ${className}`}>
      {children}
    </ul>
  );
}
