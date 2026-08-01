import type { Metadata } from "next";
import { TRPCProvider } from "@/trpc/Provider";

export const metadata: Metadata = {
  title: "CRM",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <div className="min-h-screen bg-paper text-ink">{children}</div>
    </TRPCProvider>
  );
}
