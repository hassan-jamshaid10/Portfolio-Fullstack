import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-8 text-paper md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-[family-name:var(--font-display)] text-lg font-bold">
          {site.fullName}
          <span className="text-signal">.</span>
        </p>
        <p className="text-sm text-paper/60">
          © {new Date().getFullYear()} {site.fullName}. Crafted with intent.
        </p>
      </div>
    </footer>
  );
}
