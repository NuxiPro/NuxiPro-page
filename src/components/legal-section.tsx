export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[15px] font-medium text-ink mb-3 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-teal" />
        {title}
      </h2>
      <div className="text-[14px] text-body leading-relaxed pl-3 border-l border-hairline">
        {children}
      </div>
    </section>
  );
}
