export function LegalBrief({ items, title = "En bref" }: { items: string[]; title?: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-zinc-50 px-5 py-4 mb-10">
      <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-soft mb-3">
        {title}
      </p>
      <ul className="space-y-2 text-[14px] text-body leading-snug">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal/60 shrink-0"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
