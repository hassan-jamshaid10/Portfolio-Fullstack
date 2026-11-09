import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="logo">
        {site.fullName}
        <span>.</span>
      </div>
      <div className="mono">
        © {new Date().getFullYear()} {site.fullName} · Crafted with intent
      </div>
    </footer>
  );
}
